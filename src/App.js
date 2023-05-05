import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn.js';
import SignUp from './pages/SignUp/SignUp.js';
import Dashboard from './pages/Dashboard/Dashboard.js';
import AfterSignUp from './pages/AfterSignUp/AfterSignUp.js';
import Profile from './pages/Profile/Profile.js';

function App() {
  return (
    <>
      <div className='App'>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/after-sign-up' element={<AfterSignUp />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
