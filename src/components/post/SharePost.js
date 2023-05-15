import React from 'react';
import { sharePost } from '../../functions/post';

export default function SharePost({ user, post, onSuccess, onFailure }) {
  const handleShare = async () => {
    try {
      const response = await sharePost(post._id, user.id, user.token);
      if (response.status === 'ok') {
        if (onSuccess) {
          onSuccess();
        } else {
          alert('Le post a été partagé avec succès !');
        }
      } else {
        if (onFailure) {
            console.log(response);
          onFailure();
        } else {
          alert("Une erreur s'est produite lors du partage du post.");
        }
      }
    } catch (error) {
      if (onFailure) {
        onFailure();
      } else {
        alert("Une erreur s'est produite lors du partage du post.");
      }
    }
  };

  return (
    <div className='post_action hover1' onClick={handleShare}>
      <i className='share_icon'></i>
      <span>Share</span>
    </div>
  );
}
