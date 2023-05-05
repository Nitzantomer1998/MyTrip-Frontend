import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Dashboard from '../Dashboard/Dashboard';
import PostCreation from '../PostCreation/PostCreation';

function Home() {
  const [showCreatePostPopup, setShowCreatePostPopup] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleCreatePostClick = () => {
    setShowCreatePostPopup(true);
  };

  const handlePopupClose = () => {
    setShowCreatePostPopup(false);
  };

  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  return (
    <div className='home-container'>
      <div className='dashboard-container'>
        <Dashboard />
      </div>
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
            onPostCreated={addPost}
          />
        </div>
      )}
      <div className='posts-container'>
        {posts.map((post) => (
          <div key={post.id} className='post'>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
