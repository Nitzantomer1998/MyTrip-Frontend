import React, { useEffect, useState } from 'react';
import Header from '../../components/header/index';
import { useSelector } from 'react-redux';
import './style.css';
import { getUserStatistics } from '../../functions/user';
import Loading from '../../functions/loading';

export default function Statistics() {
  const { user } = useSelector((state) => ({ ...state.user }));

  const [totalReceivedLikes, setTotalReceivedLikes] = useState(0);
  const [totalReceivedRecommends, setTotalReceivedRecommends] = useState(0);
  const [totalReceivedShares, setTotalReceivedShares] = useState(0);
  const [totalReceivedComments, setTotalReceivedComments] = useState(0);
  const [totalReceivedPosts, setTotalReceivedPosts] = useState(0); // New state variable for total posts

  const [totalGivenLikes, setTotalGivenLikes] = useState(0);
  const [totalGivenRecommends, setTotalGivenRecommends] = useState(0);
  const [totalGivenShares, setTotalGivenShares] = useState(0);
  const [totalGivenComments, setTotalGivenComments] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserStatistics = async () => {
      setLoading(true); // Déclenchez le chargement
      if (user && user.id && user.token) {
        const data = await getUserStatistics(user);
        if (data) {
          setTotalReceivedLikes(data.receivedLikes);
          setTotalReceivedRecommends(data.receivedRecommends);
          setTotalReceivedShares(data.receivedShares);
          setTotalReceivedPosts(data.postsCounter);
          setTotalReceivedComments(data.receivedComments);
          setTotalGivenLikes(data.iLiked);
          setTotalGivenRecommends(data.iRecommended);
          setTotalGivenShares(data.iShared);
          setTotalGivenComments(data.iCommented);
        }
      } else {
        console.log('User, user id or user token is undefined', user);
      }
      setLoading(false); // Arrêtez le chargement après le fetch
    };
    fetchUserStatistics();
  }, [user]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header page='profile' />
          <div className='statistics_container'>
            <div className='statistics_section'>
              <div className='stat_section_title'>
                <h2>Received Score</h2>
              </div>
              <div className='stat_card_row'>
                <div className='stat_card'>
                  <p>Likes</p>
                  <p>{totalReceivedLikes}</p>
                </div>
                <div className='stat_card'>
                  <p>Recommends</p>
                  <p>{totalReceivedRecommends}</p>
                </div>
                <div className='stat_card'>
                  <p>Shares</p>
                  <p>{totalReceivedShares}</p>
                </div>
                <div className='stat_card'>
                  <p>Comments</p>
                  <p>{totalReceivedComments}</p>
                </div>
                <div className='stat_card'>
                  <p>Posts</p>
                  <p>{totalReceivedPosts}</p>
                </div>
              </div>
            </div>
            <div className='statistics_section'>
              <div className='stat_section_title'>
                <h2 className='given_title'>Given Score</h2>
              </div>
              <div className='stat_card_row given_row'>
                <div className='stat_card'>
                  <p>Likes</p>
                  <p>{totalGivenLikes}</p>
                </div>
                <div className='stat_card'>
                  <p>Recommends</p>
                  <p>{totalGivenRecommends}</p>
                </div>
                <div className='stat_card'>
                  <p>Shares</p>
                  <p>{totalGivenShares}</p>
                </div>
                <div className='stat_card'>
                  <p>Comments</p>
                  <p>{totalGivenComments}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
