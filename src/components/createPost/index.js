import { Feeling, LiveVideo, Photo } from '../../svg';
import './style.css';
export default function CreatePost({ user, setVisible, profile }) {
  return (
    <div className='createPost'>
      <div className='createPost_header'>
        <img src={user?.picture} alt='' />
        <div
          className='open_post hover2'
          onClick={() => {
            setVisible(true);
          }}
        >
          Tell us more about your trip, {user?.first_name}
        </div>
      </div>
    </div>
  );
}
