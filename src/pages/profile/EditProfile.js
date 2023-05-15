import React, { useEffect, useState } from 'react';
import './style.css';
import Header from '../../components/header/index';
import ChangePassword  from '../reset/ChangePassword';
import Cookies from 'js-cookie';
import axios from 'axios';


export default function EditProfile( user ) {
    


    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [password, setPassword] = useState('');
    const [conf_password, setConf_password] = useState('');
    const [editPassword, setEditPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [userInfos, setUserInfos] = useState({email : '`{user.email}`'});
    
  



    const handleDeleteConfirmation = () => {
      setShowDeleteConfirmation(true);
    }
  
    const handleDeleteAccount = () => {
      // Perform your dangerous critical action here.
      console.log("Deleting account...");
      setShowDeleteConfirmation(false);
    }
  
    const handleCancelDelete = () => {
      setShowDeleteConfirmation(false);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);

      }
    
      const handleSavePassword = () => {
        console.log("Saving password... " + password);
        //ta grand mere la reine de chauve ca ne marche pas
        setPassword('password');
        setConf_password('password');

      }


    return (
      <div className='head'>
        <Header page='profile'/>
        <div className='Edit-wrapper'>
        <br />
        <br />
        <br />
          <h1>Edit Profile</h1>
          <p>
          <button className='btn_delete_account' onClick={handleDeleteConfirmation}>Delete Account</button>
          
        
        {showDeleteConfirmation &&
          <div className="delete-confirmation">
            <p>Are you sure you want to delete your account?</p>
            <button className="confirm_btn_delete" onClick={handleDeleteAccount}>Yes</button>
            <button className="cancel_btn_delete" onClick={handleCancelDelete}>Cancel</button>
          </div>
        }
          <ChangePassword
          password={password}
          setPassword={setPassword}
          conf_password={conf_password}
          setConf_password={setConf_password}
          error={error}
          loading={loading}
          setLoading={setLoading}
          userInfos={userInfos}
          setError={setError}
        />
          </p>

        
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
