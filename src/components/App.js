import React, { useState, useEffect } from 'react';
// jsconfig.json의 경로 설정으로 인해 ../ ./ 대신 아래와 같이 import할 수 있게 됨
import AppRouter from 'components/Router';
import { authService } from "myFirebase";

function App() {
  // https://firebase.google.com/docs/reference
  // https://firebase.google.com/docs/reference/js/firebase.auth.Auth
  const [init, setInit] = useState(false);
  // 로그인한 유저의 정보를 담을 객체
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        // Object가 크면 rerendering에 시간이 오래 걸리거나 안될 수 있기 때문에, Object의 크기를 줄여줌
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    });
  }
  return (
    <>
      { init ? <AppRouter refreshUser={ refreshUser } isLoggedIn={ Boolean(userObj) } userObj={ userObj } /> : "Initializing..." }
    </>
  );
}

export default App;