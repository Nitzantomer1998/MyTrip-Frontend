import { Link } from 'react-router-dom';
import './style.css';
import Moment from 'react-moment';
import { Dots, Public } from '../../svg';
import ReactsPopup from './ReactsPopup';
import { useEffect, useRef, useState } from 'react';
import CreateComment from './CreateComment';
import PostMenu from './PostMenu';
import Modal from 'react-modal';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import {
  comment,
  getReacts,
  addLike,
  removeLike,
  addRecommend,
  removeRecommend,
  reactPost,
} from '../../functions/post';
import Comment from './Comment';
import SharePost from './SharePost';
import icon from '../../images/location.png';
import Reactions from '../../pages/home/Reactions/Reactions';
import { getPostLikes, getPostRecommends } from '../../functions/post';
import { useSelector } from 'react-redux';

Modal.setAppElement('#root'); // Définit l'élément racine de l'application pour l'accessibilité

export default function Post({ post, user, profile }) {
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reacts, setReacts] = useState();
  const [check, setCheck] = useState();
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(1);
  const [checkSaved, setCheckSaved] = useState();
  const [comments, setComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  let [likesCount, setLikesCount] = useState(0);
  const [isRecommend, setIsRecommend] = useState(false);
  let [recommendsCount, setRecommendsCount] = useState(0);
  const [isPressed, setIsPressed] = useState(['like', 'unlike']);
  const [reactionsPopUp, setReactionsPopUp] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    setComments(post?.comments);
  }, [post]);

  useEffect(() => {
    const fetchPostLikes = async () => {
      const likes = await getPostLikes(post._id, user.token);
      setLikesCount(likes.data.likes.length);
      let i = 0;
      let found = false;
      while (i < likes.data.likes.length && !found) {
        if (
          likes.data.likes[i].like &&
          likes.data.likes[i].like._id === user.id
        ) {
          setIsLiked(true);
        }
        i++;
      }
    };
    fetchPostLikes();
  }, [post._id, user.token]);

  useEffect(() => {
    const fetchPostRecommends = async () => {
      const recommends = await getPostRecommends(post._id, user.token);
      setRecommendsCount(recommends.data.recommends.length);
      let i = 0;
      let found = false;

      while (i < recommends.data.recommends.length && !found) {
        if (
          recommends.data.recommends[i].recommend &&
          recommends.data.recommends[i].recommend._id === user.id
        ) {
          setIsRecommend(true);
        }
        i++;
      }
    };
    fetchPostRecommends();
  }, [post._id, user.token]);

  const handleAddLike = async () => {
    if (!isLiked) {
      await addLike(post._id, user.token);
      setIsLiked(true);
      setLikesCount(likesCount + 1);
    } else {
      await removeLike(post._id, user.token);
      setIsLiked(false);
      setLikesCount(likesCount - 1);
    }
  };

  const handleAddRecommend = async () => {
    if (!isRecommend) {
      await addRecommend(post._id, user.token);
      setIsRecommend(true);
      setRecommendsCount(recommendsCount + 1);
    } else {
      await removeRecommend(post._id, user.token);
      setIsRecommend(false);
      setRecommendsCount(recommendsCount - 1);
    }
  };

  const handleShareSuccess = () => {
    openModal();
    setShowSuccessMessage(true);
    setTimeout(closeModal, 2000);
  };

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const handleShareFailure = () => {
    openModal();
    setShowSuccessMessage(true);
    setTimeout(closeModal, 1000);
  };

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const showMore = () => {
    setCount((prev) => prev + 3);
  };
  const postRef = useRef(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedImage(null);
  };

  const handleNextImage = () => {
    const currentIndex = post.images.findIndex(
      (image) => image.url === selectedImage
    );
    const nextIndex = (currentIndex + 1) % post.images.length;
    setSelectedImage(post.images[nextIndex].url);
  };

  const handlePreviousImage = () => {
    const currentIndex = post.images.findIndex(
      (image) => image.url === selectedImage
    );
    const previousIndex =
      (currentIndex - 1 + post.images.length) % post.images.length;
    setSelectedImage(post.images[previousIndex].url);
  };

  return (
    <div className='post' style={{ width: `${profile && '100%'}` }}>
      {post.sharedFrom != null && (
        <div className='shared_by'>
          {user.id === post.sharingUser._id
            ? 'You shared your own post'
            : `${post?.sharingUser?.username} shared the post of ${post?.originalUser?.username}`}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel='Share Success Modal'
        className='share-modal'
        shouldCloseOnOverlayClick={true}
      >
        <h3>Post shared successfully!</h3>
      </Modal>

      {showSuccessMessage && (
        <div className='success_message'>Post shared successfully!</div>
      )}

      <div className='post_header'>
        <Link
          to={`/profile/${post?.user?.username}`}
          className='post_header_left'
        >
          <img src={post?.user?.picture} alt='' />
          <div className='header_col'>
            <div className='post_profile_name'>
              {post?.user?.username}
              <div className='updated_p'>
                {post.type == 'profilePicture' &&
                  `updated ${
                    post.user?.gender === 'male' ? 'his' : 'her'
                  } profile picture`}
                {post.type == 'coverPicture' &&
                  `updated ${
                    post.user.gender === 'male' ? 'his' : 'her'
                  } cover picture`}
              </div>
            </div>
            <div className='post_profile_privacy_date'>
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              . <Public color='#828387' />
            </div>
          </div>
        </Link>
        <div
          className='post_header_right hover1'
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <Dots color='#828387' />
        </div>
      </div>
      {post.background ? (
        <div
          className='post_bg'
          style={{ backgroundImage: `url(${post.background})` }}
        >
          <div className='post_bg_text'>{post.text}</div>
        </div>
      ) : post.type === null ? (
        <>
          {post.location && (
            <div className='post_textt'>
              <img className='image_location' src={icon} width={15}></img>{' '}
              {post.location}
            </div>
          )}

          <div className='post_text'>{post.text}</div>
          {post.images && post.images.length && (
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
                  : post.images.length >= 5 && 'grid_5'
              }
            >
              {post.images.slice(0, 5).map((image, i) => (
                <img
                  src={image.url}
                  key={i}
                  alt=''
                  className={`img-${i}`}
                  onClick={() => handleImageClick(image.url)}
                />
              ))}
              {post.images.length > 5 && (
                <div className='more-pics-shadow'>
                  +{post.images.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      ) : post.type === 'profilePicture' ? (
        <div className='post_profile_wrap'>
          <div className='post_updated_bg'>
            <img src={post.user?.cover} alt='' />
          </div>
          <img
            src={post.images[0].url}
            alt=''
            className='post_updated_picture'
          />
        </div>
      ) : (
        <div className='post_cover_wrap'>
          <img src={post.images[0].url} alt='' />
        </div>
      )}
      <div className='post_infos'>
        <div className='reacts_count'>
          <div className='reacts_count_imgs'>
            {likesCount && likesCount > 0 ? (
              <img src={`../../../reacts/like.svg`} alt='' />
            ) : (
              <></>
            )}

            {recommendsCount && recommendsCount > 0 ? (
              <img src={`../../../reacts/love.svg`} alt='' />
            ) : (
              <></>
            )}
          </div>
          <div
            className='reacts_count_num'
            onClick={() => setSelectedPost(post)}
          >
            {likesCount + recommendsCount > 0 && likesCount + recommendsCount}
          </div>
        </div>
        <div className='to_right'>
          <div className='comments_count'>{comments.length} comments</div>
        </div>
      </div>
      <div className='post_actions'>
        <div className='post_action hover1' onClick={handleAddLike}>
          <div className='likeRow'>
            <span style={{ color: isLiked ? '#1877F2' : 'gray' }}>
              {isLiked && <img src='../../../reacts/like.svg' alt='' />}
              Like{' '}
            </span>
          </div>
        </div>
        <div className='post_action hover1' onClick={handleAddRecommend}>
          <div className='recommendRow'>
            <span style={{ color: isRecommend ? '#F36B7E' : 'gray' }}>
              {isRecommend && <img src='../../../reacts/love.svg' alt='' />}
              Recommend{' '}
            </span>
          </div>
        </div>
        <div className='post_action hover1'>
          <i className='comment_icon'></i>
          <span>Comment</span>
        </div>

        <SharePost
          post={post}
          user={user}
          onSuccess={handleShareSuccess}
          onFailure={handleShareFailure}
        />
      </div>
      <div className='comments_wrap'>
        <div className='comments_order'></div>
        <CreateComment
          user={user}
          postId={post._id}
          setComments={setComments}
          setCount={setCount}
        />
        {comments &&
          comments
            .sort((a, b) => {
              return new Date(b.commentAt) - new Date(a.commentAt);
            })
            .slice(0, count)
            .map((comment, i) => <Comment comment={comment} key={i} />)}
        {count < comments.length && (
          <div className='view_comments' onClick={() => showMore()}>
            View more comments
          </div>
        )}
      </div>
      {showMenu && (
        <PostMenu
          userId={user.id}
          postUserId={post.user._id}
          imagesLength={post?.images?.length}
          setShowMenu={setShowMenu}
          postId={post._id}
          token={user.token}
          checkSaved={checkSaved}
          setCheckSaved={setCheckSaved}
          images={post.images}
          postRef={postRef}
          post={post}
        />
      )}
      {selectedPost ? (
        <Reactions
          post={selectedPost}
          user={user}
          likesCount={likesCount}
          recommendsCount={recommendsCount}
          closeModal={() => setSelectedPost(null)}
        />
      ) : (
        <></>
      )}
      <Modal
        isOpen={isPopupOpen}
        onRequestClose={closePopup}
        contentLabel='Image Popup'
        className='image_popupp'
      >
        <div className='image_popup_container'>
          <button className='close-buttonn' onClick={closePopup}>
            &times;
          </button>
          <FaChevronLeft
            className='previous_image'
            onClick={handlePreviousImage}
          />
          <img src={selectedImage} alt='' className='images_popups' />
          <FaChevronRight className='next_image' onClick={handleNextImage} />
        </div>
      </Modal>
    </div>
  );
}
