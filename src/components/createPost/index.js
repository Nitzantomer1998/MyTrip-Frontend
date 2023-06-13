import './style.css';
import React, { useEffect, useState } from 'react';
import { getFollowingPageInfosId } from '../../functions/user';
export default function CreatePost({ user, setVisible }) {
  useEffect(() => {
    fetchFollowing();
  }, []);

  const [following, setFollowing] = useState([]);

  const fetchFollowing = async () => {
    let following = [];
    const response = await getFollowingPageInfosId(user.id, user.token);
    if (response && response.data) {
      following = response.data.following;
    }
    setFollowing(following);
  };

  return (
    <div className='createPost'>
      <div className='createPost_header'>
        <img src={user?.picture} alt='' />
        <div
          className='open_post hover2'
          onClick={() => {
            setVisible(true);
          }}
        >
          Tell us more about your trip, {user?.username}
        </div>
      </div>
      {following.length === 0 && (
        <p className='singleLineHeading'>
          We encourage you to find users follow!
        </p>
      )}
    </div>
  );
}
