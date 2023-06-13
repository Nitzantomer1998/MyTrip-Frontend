import { Form, Formik } from 'formik';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../../components/inputs/loginInput';
import * as Yup from 'yup';
import axios from 'axios';
import { combineReducers } from 'redux';
import Cookies from 'js-cookie';

export default function ChangeUsername({
  username,
  setUsername,
  conf_username,
  setConf_username,
  errorUsername,
  loading,
  setLoading,
  userInfos,
  setErrorUsername,
  user,
  handleEditUsername,
}) {
  //console.log(`user : ${JSON.stringify(user)}`);
  const {
    user: { token },
  } = user;
  const dispatch = useDispatch();
  //console.log(`token : ${JSON.stringify(token)}`);
  const navigate = useNavigate();
  const validateUsername = Yup.object({
    username: Yup.string()
      .required(
        'Enter a combination of at least 6 charcters from the alphabet, numbers and spaces.'
      )
      .min(6, 'username must be between 6 and 16 characters.')
      .max(16, 'username must be between 6 and 16 characters.')
      .matches(/^[A-Za-z0-9 ]+$/, 'Special characters are not allowed.'),

    conf_username: Yup.string()
      .required('Confirm your username.')
      .oneOf([Yup.ref('username')], 'Username must match.'),
  });
  // const { email } = userInfos.email;

  const changeUsername = async () => {
    try {
      setLoading(true);
      const temp = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/changeUsername`,
        { username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log('1');
      //console.log('temp ' + JSON.stringify(temp)); //SUCESS PRINT USER

      setErrorUsername('');
      Cookies.remove('user');
      dispatch({
        type: 'LOGOUT',
      });
      navigate('/login');
    } catch (error) {
      setLoading(false);
      //console.log('3');
      setErrorUsername(error.response.data.message);
    }
  };
  return (
    <div className='reset_form' style={{ height: '310px' }}>
      <div className='reset_form_header'>Change Username</div>
      <div className='reset_form_text'>Pick a username</div>
      <Formik
        enableReinitialize
        initialValues={{
          username,
          conf_username,
        }}
        validationSchema={validateUsername}
        onSubmit={() => {
          changeUsername();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type='text'
              name='username'
              onChange={(e) => setUsername(e.target.value)}
              placeholder='New username'
            />
            <LoginInput
              type='text'
              name='conf_username'
              onChange={(e) => setConf_username(e.target.value)}
              placeholder='Confirm new username'
              bottom
            />
            {errorUsername && <div className='error_text'>{errorUsername}</div>}
            <div className='reset_form_btns'>
              <button className='gray_btn' onClick={handleEditUsername}>
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
