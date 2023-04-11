import './Register.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLoginForm } from '../../validation/userValidation.js';

function Register() {
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
          'https://project-management-be-kwwz.onrender.com/user/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (response.ok) {
          navigate('../AfterRegister');
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
      <h2>Register</h2>
      <form className='register-form' onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='Youremail@gmail.com'
          id='email'
          name='email'
        />
        <span className='error-message'>{errors.email}</span>

        <label htmlFor='password'>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='********'
          id='password'
          name='password'
        />
        <span className='error-message'>{errors.password}</span>
        <button type='submit'>Register</button>
      </form>

      <button className='link-btn' onClick={() => navigate('../login')}>
        Already Have An Account? Sign-In
      </button>
    </div>
  );
}

export default Register;
