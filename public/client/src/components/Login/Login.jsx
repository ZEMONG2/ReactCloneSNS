import FBA from '@config/firebaseApp';
import { __UPDATE_HEADER_STATE__ } from '@dispatchers/layout';
import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import './css/index.css';

const Fauth = FBA.auth();

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const history = useHistory();

  const __doLogin = useCallback(
    (e) => {
      e.preventDefault();
      Fauth.signInWithEmailAndPassword(email, password)
        .then((Credential) => {
          //   const {
          //     user: { uid, displayName, email }
          //   } = Credential;

          //   dispatch({
          //     type: __UPDATE_SESSION__,
          //     payload: {
          //       uid,
          //       displayName,
          //       email
          //     }
          //   });

          //   dispatch({
          //     type: __UPDATE_HEADER_STATE__,
          //     payload: true
          //   });
          history.push('/feed');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [email, password, history, dispatch]
  );

  //   const __logout = useCallback(() => {
  //     Fauth.signOut()
  //       .then(() => {
  //         console.log('logout complete');
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  const __goJoin = useCallback(() => {
    history.push('/join');
  }, [history]);

  useEffect(() => {
    Fauth.signOut();
    dispatch({
      type: __UPDATE_HEADER_STATE__,
      payload: false
    });
  }, [dispatch]);

  return (
    <div className="login">
      <div className="wrapper">
        <div className="logo">
          <img src="/assets/welcome/logo.svg" alt="로고" />
        </div>
        <form className="login-contents" onSubmit={__doLogin}>
          <div className="email-inp custom-inp">
            <div className="title txt-bold">이메일</div>
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
            <div className="title txt-bold">비밀번호</div>
            <div className="inp">
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                onBlur={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button className="login-btn" type="submit">
            로그인 하기
          </button>
        </form>
        <div className="go-join" onClick={__goJoin}>
          <div className="title txt-bold">또는 회원가입하기</div>
          <div className="asset">
            <img src="/assets/welcome/arrow.svg" alt="회원가입하기" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
