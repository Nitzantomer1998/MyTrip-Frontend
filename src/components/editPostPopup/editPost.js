import { useState, useEffect, useRef } from 'react';
import './style.css';
import axios from 'axios';
import { uploadImages } from '../../functions/uploadImages';
import dataURItoBlob from '../../helpers/dataURItoBlob';
import { useSelector } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';
import useClickOutside from '../../helpers/clickOutside';



export default function EditPost({ 
  postId, 
  token,
  handleSubmit,
}) {
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [showPrev, setShowPrev] = useState(false);
  const [post, setPost] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const imageInputRef = useRef(null);
  const { user } = useSelector((state) => ({ ...state.user }));
  const [loading, setLoading] = useState(false);
  const popup = useRef(null);
  useClickOutside(popup, () => {
    handleSubmit(false);
  }); 






  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  const handleInputChangeLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmits = async (event) => {
    event.preventDefault();
    setLoading(true);
    //test de conversion des images pour uploadImages
    const postImages = selectedImages.map((img) => {
      return dataURItoBlob(img);
    });
    const path = `${user.username}/post_images`;
    let formData = new FormData();
    formData.append('path', path);
    postImages.forEach((selectedImages) => {
     formData.append('files', selectedImages);
    });

    const responseUploadImages = selectedImages.length > 0 ? await uploadImages(formData, path, token) : [];
    console.log('response from uploadImages : '+ JSON.stringify(responseUploadImages));
    //fin de lessai



    console.log('post.images au dessus de updateImages : '+ JSON.stringify(post.images));
    let updateImages = [];
    try {
      console.log('post.images:', post.images);
      console.log('responseUploadImages:', responseUploadImages);

      if (post.images && post.images.length > 0) {
        updateImages = [...post.images, ...responseUploadImages];
      } else {
        updateImages = responseUploadImages;
      }
    } catch (error) {
      console.error('Error: ', error);
    }


    
    
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/updatePost/${postId}`,
        {
          content: content,
          selectedImages: updateImages,
          location: location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          
        }
        
      );
      // Faire quelque chose avec la réponse (redirection, mise à jour de l'état, etc.)
    } catch (error) {
      console.error('Error updating post:', error);
      // Gérer les erreurs de requête
    }
    setLoading(false);
    handleSubmit(false);
    window.location.reload();
    //window.location.reload();
    



  };


  const handleImageAdd = (e) => {
    
      let files = Array.from(e.target.files);
      files.forEach((img) => {
      console.log("img from handleImageAdd"+img);
      if (
        img.type !== 'image/jpeg' &&
        img.type !== 'image/png' &&
        img.type !== 'image/webp' &&
        img.type !== 'image/gif'
      ) {
        //setError(
         // `${img.name} format is unsupported ! only Jpeg, Png, Webp, Gif are allowed.`
        //);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        //setError(`${img.name} size is too large max 5mb allowed.`);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (readerEvent) => {
          setSelectedImages((images) => [...images, readerEvent.target.result]);
        };
        console.log('selectedImages from habdleAddImages : '+ selectedImages);
      }
    });



    // const file = event.target.files[0];
    // console.log('file : '+ JSON.stringify(file));
    // console.log("target : "+ JSON.stringify(event.target.files));
    // setSelectedImages((prevImages) => [...prevImages, file]);
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
          setLocation(response.data.location);
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
    post.images.splice(imageIndex, 1);
    setPost({ ...post.images, images: updatedImages });
  };

  return (
    <div className='blur'>
      <div className='postBox' ref={popup}>
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
                value={location}
                onChange={handleInputChangeLocation}
                rows={5}
                cols={50}
                maxLength={2000}
              />
              <div className='char-count'>{location.length}/{2000}</div>
            </div>
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
      
    </div>
  ) : (
    <div className='no-picture'>No more picture</div>
  )}
  <div className='image-grid'>
    {selectedImages.map((image, i) => (
      <div key={i} className='image-container'>
        <img src={image} alt='' className={`img-${i}`} />
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
          accept='image/jpeg,image/png,image/webp,image/gif'
          ref={imageInputRef}
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

          <button className='submit-btn' type='submit' disable={loading}>
          {loading ? <PulseLoader color='#fff' size={5} /> : 'Save Changes'}
          </button>
        </form>
      </div>
      
    </div>
  );

}


