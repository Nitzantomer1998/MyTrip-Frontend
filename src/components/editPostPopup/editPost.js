import { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import AddToYourPost from '../createPostPopup/AddToYourPost';
import ImagePreview from '../createPostPopup/ImagePreview';

export default function EditPost({ 
  postId, 
  token,
    handleSubmit,
}) {
  const [content, setContent] = useState('');
  const [showPrev, setShowPrev] = useState(false);
  const [post, setPost] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);


  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmits = async (event) => {
    event.preventDefault();
    const updatedImages = [...selectedImages, ...post.images];
    console.log('UpdatesImages : '+ updatedImages);
    console.log('content : '+ content);
  };

  const handleImageAdd = (event) => {
    const file = event.target.files[0];
    setSelectedImages((prevImages) => [...prevImages, file]);
  };
  

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getPostbyId/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response) {
          setPost(response.data);
          setContent(response.data.text);
        } else {
          console.log('1');
        }
      } catch (error) {
        console.log('2');
      }
    };

    fetchPost();
  }, [postId, token]);

  const handleImageDelete = (imageIndex) => {
    const updatedImages = [...post.images];
    updatedImages.splice(imageIndex, 1);
    setPost({ ...post, images: updatedImages });
  };

  return (
    <div className='blur'>
      <div className='postBox'>
        <div className='box_header'>
          <div
            className='small_circle'
            onClick={() => {
                handleSubmit();
            }}
          >
            <i className='exit_icon'></i>
          </div>
          <span>Edit Post</span>
        </div>
        <div className='box_profile'>
          <div className='box_col'>
            <div className='post_text'>
              <textarea
                className='post_textarea'
                value={content}
                onChange={handleInputChange}
                rows={5}
                cols={50}
                maxLength={2000}
              />
              <div className='char-count'>{content.length}/{2000}</div>
            </div>
            <div className='post_imgs'>
  {post.images && post.images.length ? (
    <div
      className={
        post.images.length === 1
          ? 'grid_1'
          : post.images.length === 2
          ? 'grid_2'
          : post.images.length === 3
          ? 'grid_3'
          : post.images.length === 4
          ? 'grid_4'
          : post.images.length >= 5
          ? 'grid_5'
          : ''
      }
    >
      {post.images.slice(0, 5).map((image, i) => (
        <div key={i} className='image-container'>
          <img src={image.url} key={i} alt='' className={`img-${i}`} />
          <div className='delete-icon' onClick={() => handleImageDelete(i)}>
            X
          </div>
        </div>
      ))}
      {post.images.length > 5 && (
        <div className='more-pics-shadow'>+{post.images.length - 5}</div>
      )}
    </div>
  ) : (
    <div className='no-picture'>No more picture</div>
  )}
  <div className='image-grid'>
    {selectedImages.map((image, i) => (
      <div key={i} className='image-container'>
        <img src={URL.createObjectURL(image)} alt='' className={`img-${i}`} />
        <div
          className='delete-icon'
          onClick={() =>
            setSelectedImages((prevImages) =>
              prevImages.filter((_, index) => index !== i)
            )
          }
        >
          X
        </div>
      </div>
    ))}
    {selectedImages.length < 5 && (
      <div className='add-image'>
        <label htmlFor='image-upload' className='add-image-button' > 
          <input
          id='image-upload'
          type='file'
          accept='image/*'
          onChange={handleImageAdd}
          
          
          />
          
        </label>
      </div>
    )}
  </div>
</div>

          </div>
        </div>
        <form onSubmit={handleSubmits}>
          <button className='submit-btn' type='submit'>Save Changes</button>
        </form>
      </div>
      
    </div>
  );

}


