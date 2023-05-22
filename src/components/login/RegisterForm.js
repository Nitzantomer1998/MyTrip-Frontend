import { Form, Formik } from 'formik';
import { useState } from 'react';
import RegisterInput from '../inputs/registerInput';
import * as Yup from 'yup';
import GenderSelect from './GenderSelect';
import DotLoader from 'react-spinners/DotLoader';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
export default function RegisterForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfos = {
    username: '',
    email: '',
    password: '',
    gender: '',
  };
  const [user, setUser] = useState(userInfos);
  const { username, email, password, gender } = user;
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const registerValidation = Yup.object({
    username: Yup.string()
      .required("What's your username ?")
      .min(2, 'username must be between 2 and 16 characters.')
      .max(16, 'username must be between 2 and 16 characters.')
      .matches(/^[A-Za-z0-9 ]+$/, 'Special characters are not allowed.'),
    email: Yup.string()
      .required("You'll need this when you log in (enter a valid email).")
      .email('Enter a valid email address.'),
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &).'
      )
      .min(6, 'Password must be atleast 6 characters.')
      .max(36, "Password can't be more than 36 characters"),
  });
  const [genderError, setGenderError] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const registerSubmit = async () => {
    console.log('registerSubmit');
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/registerUser`,
        {
          username,
          email,
          password,
          gender,
        }
      );
      setError('');
      setSuccess(data.message);
      const { message, ...rest } = data;

      setTimeout(() => {
        dispatch({ type: 'LOGIN', payload: rest });
        Cookies.set('user', JSON.stringify(rest));
        navigate('/');
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess('');
      setError(error.response.data.message);
    }
  };
  return (
    <div className='blur'>
      <div className='register'>
        <div className='register_header'>
          <i className='exit_icon' onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span></span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            username,
            email,
            password,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            if (gender === '') {
              setGenderError(
                'Please choose a gender. You can change who can see this later.'
              );
            } else {
              setGenderError('');
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className='register_form'>
              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  placeholder='Username'
                  name='username'
                  onChange={handleRegisterChange}
                />
              </div>

              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  placeholder='Email Address'
                  name='email'
                  onChange={handleRegisterChange}
                />
              </div>

              <div className='reg_line'>
                <RegisterInput
                  type='password'
                  placeholder='Password'
                  name='password'
                  onChange={handleRegisterChange}
                />
              </div>

              <div className='reg_col'></div>
              <div className='reg_col'>
                <div className='reg_line_header'>Gender</div>

                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>

              <div className='reg_infos'>
                By clicking Sign Up, you agree to our{' '}
                <span>Terms & conditions &nbsp;</span>
                and <span>Cookie Policy.</span>
              </div>

              <div className='reg_btn_wrapper'>
                <button className='blue_btn open_signup'>Sign Up</button>
              </div>
              <DotLoader color='#1876f2' loading={loading} size={30} />
              {error && <div className='error_text'>{error}</div>}
              {success && <div className='success_text'>{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
