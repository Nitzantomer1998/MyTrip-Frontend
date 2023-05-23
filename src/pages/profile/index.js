import axios from 'axios';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { profileReducer } from '../../functions/reducers';
import Header from '../../components/header';
import './style.css';
import ProfielPictureInfos from './ProfielPictureInfos';
import ProfileMenu from './ProfileMenu';
import CreatePost from '../../components/createPost';
import GridPosts from './GridPosts';
import Post from '../../components/post';
import Intro from '../../components/intro';
import Friends from './Friends';

import { useMediaQuery } from 'react-responsive';
import CreatePostPopup from '../../components/createPostPopup';

import Saved from './Saved';
import Liked from './Liked';
import Recommended from './Recommended';

export default function Profile({ getAllPosts }) {
  const [visible, setVisible] = useState(false);
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state.user }));
  const [photos, setPhotos] = useState({});
  var userName = username === undefined ? user.username : username;
  const [activeTab, setActiveTab] = useState('about');
  const [savedPosts, setSavedPosts] = useState([]); // ajout d'une nouvelle variable d'état pour les posts sauvegardés
  const [likedPosts, setLikedPosts] = useState([]); // ajout d'une nouvelle variable d'état pour les posts likés
  const [recommendedPosts, setRecommendedPosts] = useState([]); // ajout d'une nouvelle variable d'état pour les posts recommandés

  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: '',
  });

  useEffect(() => {
    setActiveTab('about');
    getProfile();
  }, [userName]);
  useEffect(() => {
    setOthername(profile?.details?.otherName);
  }, [profile]);

  var visitor = userName === user.username ? false : true;
  const [othername, setOthername] = useState();
  const path = `${userName}/*`;
  const max = 30;
  const sort = 'desc';

  const getProfile = async () => {
    try {
      dispatch({
        type: 'PROFILE_REQUEST',
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getUserProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.ok === false) {
        navigate('/profile');
      } else {
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/listImages`,
            { path, sort, max },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setPhotos(images.data);
        } catch (error) {
          console.log(error);
        }
        dispatch({
          type: 'PROFILE_SUCCESS',
          payload: data,
        });
        window.scrollTo(0, 0);
      }
    } catch (error) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response?.data.message,
      });
    }
  };
  const profileTop = useRef(null);
  const leftSide = useRef(null);
  const [height, setHeight] = useState();
  const [leftHeight, setLeftHeight] = useState();
  const [scrollHeight, setScrollHeight] = useState();
  useEffect(() => {
    setHeight(profileTop.current.clientHeight + 300);
    setLeftHeight(leftSide.current.clientHeight);
    window.addEventListener('scroll', getScroll, { passive: true });
    return () => {
      window.addEventListener('scroll', getScroll, { passive: true });
    };
  }, [loading, scrollHeight]);
  const check = useMediaQuery({
    query: '(min-width:901px)',
  });
  const getScroll = () => {
    setScrollHeight(window.pageYOffset);
  };
  return (
    <div className='profile'>
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          posts={profile?.posts}
          dispatch={dispatch}
          profile
        />
      )}

      <Header page='profile' getAllPosts={getAllPosts} />

      <div className='profile_top' ref={profileTop}>
        <div className='profile_container'>
          <ProfielPictureInfos
            profile={profile}
            visitor={visitor}
            photos={photos.resources}
            othername={othername}
          />
          <ProfileMenu
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            savedPosts={savedPosts}
            likedPosts={likedPosts}
            recommendedPosts={recommendedPosts}
            user={user}
            userName={userName}
          />
        </div>
      </div>
      <div className='profile_bottom'>
        <div className='profile_container'>
          <div className='bottom_container'>
            <div
              className={`profile_grid ${
                check && scrollHeight >= height && leftHeight > 1000
                  ? 'scrollFixed showLess'
                  : check &&
                    scrollHeight >= height &&
                    leftHeight < 1000 &&
                    'scrollFixed showMore'
              }`}
            >
              <div className='profile_left' ref={leftSide}>
                {activeTab !== 'saved' &&
                  activeTab !== 'liked' &&
                  activeTab !== 'recommended' && (
                    <>
                      <Intro
                        detailss={profile.details}
                        visitor={visitor}
                        setOthername={setOthername}
                      />
                      <Friends friends={profile.friends} />
                    </>
                  )}
              </div>
              <div className='profile_right'>
                {!visitor && activeTab === 'about' && (
                  <CreatePost user={user} profile setVisible={setVisible} />
                )}
                {activeTab === 'about' && <GridPosts />}
                <div className='posts'>
                  {activeTab === 'about' &&
                  profile.posts &&
                  profile.posts.length
                    ? profile.posts.map((post) => (
                        <Post post={post} user={user} key={post._id} profile />
                      ))
                    : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
