import { Form, Formik } from 'formik';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../../components/inputs/loginInput';
import * as Yup from 'yup';
import axios from 'axios';
import { combineReducers } from 'redux';
import Cookies from 'js-cookie';

export default function ChangePassword({
  password,
  setPassword,
  conf_password,
  setConf_password,
  errorPassword,
  loading,
  setLoading,
  userInfos,
  setErrorPassword,
  user,
}) {
  //console.log(`user : ${JSON.stringify(user)}`);
  const {
    user: { token },
  } = user;
  const dispatch = useDispatch();
  //console.log(`token : ${JSON.stringify(token)}`);
  const navigate = useNavigate();
  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &).'
      )
      .min(8, 'Password must be atleast 8 characters.')
      .max(36, "Password can't be more than 36 characters"),

    conf_password: Yup.string()
      .required('Confirm your password.')
      .oneOf([Yup.ref('password')], 'Passwords must match.'),
  });
  // const { email } = userInfos.email;

  const changePassword = async () => {
    try {
      setLoading(true);
      const temp = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/changeUserPassword`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log('1');
      //console.log('temp ' + JSON.stringify(temp)); //SUCESS PRINT USER

      setErrorPassword('');
      Cookies.remove('user');
      dispatch({
        type: 'LOGOUT',
      });
      navigate('/login');
    } catch (error) {
      setLoading(false);
      //console.log('3');
      setErrorPassword(error.response.data.message);
    }
  };
  return (
    <div className='reset_form' style={{ height: '310px' }}>
      <div className='reset_form_header'>Change Password</div>
      <div className='reset_form_text'>Pick a strong password</div>
      <Formik
        enableReinitialize
        initialValues={{
          password,
          conf_password,
        }}
        validationSchema={validatePassword}
        onSubmit={() => {
          changePassword();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              placeholder='New password'
            />
            <LoginInput
              type='password'
              name='conf_password'
              onChange={(e) => setConf_password(e.target.value)}
              placeholder='Confirm new password'
              bottom
            />
            {errorPassword && <div className='error_text'>{errorPassword}</div>}
            <div className='reset_form_btns'>
              <Link to='/profile' className='gray_btn'>
                Cancel
              </Link>
              <button type='submit' className='blue_btn'>
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
