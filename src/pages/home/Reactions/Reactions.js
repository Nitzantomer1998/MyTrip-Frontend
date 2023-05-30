import { Link, useLocation } from 'react-router-dom';
import './ReactionsStyle.css';
import React, { useEffect, useState } from 'react';
import {getPostLikes, getPostRecommended, getPostRecommends} from '../../../functions/post'
import { useSelector } from 'react-redux';

export default function Reactions(props) {
  const location = useLocation();
  const [likes, setLikes] = useState([]);
  const [recommends, setRecommends] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const { user } = useSelector((state) => ({ ...state.user }));
  

  useEffect(() => {
    fetchLikes();
    
  }, []);

  const fetchLikes = async () => {
    let likes = [];
    let recommends = [];
   

    const likesResponse = await getPostLikes(props.post._id, user.token);
    if (likesResponse && likesResponse.data) {
      likes = likesResponse.data.likes;
    } else {
    }
    

    setLikes(likes);

   

    const recommendsResponse = await getPostRecommends(props.post._id, user.token);
    if (recommendsResponse && recommendsResponse.data) {
      recommends = recommendsResponse.data.recommends;
    } else {
    }
  
    setRecommends(recommends);
  };

  const showLikes = () => {
    return (
      <div className='followingContainer'>
        {likes.map((like, index) => {
          return (
            <div className='reactionsRow' key={index}>
              <img
                className='followerInfo'
                id='profileImg'
                src={like.like?.picture}
              ></img>
              <button
                className='followerInfo'
                id='nameBtn'
                onClick={() => {
                  if (like.like?.username === props.user?.username) {
                    window.location.href = '/profile';
                  } else {
                    window.location.href = `/profile/${like.like?.username}`;
                  }
                }}
              >
                {like.like?.username}
              </button>
            </div>
          );
        })}

        
        
      </div>
    );
  };

  const showRecommends = () => {
    return (
      <div className='followingContainer'>
        {recommends.map((recommend, index) => {
          return (
            <div className='reactionsRow' key={index}>
              <img
                className='followerInfo'
                id='profileImg'
                src={recommend.recommend.picture}
              ></img>
              <button
                className='followerInfo'
                id='nameBtn'
                onClick={() => {
                  if (recommend.recommend.username === props.user.username) {
                    window.location.href = '/profile';
                  } else {
                    window.location.href = `/profile/${recommend.recommend.username}`;
                  }
                }}
              >
                {recommend.recommend.username}
              </button>
            </div>
          );
        })}
      </div>
    );
  };
  

  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
      
      <div className='reactionsContainer'>
      <h1 className='likesTitle'> {props.likesCount} Likes</h1>
      <button
        className='closeBtnReactions'
        onClick={() => props.closeModal()}
      >
        X
      </button>
    </div>
        {showLikes()}
        <h1 className='reactionsTitle'>{props.recommendsCount} Recommends</h1>
        {showRecommends()}
      </div>
    </div>
  );
}
