import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PostCreation.css';

function PostCreation({ showPopup, onClose }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files).slice(0, 10);
    setSelectedFiles(files);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className='create-post-tab'>
      <span className='close-btn' onClick={handleClose}>
        &times;
      </span>

      <h2>Create a post</h2>
      <form className='create-post-form'>
        <div className='user-info'>
          <label className='user-name' htmlFor='username'>
            Username
          </label>
        </div>
        <label className='create-post-form-title' htmlFor='title'>
          Location
        </label>
        <input
          type='text1'
          id='location'
          name='location'
          placeholder='Location'
        />
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          name='description'
          placeholder='Description'
        />
        <div className='upload-photo'>
          <label htmlFor='image'>Images</label>
          <input
            type='file'
            id='image'
            name='image'
            accept='image/*'
            multiple
            onChange={handleFileInputChange}
          />
        </div>
        <div className='selected-files'>
          {selectedFiles.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  );
}

PostCreation.propTypes = {
  showPopup: PropTypes.bool,
  onClose: PropTypes.func,
};

export default PostCreation;
