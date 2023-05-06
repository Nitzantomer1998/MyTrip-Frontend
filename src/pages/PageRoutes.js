import React, { useContext, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import SignIn from './SignIn/SignIn.js';
import SignUp from './SignUp/SignUp.js';
import Dashboard from './Dashboard/Dashboard.js';
import AfterSignUp from './AfterSignUp/AfterSignUp.js';
import Home from './HomePage/Home';
import PostCreation from './PostCreation/PostCreation';
import Profile from './Profile/Profile.js';
import Protected from './Protected';
import { UserContext } from '../providers/UserProvider.js';

function PageRoutes() {
  const context = useContext(UserContext);

  return (
    <Routes>
      <Route path='/' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/after-sign-up' element={<AfterSignUp />} />
      <Route
        path='/dashboard'
        element={
          <Protected isSignedIn={Boolean(context?.userDetails.token)}>
            <Dashboard />
          </Protected>
        }
      />

      <Route
        path='/home'
        element={
          <Protected isSignedIn={Boolean(context?.userDetails.token)}>
            <Home />
          </Protected>
        }
      />
      <Route
        path='post-creation'
        element={
          <Protected isSignedIn={Boolean(context?.userDetails.token)}>
            <PostCreation />
          </Protected>
        }
      />
      <Route
        path='profile'
        element={
          <Protected isSignedIn={Boolean(context?.userDetails.token)}>
            <Profile />
          </Protected>
        }
      />
    </Routes>
  );
}

export default PageRoutes;
