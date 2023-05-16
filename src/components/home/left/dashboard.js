import LeftLink from './LeftLink';
import './style.css';
import { left } from '../../../data/home';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function dashboard({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  z;

  const [visible, setVisible] = useState(false);
  return (
    <div className='left_home scrollbar'>
      <Link to='/profile' className='left_link hover1'>
        <img src={user?.picture} alt='' />
        <span>
          {user?.username}
        </span>
      </Link>
      {left.slice(0, 4).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
          path={link.path}
        />
      ))}
      {!visible && (
        <div
          className='left_link hover1'
          onClick={() => {
            setVisible(true);
          }}
        ></div>
      )}
      <div className='splitter'></div>
      <h1
        className='logout_site'
        onClick={() => {
          logout();
        }}
      >
        Logout
      </h1>
    </div>
  );
}
