import './App.css';
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js';

const Home = lazy(() => import('./pages/Home/Home.js'));
const Login = lazy(() => import('./pages/Login/Login.js'));
const Register = lazy(() => import('./pages/Register/Register.js'));
const AfterLogin = lazy(() => import('./pages/AfterLogin/AfterLogin.js'));
const AfterRegister = lazy(() =>
  import('./pages/AfterRegister/AfterRegister.js')
);

function App() {
  return (
    <>
      <Navbar />

      <div className='App'>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/afterlogin' element={<AfterLogin />} />
            <Route path='/afterregister' element={<AfterRegister />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
