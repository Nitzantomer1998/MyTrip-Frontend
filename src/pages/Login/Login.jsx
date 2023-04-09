import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

    const validateForm = () => {
        let valid = true;
        const newErrors = { email: '', password: '' };
        if (!email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!email.includes('@')) {
            newErrors.email = 'Email must contain @';
            valid = false;
        }
        if (!email.includes('.')) {
            newErrors.email = 'Email must contain .';
            valid = false;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;

        if (!password.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (!passwordRegex.test(password)) {
            newErrors.password =
                'Password is too weak';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            navigate('../AfterLogin');
        }
    };

    //     const data = { email, password };
    //     const response = await fetch('/api/login', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(data),
    //     });

    //     const result = await response.json();
    //     if (result.valid) {
    //         navigate('../AfterLogin');
    //     } else {
    //         alert('Invalid user');
    //     }
    // };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form no-zoom" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Youremail@gmail.com"
                    id="email"
                    name="email"
                />
                <span className="error-message">{errors.email}</span>
                <label htmlFor="password">Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                />
                <span className="error-message">{errors.password}</span>
                <button type="submit">Login</button>
            </form>
            <button
                className="link-btn"
                onClick={() => navigate('../user/register')}
            >
                Dont Have An Account? Sign-Up
            </button>
        </div>
    );
};

export default Login;
