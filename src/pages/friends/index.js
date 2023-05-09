import { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/header';
import { friendspage } from '../../functions/reducers';
import { getFriendsPageInfos } from '../../functions/user';
import Card from './Card';
import './style.css';
export default function Friends() {
  const { user } = useSelector((state) => ({ ...state }));
  const { type } = useParams();

  const [{ loading, error, data }, dispatch] = useReducer(friendspage, {
    loading: false,
    data: {},
    error: '',
  });
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    dispatch({ type: 'FRIENDS_REQUEST' });
    const data = await getFriendsPageInfos(user.token);
    if (data.status === 'ok') {
      dispatch({ type: 'FRIENDS_SUCCESS', payload: data.data });
    } else {
      dispatch({ type: 'FRIENDS_ERROR', payload: data.data });
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
                {data.friends &&
                  data.friends.map((user) => (
                    <Card
                      userr={user}
                      key={user._id}
                      type='friends'
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
