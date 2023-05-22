import { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/header';
import { followingpage } from '../../functions/reducers';
import { getFollowingPageInfos } from '../../functions/user';
import { followerspage } from '../../functions/reducers';
import { getFollowersPageInfos } from '../../functions/user';

import Card from './Card';
import './style.css';

export default function Friends() {
  const { user } = useSelector((state) => ({ ...state.user }));
  const { type } = useParams();

  const [{ loading, error, data }, dispatch] = useReducer(followingpage, {
    loading: false,
    data: {},
    error: '',
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    dispatch({ type: 'FOLLOWING_REQUEST' });
    console.log(`user  : ${user}`);
    const responseData = await getFollowingPageInfos(user);
    if (responseData.status === 'ok') {
      dispatch({ type: 'FOLLOWING_SUCCESS', payload: responseData.data });
    } else {
      dispatch({ type: 'FOLLOWING_ERROR', payload: responseData.data });
    }
  };

  return (
    <>
      <Header page='friends' />
      <div className='friends'>
        <div className='friends_right'>
          {(type === undefined || type === 'requests') && (
            <div className='friends_right_wrap'>
              <div className='flex_wrap'>
                {data.requests &&
                  data.requests.map((user) => (
                    <Card
                      userr={user}
                      key={user._id}
                      type='request'
                      getData={getData}
                    />
                  ))}
              </div>
            </div>
          )}
          {(type === undefined || type === 'followers') && (
            <div className='friends_right_wrap'>
              <div className='friends_left_header'>
                <h3>Followers</h3>
                {type === undefined && (
                  <Link to='/friends/followers' className='see_link hover3'>
                    See all
                  </Link>
                )}
              </div>
              <div className='flex_wrap'>
                {data.followers &&
                  data.followers.map((user) => (
                    <Card
                      userr={user}
                      key={user._id}
                      type='follower'
                      getData={getData}
                    />
                  ))}
              </div>
            </div>
          )}

          {(type === undefined || type === 'all') && (
            <div className='friends_right_wrap'>
              <div className='friends_left_header'>
                <h3>Following</h3>
                {type === undefined && (
                  <Link to='/friends/all' className='see_link hover3'>
                    See all
                  </Link>
                )}
              </div>
              <div className='flex_wrap'>
                {data.following &&
                  data.following.map((user) => (
                    <Card
                      userr={user}
                      key={user._id}
                      type='following'
                      getData={getData}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
