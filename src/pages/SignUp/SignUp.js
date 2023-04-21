import './SignUp.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateSignUpForm } from '../../validation/userValidation.js';
import SignUpImage from '../../images/SignUpImage.png';

function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage(validateSignUpForm({ username, email, password }));

    if (!errorMessage) {
      try {
        const response = await fetch(
          'https://project-management-be-kwwz.onrender.com/user/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, gender }),
          }
        );

        if (response.ok) {
          navigate('../sign-in');
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
    <section className='sign-up-container'>
      <div className='rectangle-container'>
        <section className='form-container'>
          <div className='logo'>MyTrip</div>

          <p>
            Social Network for the Traveler
            <br />
            <span>Welcome, Please create to your account</span>
          </p>

          <form onSubmit={handleFormSubmit}>
            <div>
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
            </div>

            <div>
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
            </div>

            <div>
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
            </div>

            <div>
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
                <option value='refrigerator'>Refrigerator</option>
              </select>
            </div>

            <div>
              <input type='checkbox' id='terms' name='terms' required />
              <label htmlFor='terms'>Agree to the terms & condition</label>
            </div>

            <div>
              <button type='submit'>Sign Up</button>
            </div>
          </form>

          <div>
            <label>
              Already have an account? <a href='/sign-in'>Sign in!</a>
            </label>
          </div>
        </section>
        <section className='image-container'>
          <img src={SignUpImage} alt='Image presenting traveling' />
        </section>
      </div>
    </section>
  );
}

export default SignUp;
