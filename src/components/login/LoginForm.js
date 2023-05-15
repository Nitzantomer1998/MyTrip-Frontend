import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LoginInput from '../../components/inputs/loginInput';
import { useState } from 'react';
import DotLoader from 'react-spinners/DotLoader';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import logoPath from '../../images/MyTrip_logo.png';
const loginInfos = {
  email: '',
  password: '',
};
export default function LoginForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required('Email address is required.')
      .email('Must be a valid email.')
      .max(100),
    password: Yup.string().required('Password is required'),
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/userLogin`,
        {
          email,
          password,
        }
      );
      dispatch({ type: 'LOGIN', payload: data });
      Cookies.set('user', JSON.stringify(data));
      navigate('/home');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className='login_wrap'>
      <div className='login_1'>
        <img src={logoPath} alt='MyTrip Logo' />
        <span className='social_media'>Social media for the traveller</span>
        <span className='welcome'>
          Welcome Back, please login to your account
        </span>
      </div>
      <div className='login_2'>
        <div className='login_2_wrap'>
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type='text'
                  name='email'
                  placeholder='Email Address'
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={handleLoginChange}
                  bottom
                />
                <button type='submit' className='blue_btn'>
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <DotLoader color='#1876f2' loading={loading} size={30} />

          {error && <div className='error_text'>{error}</div>}
          <div className='sign_splitter'></div>
          <button
            className='blue_btn open_signup'
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
