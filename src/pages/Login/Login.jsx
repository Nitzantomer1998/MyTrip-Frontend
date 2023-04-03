import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { email, password };
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.valid) {
            navigate('../AfterLogin');
        } else {
            alert('Invalid user');
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>

            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Youremail@gmail.com"
                    id="email"
                    name="email"
                />

                <label htmlFor="password">Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                />
                <button type="submit">Login</button>
            </form>

            <button
                className="link-btn"
                onClick={() => navigate('../Register')}
            >
                Dont Have An Account? Sign-Up
            </button>
        </div>
    );
};
