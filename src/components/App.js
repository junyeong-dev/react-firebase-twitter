import React, { useState, useEffect } from 'react';
// jsconfig.json의 경로 설정으로 인해 ../ ./ 대신 아래와 같이 import할 수 있게 됨
import AppRouter from 'components/Router';
import { authService } from "myFirebase";

function App() {
  // https://firebase.google.com/docs/reference
  // https://firebase.google.com/docs/reference/js/firebase.auth.Auth
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])
  return (
    <>
      { init ? <AppRouter isLoggedIn={ isLoggedIn }/> : "Initializing..." }
    </>
  );
}

export default App;