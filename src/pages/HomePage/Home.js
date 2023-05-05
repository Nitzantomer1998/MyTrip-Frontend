import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Dashboard from '../Dashboard/Dashboard';
import PostCreation from '../PostCreation/PostCreation';

function Home() {
  const [showCreatePostPopup, setShowCreatePostPopup] = useState(false);

  const handleCreatePostClick = () => {
    setShowCreatePostPopup(true);
  };

  const handlePopupClose = () => {
    setShowCreatePostPopup(false);
  };

  return (
    <div>
      <Dashboard />
      <div className='search-bar-container'>
        <div className='search-bar'>
          <button onClick={handleCreatePostClick}>Create Post</button>
        </div>
      </div>
      {showCreatePostPopup && (
        <div className='create-post-popup'>
          <PostCreation
            showPopup={showCreatePostPopup}
            onClose={handlePopupClose}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
