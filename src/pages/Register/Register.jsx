import { useNavigate } from 'react-router-dom';
import './Register.css';
import React, { useState } from 'react';

export const Register = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { email, password, name };
        const response = await fetch('/api/register', {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.valid) {
            alert('Good');
        } else {
            alert('Invalid user');
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="name"
                    id="name"
                    name="name"
                />

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
                <button type="submit">Register</button>
            </form>

            <button
                className="link-btn"
                onClick={() => navigate('../Login')}
            >
                Already Have An Account? Sign-In
            </button>
        </div>
    );
};
