import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Header from '../../components/header/index';
import ChangePassword from '../reset/ChangePassword';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { changeUsername } from '../../functions/user';

export default function EditProfile() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [password, setPassword] = useState('');
  const [conf_password, setConf_password] = useState('');
  const [editPassword, setEditPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state);
  const [userInfos, setUserInfos] = useState({ user });
  const [showChangeUsername, setShowChangeUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  const {
    user: { token },
  } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEditUsername = () => {
    setShowChangeUsername((prevState) => !prevState);
    setNewUsername(''); // Clear the input field when showing the popup
  };

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation((prevShow) => !prevShow);
  };

  const handleDeleteAccount = async () => {
    try {
      //console.log('user ' + JSON.stringify(user));
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPassword('');
      setConf_password('');
      setError('');
      setShowDeleteConfirmation(false);
      //console.log('Account deleted!');
      Cookies.remove('user');
      dispatch({
        type: 'LOGOUT',
      });
      navigate('/login');
    } catch (error) {
      //console.log('1');
      setError(error.response.data.message);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleEditPassword = () => {
    setEditPassword(!editPassword);
  };

  const handleCancelEdit = () => {
    setEditPassword(false);
    navigate('/profile');
  };

  const handleChangeUsername = async () => {
    if (newUsername.trim() === '') {
      setError('Please enter a valid username');
      return;
    }

    if (newUsername.length < 5 || newUsername.length > 16) {
      setError('Username must be between 5 and 16 letters');
      return;
    }

    try {
      const response = await changeUsername(newUsername, token);

      const userCookie = Cookies.get('user');
      const user = userCookie ? JSON.parse(userCookie) : {};
      user.username = newUsername;
      Cookies.set('user', JSON.stringify(user));

      setShowChangeUsername(false);
      setRefreshPage(true);
    } catch (error) {
      setError(error.data.message);
    }
  };

  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    if (refreshPage) {
      window.location.reload();
    }
  }, [refreshPage]);

  return (
    <div className='head'>
      <Header page='profile' />
      <div className='Edit-wrapper'>
        <br />
        <br />
        <br />
        <h1 className='edit_profile'>Edit Profile</h1>
        <div>
          <div>
            <button className='btn_edit_password' onClick={handleEditUsername}>
              Edit Username
            </button>
          </div>
          {showChangeUsername && (
            <div className='username-popup'>
              <h2 className='text-title'>Change Username</h2>
              <div className='input-row'>
                <h3 className='text-input'>Enter new username:</h3>
                <input
                  type='text'
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>
              {error && <div className='error-message'>{error}</div>}

              <div className='button-container'>
                <button
                  className='gray_btn'
                  onClick={() => setShowChangeUsername(false)}
                >
                  Cancel
                </button>
                <button className='blue_btn' onClick={handleChangeUsername}>
                  Save
                </button>
              </div>
            </div>
          )}
          <button className='btn_edit_password' onClick={handleEditPassword}>
            Edit Password
          </button>

          {editPassword && (
            <ChangePassword
              password={password}
              setPassword={setPassword}
              conf_password={conf_password}
              setConf_password={setConf_password}
              error={error}
              loading={loading}
              setLoading={setLoading}
              user={userInfos.user}
              setError={setError}
            />
          )}
          <br />
          <br />
          <button
            className='btn_delete_account'
            onClick={handleDeleteConfirmation}
          >
            Delete Account
          </button>

          {showDeleteConfirmation && (
            <div className='delete-confirmation'>
              <p>Are you sure you want to delete your account?</p>
              <button
                className='confirm_btn_delete'
                onClick={handleDeleteAccount}
              >
                Yes
              </button>
              <button
                className='cancel_btn_delete'
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
