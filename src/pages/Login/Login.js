import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLoginForm } from '../../validation/userValidation.js';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isFormValid = validateLoginForm({ email, password }, setErrors);

    if (isFormValid) {
      try {
        const response = await fetch(
          'https://project-management-be-kwwz.onrender.com/user/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (response.ok) {
          navigate('../AfterLogin');
        } else {
          const error = await response.json();
          setErrors({ email: error.message });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='auth-form-container'>
      <h2>Login</h2>
      <form className='login-form no-zoom' onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type='email'
          placeholder='Youremail@gmail.com'
          id='email'
          name='email'
        />
        <span className='error-message'>{errors.email}</span>
        <label htmlFor='password'>Password</label>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type='password'
          placeholder='********'
          id='password'
          name='password'
        />
        <span className='error-message'>{errors.password}</span>
        <button type='submit'>Login</button>
      </form>
      <button className='link-btn' onClick={() => navigate('../register')}>
        Dont Have An Account? Sign-Up
      </button>
    </div>
  );
}

export default Login;
