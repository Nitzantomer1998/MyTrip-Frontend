import style from './SignUp.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateSignUpForm } from '../../validation/userValidation.js';
import SignUpImage from '../../images/SignUpIn.jpg';

function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formErrors = validateSignUpForm({ username, email, password });
    setErrorMessage(formErrors);

    // Vérifier s'il y a des erreurs dans formErrors.
    const hasErrors = Object.values(formErrors).some((error) => error !== '');

    if (!hasErrors) {
      try {
        const response = await fetch('https://mytrip-backend-pc4j.onrender.com/user/sign-up', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password, gender }),
        });

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
    <div className={style.signUpContainer}>
      <div className={style.backgroundImage}></div>
      <div className={style.rectangleContainer}>
        <div className={style.formContainer}>
          <div className={style.logo}>MyTrip</div>

          <p>
            Social Network for the Traveler
            <br />
            <span>Welcome, Please create your account</span>
          </p>

          <form onSubmit={handleFormSubmit}>
            <label htmlFor='username'>
              Username{' '}
              {errorMessage.username && <span>{errorMessage.username}</span>}
            </label>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='Abc'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />

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

            <label htmlFor='gender'>Gender</label>
            <select
              id='gender'
              name='gender'
              onChange={(event) => setGender(event.target.value)}
              required
            >
              <option value=''>Please select</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='non-binary'>Non-Binary</option>
            </select>

            <input type='checkbox' id='terms' name='terms' required />
            <label htmlFor='terms'>Agree to the terms & condition</label>

            <button type='submit'>Sign Up</button>
          </form>

          <label>
            Already have an account? <a href='/sign-in'>Sign in!</a>
          </label>
        </div>
        <div className={style.imageContainer}>
          <img src={SignUpImage} alt='Image presenting traveling' />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
