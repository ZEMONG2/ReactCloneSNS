import React, { useEffect, useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@styles/core.css';
import Login from './Login/Login';
import Join from './Join/Join';
import MainFeed from './MainFeed/MainFeed';
import Header from './Header/Header';
import Detail from './Detail/Detail';
import Profile from './Profile/Profile';
import FBA from '@config/firebaseApp';
import { useDispatch, useSelector } from 'react-redux';
import { __NICKNAME_SERVICE_UPDATE__ } from '@dispatchers/config';
import {
  __UPDATE_FEEDS__,
  __UPDATE_FOLLOWER__,
  __UPDATE_FOLLOWING__,
  __UPDATE_SESSION__
} from '@dispatchers/auth';
import { __UPDATE_HEADER_STATE__ } from '@dispatchers/layout';

const Fauth = FBA.auth();
const Fdatabase = FBA.database();

function App() {
  const [uid, setUid] = useState(undefined);
  const dispatch = useDispatch();
  const isHeaderOpen = useSelector((state) => state.layouts.isHeaderOpen);

  const __getFollowings = useCallback(() => {
    if (uid) {
      const followingRef = Fdatabase.ref(`users/${uid}/following`);
      followingRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
          const val = snapshot.val();
          dispatch({
            type: __UPDATE_FOLLOWING__,
            payload: Object.values(val)
          });
        } else {
          console.log('팔로잉 하고있는 유저가 없습니다');
          dispatch({
            type: __UPDATE_FOLLOWING__,
            payload: []
          });
        }
      });
      return followingRef;
    } else {
      return undefined;
    }
  }, [uid, dispatch]);

  const __getFollowers = useCallback(() => {
    if (uid) {
      const followersRef = Fdatabase.ref(`users/${uid}/follower`);
      followersRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
          const val = snapshot.val();
          dispatch({
            type: __UPDATE_FOLLOWER__,
            payload: Object.values(val)
          });
        } else {
          console.log('팔로워가 없습니다');
          dispatch({
            type: __UPDATE_FOLLOWER__,
            payload: []
          });
        }
      });
      return followersRef;
    } else {
      return undefined;
    }
  }, [uid, dispatch]);

  // 닉네임을 실시간으로 불러오는 함수를 만들기
  const __getNicknames = useCallback(() => {
    const nicknameRef = Fdatabase.ref('statics/nicknames');

    //.on 실시간으로 불러오기
    nicknameRef.on('value', (snapshot) => {
      // snapshot이 존재 할 때
      if (snapshot.exists()) {
        // 데이터가 존재할때는 리덕스 상태로 닉네임 리스트를 업데이트
        dispatch({
          type: __NICKNAME_SERVICE_UPDATE__,
          payload: Object.values(snapshot.val())
        });
      } else {
        // 데이터가 없을때는 빈 배열을 업데이트
        dispatch({
          type: __NICKNAME_SERVICE_UPDATE__,
          payload: []
        });
      }
    });
    return nicknameRef;
  }, [dispatch]);

  const __getFeeds = useCallback(() => {
    if (uid) {
      const feedRef = Fdatabase.ref(`users/${uid}/feed`);
      feedRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          dispatch({
            type: __UPDATE_FEEDS__,
            payload: Object.values(snapshot.val())
              .map((item) => item.fid)
              .reverse()
          });
        } else {
          dispatch({
            type: __UPDATE_FEEDS__,
            payload: []
          });
        }
      });
      return feedRef;
    } else {
      return undefined;
    }
  }, [uid, dispatch]);

  useEffect(() => {
    const nicknameRef = __getNicknames();
    return () => {
      nicknameRef.off();
    };
  }, [__getNicknames]);
  // 함수를 실행시키기

  useEffect(() => {
    Fauth.onAuthStateChanged((users) => {
      if (users) {
        const { uid, displayName, email } = users;

        setUid(uid);
        dispatch({
          type: __UPDATE_HEADER_STATE__,
          payload: true
        });
        dispatch({
          type: __UPDATE_SESSION__,
          payload: {
            uid,
            displayName,
            email
          }
        });
      } else {
        setUid(undefined);
        dispatch({
          type: __UPDATE_HEADER_STATE__,
          payload: false
        });
        dispatch({
          type: __UPDATE_SESSION__,
          payload: undefined
        });
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const followersRef = __getFollowers();
    const followingRef = __getFollowings();
    const feedRef = __getFeeds();

    return () => {
      if (followersRef) {
        followersRef.off();
      }
      if (followingRef) {
        followingRef.off();
      }
      if (feedRef) {
        feedRef.off();
      }
    };
  }, [__getFollowers, __getFollowings, __getFeeds]);

  return (
    <Router>
      {isHeaderOpen && <Header />}
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/join" exact component={Join} />
        <Route path="/feed" exact component={MainFeed} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/profile/:uid" exact component={Profile} />
      </Switch>
      {false && <Detail />}
    </Router>
  );
}

export default App;
