import { Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Login from './pages/login';
import Profile from './pages/profile';
import Home from './pages/home';
import LoggedInRoutes from './routes/LoggedInRoutes';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';
import { useSelector } from 'react-redux';
import Activate from './pages/home/activate';
import Reset from './pages/reset';
import CreatePostPopup from './components/createPostPopup';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { postsReducer } from './functions/reducers';
import Friends from './pages/friends';
import LeftHome from './components/home/left/index';
import About from './pages/about/index';
import Statistics from './pages/statistics/index';
import Followers from './pages/profile/Followers';
import Following from './pages/profile/Following';
import LocationPosts from './components/LocationPosts/LocationPosts';
import LocationPostsPage from './pages/LocationPostsPage/LocationPostsPage';

import EditProfile from './pages/profile/EditProfile';
import { ChangePassword } from './pages/reset/ChangePassword';
function App() {
  const params = useParams();
  const { location } = params;
  
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state.user }));
  const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: '',
  });

  useEffect(() => {
    getAllPosts();
  }, [user]);

  const getAllPosts = async () => {
    try {
      dispatch({
        type: 'POSTS_REQUEST',
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllposts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: 'POSTS_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'POSTS_ERROR',
        payload: error.response?.data.message,
      });
    }
  };

  // Tricking The Hosting Website "Render" Followed By Faster Responses
  const keepServerAlive = async() => {
    try {
      await axios.get('https://mytrip-frontend.onrender.com');
    } catch (error) {
      return;
    }
  };

  setInterval(keepServerAlive, 600000);
  // Tricking The Hosting Website "Render" Followed By Faster Responses

  return (
    <div>
      {user.id && <LeftHome user={user} />}
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          posts={posts}
          dispatch={dispatch}
        />
      )}

      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path='/profile'
            element={<Profile setVisible={setVisible} />}
            exact
          />
          <Route
            path='/profile/:username'
            element={
              <Profile setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />

          <Route path='/followers' element={<Followers />} exact />
          <Route path='/following' element={<Following />} exact />

          <Route
            path='/friends'
            element={
              <Friends setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          <Route
            path='/friends/:type'
            element={
              <Friends setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          <Route
            path='/'
            element={
              <Home
                setVisible={setVisible}
                posts={posts}
                loading={loading}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />

          <Route
            path='/about'
            element={<About setVisible={setVisible} />}
            exact
          />

          <Route
            path='/statistics'
            element={<Statistics setVisible={setVisible} />}
            exact
          />

          <Route
            path='/editprofile'
            element={<EditProfile setVisible={setVisible} />}
            exact
          />

          <Route
            path='/location/:location'
            element={
              <>
                <LocationPostsPage />
              </>
            }
          />

          <Route
            path='/*'
            element={
              <Home
                setVisible={setVisible}
                posts={posts}
                loading={loading}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
          <Route path='/activate/:token' element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path='/login' element={<Login />} exact />
        </Route>
        <Route path='/reset' element={<Reset />} />
      </Routes>
    </div>
  );
}



export default App;
