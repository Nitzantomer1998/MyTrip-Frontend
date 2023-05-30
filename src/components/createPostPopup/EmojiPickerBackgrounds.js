import { useEffect, useRef, useState } from 'react';
import Picker from 'emoji-picker-react';
import { useMediaQuery } from 'react-responsive';
export default function EmojiPickerBackgrounds({
  text,
  location, // ajout de la propriété de localisation
  user,
  setText,
  setLocation, // ajout du setter de localisation
  type2,
  background,
  setBackground,
}) {
  const [picker, setPicker] = useState(false);
  const [showBgs, setShowBgs] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);
  const locationRef = useRef(null); // ajout d'une référence pour le champ de localisation
  const bgRef = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  const postBackgrounds = [
    '../../../images/postbackgrounds/1.jpg',
    '../../../images/postbackgrounds/2.jpg',
    '../../../images/postbackgrounds/3.jpg',
    '../../../images/postbackgrounds/4.jpg',
    '../../../images/postbackgrounds/5.jpg',
    '../../../images/postbackgrounds/6.jpg',
    '../../../images/postbackgrounds/7.jpg',
    '../../../images/postbackgrounds/8.jpg',
    '../../../images/postbackgrounds/9.jpg',
  ];
  const backgroundHanlder = (i) => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    setBackground(postBackgrounds[i]);
    bgRef.current.classList.add('bgHandler');
  };
  const removeBackground = (i) => {
    bgRef.current.style.backgroundImage = '';
    setBackground('');
    bgRef.current.classList.remove('bgHandler');
  };
  const sm = useMediaQuery({
    query: '(max-width:550px)',
  });
  return (
    <div className={type2 ? 'images_input' : ''}>
      <div className='flex_center' ref={bgRef}>
        <textarea
          ref={locationRef}
          maxLength='20'
          value={location}
          placeholder={`Location`}
          className={`post_input ${type2 ? 'input2' : ''} ${
            sm && !background && 'l0'
          }`}
          onChange={(e) => setLocation(e.target.value)}
        ></textarea>
        <textarea
          ref={textRef}
          maxLength='2000'
          value={text}
          placeholder={`What's on your mind, ${user?.username}`}
          className={`post_input ${type2 ? 'input2' : ''} ${
            sm && !background && 'l0'
          }`}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>

      <div className={!type2 ? 'post_emojis_wrap' : ''}>
        {picker && (
          <div
            className={`comment_emoji_picker ${
              type2 ? 'movepicker2' : 'rlmove'
            }`}
          >
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && (
          <img
            src='../../../icons/colorful.png'
            alt=''
            onClick={() => {
              setShowBgs((prev) => !prev);
            }}
          />
        )}
        {!type2 && showBgs && (
          <div className='post_backgrounds'>
            <div
              className='no_bg'
              onClick={() => {
                removeBackground();
              }}
            ></div>
            {postBackgrounds.map((bg, i) => (
              <img
                src={bg}
                key={i}
                alt=''
                onClick={() => {
                  backgroundHanlder(i);
                }}
              />
            ))}
          </div>
        )}

        <i
          className={`emoji_icon_large ${type2 ? 'moveleft' : ''}`}
          onClick={() => {
            setPicker((prev) => !prev);
          }}
        ></i>
      </div>
    </div>
  );
}
