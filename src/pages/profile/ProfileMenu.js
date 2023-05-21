import { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../../components/post/index';
import { Link } from 'react-router-dom';

export default function ProfileMenu({
  activeTab,
  setActiveTab,
  user,
  userName,
}) {
  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  const getSavedPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPostsSaved/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSavedPosts(response.data);
    } catch (error) {
      console.error('Error fetching saved posts:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'saved') {
      getSavedPosts();
    }
  }, [activeTab, userName]);

  const handleUnsave = async (postId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/unsavePost/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const updatedSavedPosts = savedPosts.filter(
        (post) => post._id !== postId
      );
      setSavedPosts(updatedSavedPosts);
    } catch (error) {
      console.error('Error unsaving post:', error);
    }
  };

  const renderSavedPosts = () => {
    if (activeTab === 'saved') {
      return savedPosts.map((post) => (
        <Post
          key={post._id}
          post={post}
          user={user}
          profile={true}
          handleUnsave={handleUnsave}
        />
      ));
    }
    return null;
  };

  const renderLikedPosts = () => {
    if (activeTab === 'liked') {
      return likedPosts.map((post) => (
        <Post
          key={post._id}
          post={post}
          user={user}
          profile={true}
          handleUnsave={handleUnsave}
        />
      ));
    }
    return null;
  };

  return (
    <div className='profile_menu_wrap'>
      <div className='profile_menu'>
        <Link
          to='#'
          className={activeTab === 'about' ? 'active' : ''}
          onClick={() => handleClick('about')}
        >
          About
        </Link>
        <Link
          to='#'
          className={activeTab === 'saved' ? 'active' : ''}
          onClick={() => handleClick('saved')}
        >
          Saved
        </Link>
        <Link
          to='#'
          className={activeTab === 'liked' ? 'active' : ''}
          onClick={() => handleClick('liked')}
        >
          Liked
        </Link>
        <Link
          to='#'
          className={activeTab === 'recommended' ? 'active' : ''}
          onClick={() => handleClick('recommended')}
        >
          Recommended
        </Link>
      </div>

      {activeTab === 'saved' && (
        <div>
          <div className='saved-posts'>{renderSavedPosts()}</div>
        </div>
      )}
    </div>
  );
}
