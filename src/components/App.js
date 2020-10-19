import React, { useState } from 'react';
import AppRouter from 'components/Router';
import myFirebase from "myFirebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AppRouter isLoggedIn={ isLoggedIn }/>
  );
}

export default App;