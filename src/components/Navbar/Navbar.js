import './Navbar.css';
import React from 'react';

function Navbar() {
  return (
    <div className='navbar-container'>
      <div className='navbar-search'>
        <input
          className='navbar-search-input'
          type='text'
          placeholder='Search...'
        />
      </div>
    </div>
  );
}

export default Navbar;
