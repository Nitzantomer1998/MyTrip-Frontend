import { useEffect, useState } from 'react';
import Bio from './Bio';
import './style.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
export default function Intro({ detailss, visitor, setOthername }) {
  const { user } = useSelector((state) => ({ ...state.user }));
  const [details, setDetails] = useState();
  useEffect(() => {
    setDetails(detailss);
    setInfos(detailss);
  }, [detailss]);
  const initial = {
    bio: details?.bio ? details.bio : '',
    otherName: details?.otherName ? details.otherName : '',
    job: details?.job ? details.job : '',
    workplace: details?.workplace ? details.workplace : '',
    highSchool: details?.highSchool ? details.highSchool : '',
    college: details?.college ? details.college : '',
    currentCity: details?.currentCity ? details.currentCity : '',
    hometown: details?.hometown ? details.hometown : '',
    relationship: details?.relationship ? details.relationship : '',
    instagram: details?.instagram ? details.instagram : '',
  };
  const [infos, setInfos] = useState(initial);
  const [showBio, setShowBio] = useState(false);
  const [max, setMax] = useState(infos?.bio ? 255 - infos?.bio.length : 255);

  const updateDetails = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/updateDetails`,
        {
          infos,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setShowBio(false);
      setDetails(data);
      setOthername(data.otherName);
    } catch (error) {}
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfos({ ...infos, [name]: value });
    setMax(255 - e.target.value.length);
  };
  return (
    <div className='profile_card'>
      <div className='profile_card_header'>Intro</div>
      {details?.bio && !showBio && (
        <div className='info_col'>
          <span className='info_text'>{details?.bio}</span>
          {!visitor && (
            <button
              className='gray_btn hover1'
              onClick={() => setShowBio(true)}
            >
              Edit Bio
            </button>
          )}
        </div>
      )}
      {!details?.bio && !showBio && !visitor && (
        <button
          className='gray_btn hover1 w100'
          onClick={() => setShowBio(true)}
        >
          Add Bio
        </button>
      )}
      {showBio && (
        <Bio
          infos={infos}
          max={max}
          handleChange={handleChange}
          setShowBio={setShowBio}
          updateDetails={updateDetails}
          placeholder='Tell us about yourself...'
          name='bio'
        />
      )}
    </div>
  );
}

// import { useEffect, useState } from 'react';
// import Bio from './Bio';
// import './style.css';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// export default function Intro({ bio, visitor }) {
//   const { user } = useSelector((state) => ({ ...state }));
//   const [details, setDetails] = useState();
//   useEffect(() => {
//     setDetails(bio);
//     setBio(bio);
//   }, [bio]);

//   const initial = {
//     bio: details || '',
//   };

//   const [bioInfo, setBioInfo] = useState(initial);
//   const [showBio, setShowBio] = useState(false);
//   const [max, setMax] = useState(
//     bioInfo?.bio ? 100 - bioInfo?.bio.length : 100
//   );

//   const updateBio = async () => {
//     try {
//       console.log('sent');
//       const { data } = await axios.put(
//         `${process.env.REACT_APP_BACKEND_URL}/updateBio`,
//         {
//           bio: bioInfo.bio,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       setShowBio(false);
//       setDetails(data);
//     } catch (error) {
//       console.log(error.response.data.message);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBioInfo({ ...bioInfo, [name]: value });
//     setMax(100 - e.target.value.length);
//   };

//   return (
//     <div className='profile_card'>
//       <div className='profile_card_header'>Intro</div>
//       {details && !showBio && (
//         <div className='info_col'>
//           <span className='info_text'>{details}</span>
//           {!visitor && (
//             <button
//               className='gray_btn hover1'
//               onClick={() => setShowBio(true)}
//             >
//               Edit Bio
//             </button>
//           )}
//         </div>
//       )}
//       {!details && !showBio && !visitor && (
//         <button
//           className='gray_btn hover1 w100'
//           onClick={() => setShowBio(true)}
//         >
//           Add Bio
//         </button>
//       )}
//       {showBio && (
//         <Bio
//           bioInfo={bioInfo}
//           max={max}
//           handleChange={handleChange}
//           setShowBio={setShowBio}
//           updateBio={updateBio}
//           placeholder='Add Bio'
//           name='bio'
//         />
//       )}
//     </div>
//   );
// }
