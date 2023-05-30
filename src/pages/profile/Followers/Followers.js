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
    // if (location.state.user._id === user.id) {
    //   window.path = '/profile';
    //   followers = (await getFollowersPageInfos(user.token)).data.followers;
    // } else {
    window.path = `/profile/${location.state.user.username}`;

    const response = await getFollowersPageInfosId(
      location.state.user._id,
      user.token
    );
    if (response && response.data) {
      followers = response.data.followers;
      console.log(followers, 'iam a followersssssssssss')
    } else {
    }
    // }
    setFollowers(followers);
  };

  const showFollowers = () => {
    return (
      console.log(JSON.stringify(followers), 'followers'),
      (
        <div className='followersContainer'>
          {followers?.map((follower, index) => {
            const followBtn =
              location.state.user._id === user.id ? (
                follower.following ? (
                  <button
                    className='followBtn'
                    onClick={() => handleUnfollow(follower._id)}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className='followBtn'
                    onClick={() => handleFollow(follower._id)}
                  >
                    Follow
                  </button>
                )
              ) : null;

            return (
              <div className='followerRow' key={index}>
                <img
                  className='followerInfo'
                  id='profileImg'
                  src={follower.picture}
                />
                <button
                  className='followerInfo'
                  id='nameBtn'
                  onClick={() =>
                    (window.location.href = `/profile/${follower.username}`)
                  }
                >
                  {follower.username}
                </button>
                {followBtn}
                <div className='remove'>
                  {location.state.user._id === user.id && (
                    <button
                      className='removeBtn'
                      onClick={() => setSelectedUser(follower)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )
    );
  };

  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <Link to={`${window.path}`} className='closeBtnFollowing'>
          X
        </Link>
        <h1 className='title'>Followers</h1>
        {showFollowers()}
        {selectedUser ? (
          <RemovePopUp
            user={selectedUser}
            closeModal={() => setSelectedUser(null)}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
