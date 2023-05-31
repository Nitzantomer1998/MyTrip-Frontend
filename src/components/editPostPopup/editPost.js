import { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import AddToYourPost from '../createPostPopup/AddToYourPost';
import ImagePreview from '../createPostPopup/ImagePreview';

export default function EditPost({ 
  postId, 
  token,  // Images du post
}) {
  const [content, setContent] = useState('');
  const [showPrev, setShowPrev] = useState(false);
  const [post, setPost] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);



  const handleInputChange = (event) => {
    setContent(event.target.value);

    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // ...
  };

  const handleImageUpload = (event) => {
    const selectedImages = Array.from(event.target.files);
    setSelectedImages(selectedImages);
  };
  


  useEffect(() => {
    
    const fetchPost = async () => {
      try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getPostbyId/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(`response = ${JSON.stringify(response.data)}`);

        if (response) {
            setPost(response.data);
            setContent(response.data.text);
            console.log(`post = ${JSON.stringify(post)}`);
        } else {
          console.log('1');
        }
      } catch (error) {
        console.log('2');
        
      }
    };

    fetchPost();
  }, [postId, token]);


  const handleImageDelete = (imageIndex) => { //cette fonction cest pour la croix de suppression a linterieur des images
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
              // Gérer la fermeture du composant ici
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
                    <div className='char-count'>{content.length}/{2000}</div> {/* Affichage du compteur de caractères */}

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


            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          
          
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
