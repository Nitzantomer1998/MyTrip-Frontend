import './Navbar.css';
import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className="nav">
            <Link to="/" className="site-title"> SiteName </Link>

            <ul>
                <li>
                    <CustomLink to="/login">Login</CustomLink>
                </li>

                <li>
                    <CustomLink to="/register">Register</CustomLink>
                </li>
            </ul>
        </nav>
    );
};

function CustomLink({ to, children, ...props }) {
    const resolvePath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvePath.pathname, end: true });

    return (
        <li>
            <Link to={to} className={isActive ? 'active' : ''} {...props}>
                {children}
            </Link>
        </li>
    );
}