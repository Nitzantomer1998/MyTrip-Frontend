import { useRef, useState } from 'react';
import ProfilePicture from '../../components/profielPicture';
import Friendship from './Friendship';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserStatistics } from '../../functions/user';

export default function ProfielPictureInfos({
  profile,
  visitor,
  photos,
  post,
  userPosts,
}) {
  const { user } = useSelector((state) => ({ ...state.user }));
  const [show, setShow] = useState(false);
  const pRef = useRef(null);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalRecommends, setTotalRecommends] = useState(0);

  useEffect(() => {
    const fetchUserStatistics = async () => {
      if (user && user.id && user.token) {
        const data = await getUserStatistics(user);
        if (data) {
          setTotalLikes(data.receivedLikes);
          setTotalRecommends(data.receivedRecommends);
        }
      } else {
        console.log('User, user id or user token is undefined', user);
      }
      console.log(visitor, 'profile');
    };
    fetchUserStatistics();
  }, [user]);

  useEffect(() => {
    if (userPosts) {
      const countLikes = userPosts.reduce(
        (acc, post) => acc + post.likes.length,
        0
      );
      setTotalLikes(countLikes);
    }
  }, [userPosts]);

  return (
    <div className='profile_img_wrap'>
      {show && <ProfilePicture setShow={setShow} pRef={pRef} photos={photos} />}
      <div className='profile_w_left'>
        <div className='profile_w_img'>
          <div
            className='profile_w_bg'
            ref={pRef}
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${profile.picture})`,
            }}
          ></div>
          {!visitor && (
            <div
              className='profile_circle hover1'
              onClick={() => setShow(true)}
            >
              <i className='camera_filled_icon'></i>
            </div>
          )}
        </div>
        <div className='profile_w_col'>
          <div className='profile_name'>{profile?.username}</div>
        </div>
      </div>
      {visitor ? (
        <Friendship friendshipp={profile?.friendship} profileid={profile._id} />
      ) : (
        <div className='profile_w_right'>
          <div className='gray_btn'>
            <i className='edit_icon'></i>
            <Link to='/editprofile'>Edit Profile</Link>
          </div>
        </div>
      )}

      <div className='following'>
        {profile?.followers && (
          <div className='profile_followers_count'>
            {profile?.followers.length === 0
              ? '0'
              : profile?.followers.length === 1
              ? '1'
              : `${profile?.followers.length}`}
          </div>
        )}
        <Link to='/followers' state={{ user: profile }} className='hover1'>
          Followers
        </Link>
      </div>

      <div className='following'>
        {profile?.following && (
          <div className='profile_following_count'>
            {profile?.following.length === 0
              ? '0'
              : profile?.following.length === 1
              ? '1'
              : `${profile?.following.length}`}
          </div>
        )}
        <Link to='/following' state={{ user: profile }} className='hover1'>
          Following
        </Link>
      </div>

      {user.id === profile._id && (
        <div className='following'>
          <div className='profile_recommend_count'>{totalRecommends}</div>
          Recommends
        </div>
      )}
    </div>
  );
}
