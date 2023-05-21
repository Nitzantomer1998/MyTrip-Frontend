import { Link, useLocation } from 'react-router-dom';
import UnfollowPopUp from '../UnfollowPopUp';
import './FollowingStyle.css';
import React, { useEffect, useState } from 'react';
import {
  getFollowingPageInfos,
  getFollowingPageInfosId,
} from '../../../functions/user';
import { useSelector } from 'react-redux';

export default function Following(props) {
  const location = useLocation();

  const [following, setFollowing] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const { user } = useSelector((state) => ({ ...state.user }));
  /*var currentPath = window.location.pathname;
    var isProfilePage = currentPath.includes("/profile/");
    if (isProfilePage) {
        user=window.userGlobal;
      } */

  useEffect(() => {
    fetchFollowing();
    // console.log(location)
  }, []);

  const fetchFollowing = async () => {
    let following = [];
    if (location.state.user._id === user.id) {
      window.path = '/profile';
      following = (await getFollowingPageInfos(user.token)).data.following;
    } else {
      window.path = `/profile/${location.state.user.username}`;
      const response = await getFollowingPageInfosId(
        location.state.user._id,
        user.token
      );
      console.log(response, 'RESPONSE');
      if (response && response.data) {
        following = response.data.following;
      } else {
      }
    }
    setFollowing(following);
  };

  const showFollowing = () => {
    return (
      <div className='followingContainer'>
        {following?.map((follower, index) => {
          const followBtn = follower.following ? (
            <button className='followBtn'>unfollow</button>
          ) : (
            <button className='followBtn'>follow</button>
          );
          return (
            <div className='followingRow' key={index}>
              <img
                className='followerInfo'
                id='profileImg'
                src={follower.picture}
              ></img>
              <button
                className='followerInfo'
                id='nameBtn'
                onClick={() =>
                  (window.location.href = `/profile/${follower.username}`)
                }
              >
                {follower.username}
              </button>
              <div className='remove'>
                {location.state.user._id === user.id && (
                  <button
                    className='followerInfo'
                    id='followingBtn'
                    onClick={() => setSelectedUser(follower)}
                  >
                    Following
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <Link to={`${window.path}`} className='closeBtnFollowing'>
          X
        </Link>
        <h1 className='title'>Following</h1>
        {showFollowing()}
        {selectedUser ? (
          <UnfollowPopUp
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
