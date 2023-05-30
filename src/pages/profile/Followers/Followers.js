import './FollowersStyle.css';
import RemovePopUp from '../RemovePopUp';
import { Link, useLocation } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import {
  getFollowersPageInfos,
  getFollowersPageInfosId,
  unfollow,
} from '../../../functions/user';
import { useSelector } from 'react-redux';
import { follow } from '../../../functions/user';

export default function Followers(props) {
  const location = useLocation();

  const [followers, setFollowers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useSelector((state) => ({ ...state.user }));

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleFollow = async (followerId) => {
    console.log(followerId, user.token, 'followerssssss');
    await follow(followerId, user.token);
    await fetchFriends();
  };
  const handleUnfollow = async (followerId) => {
    console.log(followerId, user.token, 'followerssssss');
    await unfollow(followerId, user.token);
    await fetchFriends();
  };

  const fetchFriends = async () => {
    let followers = [];
     if (location.state.user._id === user.id) 
     {
      const response = await getFollowersPageInfos(
        user.token
      );
       window.path = '/profile';
       if (response && response.data) {
        followers = response.data.followers;     } 
      }
      else{
        const response = await getFollowersPageInfosId(
          location.state.user._id,
          user.token
        );
        window.path = `/profile/${location.state.user.username}`;
         if (response && response.data) {
          followers = response.data.followers;     } 

      }

  
    setFollowers(followers);
  };

  const showFollowers = () => {
    return (
        <div className="followersContainer">
        
        {followers.map((follower, index) => {
          const followBtn = location.state.user._id === user.id ? (
            follower.following ? (
              <button className="followBtn" onClick={() => handleUnfollow(follower._id)}>
                Unfollow
              </button>
            ) : (
              <button className="followBtn" onClick={() => handleFollow(follower._id)}>
                Follow
              </button>
            )
          ) : null;
          
          return (
            <div className="followerRow" key={index}>
              <img className="followerInfo" id="profileImg" src={follower.picture} />
              <button className="followerInfo" id="nameBtn" onClick={() => window.location.href = `/profile/${follower.username}`}>
                {follower.username}
              </button>
              {followBtn}
              <div className="remove">
              {location.state.user._id === user.id && (
                <button className="removeBtn" onClick={() => setSelectedUser(follower)}>Remove</button>
                )}
              </div>
            </div>
          );
        })}
                  
        </div>
    )
}

return (
  <div className="modalBackground">
      <div className="modalContainer">
      <Link to={`${window.path}`} className='closeBtnFollowing'>
      X
    </Link>
          <h1 className="title">Followers</h1>
          {showFollowers()}
          {selectedUser ? <RemovePopUp user={selectedUser} closeModal={() => setSelectedUser(null)}/> : <></>}

      </div>
  </div>

)
}