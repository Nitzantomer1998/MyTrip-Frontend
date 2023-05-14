import React, { useState } from 'react';
import './style.css';
import Header from '../../components/header/index';

const handleDeleteAll = () => {
    const choice = window.confirm(
      "Tu file du mauvais coton maurice, tu veux vraiment supprimer ton compte ?"
    )
    if (choice) {
      // Perform your dangerous critical action here.
    }
  }

export default function EditProfile() {
    
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [password, setPassword] = useState('John Doe');

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
          
        </p>
        {showDeleteConfirmation &&
          <div className="delete-confirmation">
            <p>Are you sure you want to delete your account?</p>
            <button className="confirm_btn_delete" onClick={handleDeleteAccount}>Yes</button>
            <button className="confirm_btn_delete" onClick={handleCancelDelete}>No</button>
          </div>
        }
        <p> <div>
          <label htmlFor="username">Username:  </label>
          <input type="text" id="password" value={password} onChange={handlePasswordChange} />
          <button className="btn_save" onClick={handleSavePassword}>Save</button>
        </div></p>
        
        </div>
      </div>
    );
  }
