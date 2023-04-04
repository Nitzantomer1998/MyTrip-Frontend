import './Navbar.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="nav">
            <Link to="/" className="site-title">SiteName</Link>
            <ul>ּ
                <li className={location.pathname === '/login' ? 'active' : ''}>
                    <Link to="/login">Login</Link>
                </li>

                <li className={location.pathname === '/register' ? 'active' : ''}>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </nav>
    );
};
