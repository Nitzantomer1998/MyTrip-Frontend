import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { Logo, Search } from '../../svg';
import { useSelector } from 'react-redux';
import SearchMenu from './SearchMenu';
import { useRef, useState } from 'react';
import useClickOutside from '../../helpers/clickOutside';

export default function Header({ page, getAllPosts }) {
  const { user } = useSelector((state) => ({ ...state.user }));
  const color = '#65676b';
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const allmenu = useRef(null);
  const usermenu = useRef(null);
  const navigate = useNavigate();
  useClickOutside(allmenu, () => {
    setShowAllMenu(false);
  });
  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });

  const handleLogoClick = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <header>
      <div className='header_left'>
        <div className='header_logo' onClick={handleLogoClick}>
          <div className='circle'>
            <Logo />
          </div>
        </div>
        <div
          className='search search1'
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type='text'
            placeholder='Search In MyTrip'
            className='hide_input'
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu
          color={color}
          setShowSearchMenu={setShowSearchMenu}
          user={user}
        />
      )}
    </header>
  );
}
