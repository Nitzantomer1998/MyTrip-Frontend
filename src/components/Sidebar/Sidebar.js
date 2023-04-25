import './Sidebar.css';
import React from 'react';
import settingImage from '../../images/settingImage.png';

function Sidebar() {
  return (
    <div className='sidebar-container'>
      <div className='sidebar'>
        <div className='logo'>Profile</div>
        <div className='menu'>
          <ul>
            <li>Home</li>
            <li>Profile</li>
            <li>Statistics</li>
            <li>
              <img src={settingImage} alt='Settings icon' />
              Settings
            </li>
          </ul>
        </div>
        <div className='log-out'>logout</div>
      </div>
    </div>
  );
}

export default Sidebar;
