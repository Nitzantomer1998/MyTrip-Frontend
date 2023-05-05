import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn.js';
import SignUp from './pages/SignUp/SignUp.js';
import Dashboard from './pages/Dashboard/Dashboard.js';
import AfterSignUp from './pages/AfterSignUp/AfterSignUp.js';
import Home from './pages/HomePage/Home';
import PostCreation from './pages/PostCreation/PostCreation';
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
          <Route path='/home' element={<Home />} />
          <Route path='/post-creation' element={<PostCreation />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
