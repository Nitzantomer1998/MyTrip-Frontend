import './Profile.css';
import React, { useState } from 'react';

function Profile() {
  const [activeTab, setActiveTab] = useState('about'); // default active tab is 'about'

  return (
    <div className='profile-container'>
      <div className='profile-info'>
        <div className='profile-pic'></div>
        <h2 className='username'>nitzan</h2>
        <div className='profile-stats'>
          <div className='stats'>
            <p className='stat-number'>0</p>
            <p className='stat-label'>Likes</p>
          </div>
          <div className='stats'>
            <p className='stat-number'>0</p>
            <p className='stat-label'>Followers</p>
          </div>
          <div className='stats'>
            <p className='stat-number'>0</p>
            <p className='stat-label'>Following</p>
          </div>
          <div className='stats'>
            <p className='stat-number'>0</p>
            <p className='stat-label'>Recommendations</p>
          </div>
        </div>
      </div>
      <div className='profile-content'>
        <div className='content-options'>
          <button
            className={`label ${activeTab === 'about' && 'active'}`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
          <button
            className={`label ${activeTab === 'saved' && 'active'}`}
            onClick={() => setActiveTab('saved')}
          >
            Saved
          </button>
          <button
            className={`label ${activeTab === 'liked' && 'active'}`}
            onClick={() => setActiveTab('liked')}
          >
            Liked
          </button>
          <button
            className={`label ${activeTab === 'recommended' && 'active'}`}
            onClick={() => setActiveTab('recommended')}
          >
            Recommended
          </button>
        </div>

        {activeTab === 'about' && (
          <div className='about-section'>
            <p>This is the about section for nitzans profile.</p>
          </div>
        )}
        {activeTab === 'about' && (
          <div className='post-grid'>
            <div className='post'>hello0</div>
            <div className='post'>hello1</div>
            <div className='post'>hello2</div>
          </div>
        )}
        {activeTab === 'saved' && (
          <div className='post-grid'>
            <div className='post'>hello3</div>
            <div className='post'>hello4</div>
            <div className='post'>hello5</div>
          </div>
        )}
        {activeTab === 'liked' && (
          <div className='post-grid'>
            <div className='post'>hello6</div>
            <div className='post'>hello7</div>
            <div className='post'>hello8</div>
          </div>
        )}
        {activeTab === 'recommended' && (
          <div className='post-grid'>
            <div className='post'>
              <div className='post-info'>hello9</div>
              <div className='post-img'>
                <img
                  className='post-img'
                  src='https://picsum.photos/200/300'
                  alt='post'
                />
              </div>
            </div>
            <div className='post'>hello10</div>
            <div className='post'>hello11</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
