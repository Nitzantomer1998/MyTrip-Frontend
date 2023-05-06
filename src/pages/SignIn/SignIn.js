import './SignIn.css';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateSignInForm } from '../../validation/userValidation.js';
import SignUpImage from '../../images/SignUpIn.jpg';
import PropTypes from 'prop-types';
import { UserContext } from '../../providers/UserProvider';

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(UserContext);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formErrors = validateSignInForm({ email, password });
    setErrorMessage(formErrors);

    // Vérifier s'il y a des erreurs dans formErrors.
    const hasErrors = Object.values(formErrors).some((error) => error !== '');

    if (!hasErrors) {
      setIsLoading(true);

      try {
        const response = await fetch(
          'http://localhost:10000/api/user/sign-in',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          context.setUserDetails({
            userName: data.user.username,
            email: data.user.email,
            token: data.token,
          });
          navigate('../after-sign-up');
        } else {
          const error = await response.json();
          setErrorMessage(error.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <div className='signInContainer'>
        <div className='backgroundImage'></div>
        <div className='rectangleContainer'>
          <div className='formContainer'>
            <div className='logo'>MyTrip</div>

            <p>
              Social Network for the Traveler
              <br />
              <span>Welcome Back, Please login to your account</span>
            </p>

            <form onSubmit={handleFormSubmit}>
              <label htmlFor='email'>
                Email {errorMessage.email && <span>{errorMessage.email}</span>}
              </label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='Abc@gmail.com'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              <label htmlFor='password'>
                Password{' '}
                {errorMessage.password && <span>{errorMessage.password}</span>}
              </label>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='********'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <button type='submit' className={isLoading ? 'loading' : ''}>
                {isLoading ? '' : 'Sign In'}
              </button>
            </form>

            <label>
              Dont have an account? <a href='/sign-up'>Sign Up!</a>
            </label>
          </div>
          <div className='imageContainer'>
            <img src={SignUpImage} alt='Image presenting traveling' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
