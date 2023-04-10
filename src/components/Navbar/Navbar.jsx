import './Navbar.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav className='nav'>
      <Link to='/' className='site-title'>
        SiteName
      </Link>
      <ul>
        <li className={location.pathname === '/login' ? 'active' : ''}>
          <Link to='/user/login'>Login</Link>
        </li>

        <li className={location.pathname === '/register' ? 'active' : ''}>
          <Link to='/user/register'>Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
