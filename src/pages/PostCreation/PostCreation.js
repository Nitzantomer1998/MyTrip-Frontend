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

      <h2 className='create-a-post'>Create a post</h2>
      <form className='create-post-form'>
        <div className='user-info'>
          <label className='user-name' htmlFor='username'>
            Username
          </label>
          <input
            className='location-input'
            type='text'
            id='location'
            name='location'
            placeholder='Location'
          />
        </div>
        <textarea
        className='description'
          id='description'
          name='description'
          placeholder="What's up ?"
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
            <div key={index}>
              <p>{file.name}</p>
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                style={{ maxWidth: '100%', maxHeight: '200px' }}
              />{' '}
              {/* Ajouter cette ligne pour afficher l'image */}
            </div>
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
