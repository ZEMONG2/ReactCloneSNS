import React, { useEffect, useCallback } from 'react';
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
import { __UPDATE_SESSION__ } from '@dispatchers/auth';
import { __UPDATE_HEADER_STATE__ } from '@dispatchers/layout';

const Fauth = FBA.auth();
const Fdatabase = FBA.database();

function App() {
  const dispatch = useDispatch();
  const isHeaderOpen = useSelector((state) => state.layouts.isHeaderOpen);
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
        dispatch({
          type: __UPDATE_SESSION__,
          payload: undefined
        });
      }
    });
  }, [dispatch]);

  return (
    <Router>
      {isHeaderOpen && <Header />}
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/join" exact component={Join} />
        <Route path="/feed" exact component={MainFeed} />
        <Route path="/profile" exact component={Profile} />
      </Switch>
      {false && <Detail />}
    </Router>
  );
}

export default App;
