import { Form, Formik } from 'formik';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../../components/inputs/loginInput';
import * as Yup from 'yup';
import axios from 'axios';
import { combineReducers } from 'redux';
import Cookies from 'js-cookie';

export default function ChangeBio({
  bio,
  setBio,
  conf_bio,
  setConf_bio,
  errorBio,
  loading,
  setLoading,
  userInfos,
  setErrorBio,
  user,
  handleEditBio,
}) {
  //console.log(`user : ${JSON.stringify(user)}`);
  const {
    user: { token },
  } = user;
  const dispatch = useDispatch();
  //console.log(`token : ${JSON.stringify(token)}`);
  const navigate = useNavigate();
  const validateBio = Yup.object({
    bio: Yup.string().max(255, "Bio can't be more than 255 characters"),
  });
  // const { email } = userInfos.email;

  const changeBio = async () => {
    try {
      setLoading(true);
      let infos = { bio: bio };
      const temp = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/updateDetails`,
        { infos },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log('1');
      //console.log('temp ' + JSON.stringify(temp)); //SUCESS PRINT USER

      setErrorBio('');
      //   Cookies.remove('user');
      //   dispatch({
      //     type: 'LOGOUT',
      //   });
      //   navigate('/login');
      navigate('/profile');
    } catch (error) {
      setLoading(false);
      //console.log('3');
      setErrorBio(error.response.data.message);
    }
  };
  return (
    <div className='reset_form' style={{ height: '310px' }}>
      <div className='reset_form_header'>Change Bio</div>
      <div className='reset_form_text'>Pick a Bio</div>
      <Formik
        enableReinitialize
        initialValues={{
          bio,
        }}
        validationSchema={validateBio}
        onSubmit={() => {
          changeBio();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type='textarea'
              name='bio'
              onChange={(e) => setBio(e.target.value)}
              placeholder='New bio'
            />

            {errorBio && <div className='error_text'>{errorBio}</div>}
            <div className='reset_form_btns'>
              <button className='gray_btn' onClick={handleEditBio}>
                Cancel
              </button>
              <button type='submit' className='blue_btn'>
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
