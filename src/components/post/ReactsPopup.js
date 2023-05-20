const reactsArray = [
  {
    name: 'like',
    image: '../../../reacts/like.gif',
  },
  {
    name: 'recommend',
    image: '../../../reacts/love.gif',
  },
];

export default function ReactsPopup({
  visible,
  setVisible,
  reactHandler,
  user,
}) {
  return (
    <>
      {visible && (
        <div
          className='reacts_popup'
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
        >
          {reactsArray.map((react, i) => (
            <div
              className='react'
              key={i}
              onClick={() => reactHandler(react.name)}
            >
              <img src={react.image} alt='' />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
