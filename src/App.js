import './App.css';
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';

const Home = lazy(() => import('./pages/Home/Home.jsx'));
const Login = lazy(() => import('./pages/Login/Login.jsx'));
const Register = lazy(() => import('./pages/Register/Register.jsx'));
const AfterLogin = lazy(() => import('./pages/AfterLogin/AfterLogin.jsx'));
const AfterRegister = lazy(() =>
  import('./pages/AfterRegister/AfterRegister.jsx')
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
