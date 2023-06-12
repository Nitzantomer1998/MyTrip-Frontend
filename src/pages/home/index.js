import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import CreatePost from '../../components/createPost';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import Post from '../../components/post';
import './style.css';
import Loading from '../../functions/loading';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

export default function Home({ setVisible, posts, loading, getAllPosts }) {
  const { user } = useSelector((state) => ({ ...state.user }));
  const middle = useRef(null);
  const [height, setHeight] = useState();
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setShowLogoutMessage(true);
      }, 20000); // 15000 milliseconds = 5 seconds

      setTimerId(timer);
    } else {
      clearTimeout(timerId);
      setShowLogoutMessage(false);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [loading]);

  useEffect(() => {
    if (middle.current) {
      setHeight(middle.current.clientHeight);
    }
  }, [loading]);

  useEffect(() => {
    if (showLogoutMessage) {
      logout();
    }
  }, [showLogoutMessage]);

  const logout = () => {
    Cookies.remove('user');
    dispatch({
      type: 'LOGOUT',
    });
    navigate('/login');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='home' style={{ height: `${height + 150}px` }}>
      <LeftHome user={user} />
      <Header page='home' getAllPosts={getAllPosts} />
      <LeftHome user={user} />
      <div className='home_middle' ref={middle}>
        <CreatePost user={user} setVisible={setVisible} />
        <div className='posts'>
          {posts.map((post) => (
            <Post key={post._id} post={post} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
