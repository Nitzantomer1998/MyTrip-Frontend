import { Link } from 'react-router-dom';




export default function ProfileMenu() {
  return (
    <div className='profile_menu_wrap'>
      <div className='profile_menu'>
        <Link to='/profile'>
          About
        </Link>
        <Link to='/profile'>
          Saved
        </Link>
        <Link to='/profile'>
          Liked
        </Link>
        <Link to='/profile'>
          Recommended
        </Link>
      </div>
    </div>
  );
}
