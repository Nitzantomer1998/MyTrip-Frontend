import { Link } from 'react-router-dom';

export default function ProfileMenu({ activeTab, setActiveTab }) {
  const handleClick = (tab) => {
    setActiveTab(tab);
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
    </div>
  );
}
