import { useRef } from 'react';
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds';

export default function ImagePreview({
  text,
  user,
  location,
  setText,
  images,
  setImages,
  setShowPrev,
  setError,
  setLocation,
}) {
  const imageInputRef = useRef(null);

  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      if (
        img.type !== 'image/jpeg' &&
        img.type !== 'image/png' &&
        img.type !== 'image/webp' &&
        img.type !== 'image/gif'
      ) {
        setError(
          `${img.name} format is unsupported! Only Jpeg, Png, Webp, and Gif formats are allowed.`
        );
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`${img.name} size is too large. Maximum 5MB allowed.`);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (readerEvent) => {
          setImages((images) => [...images, readerEvent.target.result]);
        };
      }
    });
  };

  return (
    <div className='overflow_a scrollbar'>
      <EmojiPickerBackgrounds
        text={text}
        user={user}
        setText={setText}
        type2
        location={location}
        setLocation={setLocation}
      />
      <div className='add_pics_wrap'>
        <input
          type='file'
          accept='image/jpeg,image/png,image/webp,image/gif'
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImages}
        />
        {images && images.length ? (
          <div className='add_pics_inside1 p0'>
            <div className='preview_actions'>
              <button
                className='hover1'
                onClick={() => {
                  if (images.length < 10) imageInputRef.current.click();
                  else setError('Error: can add up to 10 pictures');
                }}
              >
                <i className='addPhoto_icon'></i>
                Add Photos/Videos
              </button>
            </div>
            <div
              className='small_white_circle'
              onClick={() => {
                setImages([]);
              }}
            >
              <i className='exit_icon'></i>
            </div>
            <div
              className={
                images.length === 1
                  ? 'preview1'
                  : images.length === 2
                  ? 'preview2'
                  : images.length === 3
                  ? 'preview3'
                  : images.length === 4
                  ? 'preview4 '
                  : images.length === 5
                  ? 'preview5'
                  : images.length % 2 === 0
                  ? 'preview6'
                  : 'preview6 singular_grid'
              }
            >
              {images.map((img, i) => (
                <img src={img} key={i} alt='' />
              ))}
            </div>
          </div>
        ) : (
          <div className='add_pics_inside1'>
            <div
              className='small_white_circle'
              onClick={() => {
                setShowPrev(false);
              }}
            >
              <i className='exit_icon'></i>
            </div>
            <div
              className='add_col'
              onClick={() => {
                imageInputRef.current.click();
              }}
            >
              <div className='add_circle'>
                <i className='addPhoto_icon'></i>
              </div>
              <span>Add Photos/Videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
