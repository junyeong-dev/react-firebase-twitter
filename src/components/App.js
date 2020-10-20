import React, { useState } from 'react';
// jsconfig.json의 경로 설정으로 인해 ../ ./ 대신 아래와 같이 import할 수 있게 됨
import AppRouter from 'components/Router';
import { authService } from "myFirebase";

function App() {
  // https://firebase.google.com/docs/reference
  // https://firebase.google.com/docs/reference/js/firebase.auth.Auth
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <AppRouter isLoggedIn={ isLoggedIn }/>
  );
}

export default App;