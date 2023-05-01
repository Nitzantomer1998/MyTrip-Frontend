import style from './SignIn.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateSignInForm } from '../../validation/userValidation.js';
import SignUpImage from '../../images/SignUpIn.jpg';

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formErrors = validateSignInForm({ email, password });
    setErrorMessage(formErrors);

    // Vérifier s'il y a des erreurs dans formErrors.
    const hasErrors = Object.values(formErrors).some((error) => error !== '');

    if (!hasErrors) {
      try {
        const response = await fetch('https://mytrip-backend-pc4j.onrender.com/user/sign-in', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          navigate('../after-sign-up');
        } else {
          const error = await response.json();
          if (error.message.password === 'Doesnt match') {
            alert('Incorrect email or password');
          } else {
            alert(JSON.stringify(error.message));
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className={style.signInContainer}>
        <div className={style.backgroundImage}></div>
        <div className={style.rectangleContainer}>
          <div className={style.formContainer}>
            <div className={style.logo}>MyTrip</div>

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

              <button type='submit'>Sign In</button>
            </form>

            <label>
              Dont have an account? <a href='/sign-up'>Sign Up!</a>
            </label>
          </div>
          <div className={style.imageContainer}>
            <img src={SignUpImage} alt='Image presenting traveling' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
