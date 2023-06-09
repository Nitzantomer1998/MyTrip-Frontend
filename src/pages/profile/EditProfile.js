import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Header from '../../components/header/index';
import ChangePassword from '../reset/ChangePassword';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';

export default function EditProfile() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [password, setPassword] = useState('');
  const [conf_password, setConf_password] = useState('');
  const [editPassword, setEditPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state);
  const [userInfos, setUserInfos] = useState({ user });

  const {
    user: { token },
  } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteAccount = async () => {
    try {
      console.log('user ' + JSON.stringify(user));
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPassword('');
      setConf_password('');
      setError('');
      setShowDeleteConfirmation(false);
      console.log('Account deleted!');
      Cookies.remove('user');
      dispatch({
        type: 'LOGOUT',
      });
      navigate('/login');
    } catch (error) {
      console.log('1');
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

  return (
    <div className='head'>
      <Header page='profile' />
      <div className='Edit-wrapper'>
        <br />
        <br />
        <br />
        <h1 className='edit_profile'>Edit Profile</h1>
        <div>
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
