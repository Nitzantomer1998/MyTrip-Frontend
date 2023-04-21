import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from './pages/SignIn/SignIn.js';
import SignUp from './pages/SignUp/SignUp.js';
import AfterSignIn from './pages/AfterSignIn/AfterSignIn.js';
import AfterSignUp from './pages/AfterSignUp/AfterSignUp.js';

function App() {
  return (
    <>
      <div className='App'>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/after-sign-ip' element={<AfterSignIn />} />
          <Route path='/after-sign-up' element={<AfterSignUp />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
