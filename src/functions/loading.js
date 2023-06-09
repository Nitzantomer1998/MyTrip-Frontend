import React from 'react';
import './style.css';
import logo from '../images/MyTrip_logo2.png';

const Loading = () => {
  return (
    <div className='loading-container'>
      <div className='loading-content'>
        <img src='/icons/MyTrip_logo.png' alt='Logo' className='loading-logo' />{' '}
        <h2>
          Loading<span>.</span>
          <span>.</span>
          <span>.</span>
        </h2>
      </div>
    </div>
  );
};

export default Loading;
