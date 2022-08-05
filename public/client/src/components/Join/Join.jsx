import { __UPDATE_HEADER_STATE__ } from '@dispatchers/layout';
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import './css/index.css';

function Join() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [nickname, setNickname] = useState(undefined);
  const [isNicknameExist, setIsNicknameExist] = useState(false);

  // 닉네임을 불러오는 useSeletor를 작성하기
  const nicknames = useSelector((state) => state.config.service.nicknames);

  const history = useHistory();

  const __createUser = useCallback(() => {
    if (email && nickname && !isNicknameExist && password && password.length >= 8) {
      let url = '/user/new';
      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Allow-Control-Access-Origin': '*'
        },
        body: JSON.stringify({
          email,
          password,
          nickname
        })
      })
        .then((res) => res.json())
        .then(({ msg }) => {
          console.log(msg);
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('조건에 부합하는 값이 모자랍니다.');
    }
  }, [email, password, nickname, isNicknameExist]);

  const __checkNickname = useCallback(() => {
    if (nicknames.indexOf(nickname) !== -1) {
      console.log('닉네임이 존재합니다');
      setIsNicknameExist(true);
    } else {
      console.log('닉네임이 존재하지 않습니다');
      setIsNicknameExist(false);
    }
  }, [nicknames, nickname]);

  // useEffect로 닉네임이 중복되는지 안되는지 체크하기
  useEffect(() => {
    __checkNickname();
    return () => {};
  }, [__checkNickname]);

  useEffect(() => {
    dispatch({
      type: __UPDATE_HEADER_STATE__,
      payload: false
    });
  }, [dispatch]);

  return (
    <div className="join">
      <div className="wrapper">
        <div className="logo">
          <img src="/assets/welcome/logo.svg" alt="로고" />
        </div>
        <form
          className="join-contents"
          onSubmit={(e) => {
            e.preventDefault();
            __createUser();
          }}
        >
          <div className="email-inp custom-inp">
            <div className="top">
              <div className="title txt-bold">이메일</div>
              <div className="warning"></div>
            </div>
            <div className="inp">
              <input
                type="email"
                placeholder="이메일을 입력해주세요"
                onBlur={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="password-inp custom-inp">
            <div className="top">
              <div className="title txt-bold">비밀번호</div>
              <div className="warning">
                {password && password.length < 8 && '비밀번호는 8자리 이상이어야 합니다'}
              </div>
            </div>
            <div className="inp">
              <input
                type="password"
                placeholder="비밀번호를 8자리 이상 입력해주세요"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="nickname-inp custom-inp">
            <div className="top">
              <div className="title txt-bold">닉네임</div>
              <div className="warning">{isNicknameExist && '이미 사용하고있는 닉네임 입니다'}</div>
            </div>
            <div className="inp">
              <input
                type="text"
                placeholder="닉네임을 입력해주세요"
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </div>
          </div>
          <button className="join-btn" type="submit">
            회원가입하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Join;
