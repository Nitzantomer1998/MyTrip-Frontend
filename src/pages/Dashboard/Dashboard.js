import './Dashboard.css';
import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar.js';
import Navbar from '../../components/Navbar/Navbar.js';
import Content from '../Content/Content.js';

function Dashboard() {
  return (
    <div>
      <div className='app-container'>
        <Sidebar />
        <Navbar />
      </div>
    </div>
  );
}

export default Dashboard;