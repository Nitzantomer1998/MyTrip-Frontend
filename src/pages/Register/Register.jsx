import { useNavigate } from 'react-router-dom';
import './Register.css';
import React, { useState } from 'react';

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({ name: '', email: '', password: '' });

    const validateForm = () => {
        let valid = true;
        const newErrors = { name: '', email: '', password: '' };

        const nameRegex = /^[A-Za-z]+$/;

        if (!name.trim()) {
            newErrors.name = 'Name is required';
            valid = false;
        } else if (!nameRegex.test(name)) {
            newErrors.name = 'Name contain only Letters';
            valid = false;
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!email.includes('@') || !email.includes('.')) {
            newErrors.email = 'Invalid email format';
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
        // Wrong Navigattion
        if (validateForm()) {
            navigate('../AfterRegister');
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
                <span className="error-message">{errors.name}</span>

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

export default Register;
