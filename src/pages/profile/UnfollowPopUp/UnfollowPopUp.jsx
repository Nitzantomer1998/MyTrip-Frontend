import "./UnfollowPopUpStyle.css"
import {unfollow} from '../../../functions/user';
import { useSelector } from "react-redux";
export default function UnfollowPopUp(props) {
  const { user } = useSelector((state) => ({ ...state }));

  const unfollowFriend = async () => {
    await unfollow(props.user._id,user.token);
        props.closeModal();
        window.location.href=`/following`

  };

  return (
    
    <div className="unfollowModalBackground">
        <div className="unfollowModalContainer">
        <button id="closeBtnUnfollowPopUp" onClick={() => props.closeModal()}>X</button>
            <div className="unfollow-container">
            <img src={props.user.picture} alt="NO IMAGE" id="unfollowImg" className="unfollow-title"></img>

            <p className="unfollow-message">Unfollow {props.user.username} ?</p>
            <div className="unfollow-buttons">
              <button className="unfollow-cancel" onClick={() => props.closeModal()}>Cancel</button>
              <button className="unfollow-confirm"  onClick={() => unfollowFriend()}>Unfollow</button>

              
              
              
            </div>
          </div>
        </div>
    </div>

  )
}
