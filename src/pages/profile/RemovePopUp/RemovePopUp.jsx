import { useSelector } from "react-redux";
import { unfollow, unfollowReverse } from "../../../functions/user"
import "./RemovePopUpStyle.css"


export default function RemovePopUp(props) {
  const { user } = useSelector((state) => ({ ...state }));

  const removeFriend = async () => {
    //await unfollow(props.user._id, user.token);
    await unfollowReverse(props.user._id, user.token);
    props.closeModal();
    window.location.href=`/followers`
    
    
  };

  return (
    <div className="unfollowModalBackground">
        <div className="unfollowModalContainer">
        <button id="closeBtnRemovePopUp" onClick={() => props.closeModal()}>X</button>
            <div className="remove-container">
            <img src={props.user.picture} alt="NO IMAGE" id="removeImg" className="unfollow-title"></img>
            <p className="unfollow-message">Remove {props.user.username} ?</p>
            <div className="unfollow-buttons">
              <button className="unfollow-cancel" onClick={() => props.closeModal()}>Cancel</button>

              <button className="remove-confirm" onClick={() => removeFriend()}>Remove</button>
            </div>
          </div>
        </div>
    </div>

  )
}
