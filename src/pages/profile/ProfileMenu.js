import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfileMenu({ activeTab, setActiveTab, user }) {
  const [savedPosts, setSavedPosts] = useState([]);

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  const getSavedPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPostsSaved/${user?.username}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log('Saved Posts:', response.data); // Ajouter cette ligne pour vérifier les données renvoyées par l'API

      setSavedPosts(response.data);
    } catch (error) {
      console.error('Error fetching saved posts:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'saved') {
      getSavedPosts();
    }
  }, [activeTab]);

  const renderSavedPosts = () => {
    if (activeTab === 'saved') {
      console.log('Saved Posts:', savedPosts); // Ajouter cette ligne pour vérifier les données des posts sauvegardés

      return savedPosts.map((post) => (
        <div key={post.id} className='saved-post'>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
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

      <div className='saved-posts'>{renderSavedPosts()}</div>
    </div>
  );
}
