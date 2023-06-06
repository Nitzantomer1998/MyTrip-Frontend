import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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
  // useEffect(() => {
  //   setUserInfos({ email: user ? user.email : '' });
  // }, [user]);

  // useEffect(() => {
  //   console.log("the userInfos is " + JSON.stringify(userInfos));
  // }, [userInfos]);

  // useEffect(() => {
  //   updateUserInfo();
  // }, [user]);

  // const updateUserInfo = () => {
  //   setUserInfos({ email: user ? user.email : '' });
  // }

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

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSavePassword = () => {
    console.log('Saving password... ' + password);
    //ta grand mere la reine de chauve ca ne marche pas
    setPassword('password');
    setConf_password('password');
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

        <div>
          {/*
          <label htmlFor="username">New Password:  </label>
          <input type="text" id="password" value={password} onChange={handlePasswordChange} />
          <button className="btn_save" onClick={handleSavePassword}>Save</button>
          */}
        </div>
      </div>
    </div>
  );
}
