import React, { useRef, useState } from 'react';
import MenuItem from './MenuItem';
import useOnClickOutside from '../../helpers/clickOutside';
import { deletePost, savePost } from '../../functions/post';
import { saveAs } from 'file-saver';
import EditPost from '../editPostPopup/editPost.js';

export default function PostMenu({
  postUserId,
  userId,
  imagesLength,
  setShowMenu,
  token,
  postId,
  checkSaved,
  setCheckSaved,
  images,
  postRef,
}) {
  const [test, setTest] = useState(postUserId === userId ? true : false);
  const [editing, setEditing] = useState(false);

  const menu = useRef(null);
  useOnClickOutside(menu, () => setShowMenu(false));
  
  const saveHandler = async () => {
    savePost(postId, token);
    if (checkSaved) {
      setCheckSaved(false);
    } else {
      setCheckSaved(true);
    }
  };
  
  const downloadImages = async () => {
    images.map((img) => {
      saveAs(img.url, 'image.jpg');
    });
  };
  
  const deleteHandler = async () => {
    const res = await deletePost(postId, token);
    if (res.message === 'Post deleted successfully') {
      postRef.current.remove();
    }
  };
  
  const editHandler = () => {
    setEditing(true);
  };
  
  const handleEditSubmit = () => {
    // Effectuer des actions supplémentaires si nécessaire après la modification du post
    setEditing(false); // Désactiver le mode d'édition après la soumission du formulaire
  };
  
  if (editing) {
    return (
      <EditPost postId={postId} token={token} handleSubmit={handleEditSubmit} />
    );
  }
  
  return (
    <ul className='post_menu' ref={menu}>
      <div onClick={() => saveHandler()}>
        {checkSaved ? (
          <MenuItem
            icon='save_icon'
            title='Unsave Post'
            subtitle='Remove this from your saved items.'
          />
        ) : (
          <MenuItem
            icon='save_icon'
            title='Save Post'
            subtitle='Add this to your saved items.'
          />
        )}
      </div>
      <div className='line'></div>
      {test && (
        <div onClick={editHandler}>
          <MenuItem
            icon='edit_icon'
            title='Edit Post'
          />
        </div>
      )}
  
      {test && (
        <div onClick={() => deleteHandler()}>
          <MenuItem
            icon='trash_icon'
            title='Move to trash'
            subtitle='Items in your trash are deleted after 30 days.'
          />
        </div>
      )}
    </ul>
  );
}
