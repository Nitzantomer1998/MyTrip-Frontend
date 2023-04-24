import './SignIn.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateSignInForm } from '../../validation/userValidation.js';
import SignUpImage from '../../images/SignUpIn.jpg';

const backgroundImageStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `url(${SignUpImage})`,
  backgroundSize: 'cover',
  filter: 'blur(5px)',
  opacity: 0.7,
  zIndex: -1,
};

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage(validateSignInForm({ email, password }));

    if (!errorMessage) {
      try {
        const response = await fetch(
          'https://mytrip-backend-pc4j.onrender.com/user/sign-in',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (response.ok) {
          navigate('../after-sign-up');
        } else {
          const error = await response.json();
          alert(error.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <section className='sign-in-container'>
        <div style={backgroundImageStyle}></div>

        <div className='rectangle-container1'>
          <section className='form-container1'>
            <div className='logo1'>MyTrip</div>

            <p>
              Social Network for the Traveler
              <br />
              <span>Welcome Back, Please login to your account</span>
            </p>

            <form onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor='email'>
                  Email{' '}
                  {errorMessage.email && <span>{errorMessage.email}</span>}
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
              </div>

              <div>
                <label htmlFor='password'>
                  Password{' '}
                  {errorMessage.password && (
                    <span>{errorMessage.password}</span>
                  )}
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
              </div>

              <div>
                <button type='submit'>Sign In</button>
              </div>
            </form>

            <div>
              <label>
                Dont have an account? <a href='/sign-up'>Sign Up!</a>
              </label>
            </div>
          </section>
          <section className='image-container1'>
            <img src={SignUpImage} alt='Image presenting traveling' />
          </section>
        </div>
      </section>
    </div>
  );
}

export default SignIn;
