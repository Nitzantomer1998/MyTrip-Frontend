import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className='dashboard'>
      <div className='sidebar'>
        <h2>Menu</h2>
        <ul>
          <li>Home</li>
          <li>Profile</li>
          <li>Statistics</li>
          <li>About Us</li>
          <li className='log-out'>Log out</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
