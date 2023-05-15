import React, { useEffect, useState } from 'react';
import Header from '../../components/header/index';
import axios from 'axios';
import './style.css';

export default function Statistics({ user }) {
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    const getUserTotalLikes = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getUserTotalLikes/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log('Data from backend:', data);

        setTotalLikes(data.totalLikes);
      } catch (error) {
        console.log(error);
      }
    };
    getUserTotalLikes();
  }, [user]);

  return (
    <div>
      <Header page='profile' />
      <div className='statistics_container'>
        <div className='number_likes'>
          <p>Number of Likes </p>
          <p>{totalLikes}</p>
        </div>
        <div className='number_recommends'>
          <p>Number of Recommends</p>
          <p>0</p>
        </div>
      </div>
    </div>
  );
}
