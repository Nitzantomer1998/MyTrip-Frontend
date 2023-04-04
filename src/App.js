import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { AfterLogin } from './pages/AfterLogin/AfterLogin';
import { AfterRegister } from './pages/AfterRegister/AfterRegister';

function App() {
  return (
    <>
      <Navbar />

      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/afterlogin' element={<AfterLogin />} />
          <Route path='/afterregister' element={<AfterRegister />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
