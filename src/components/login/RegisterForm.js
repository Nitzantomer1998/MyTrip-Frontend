import { Form, Formik } from 'formik';
import { useState } from 'react';
import RegisterInput from '../inputs/registerInput';
import * as Yup from 'yup';
import GenderSelect from './GenderSelect';
import DotLoader from 'react-spinners/DotLoader';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import './style.css';
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
  const [showTerms, setShowTerms] = useState(false);

  const { username, email, password, gender } = user;
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleTermsClick = () => {
    setShowTerms(true);
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
                  className='reg_input_username'
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
                <span onClick={handleTermsClick}>
                  Terms & conditions &nbsp;
                </span>
                {showTerms && (
                  <div className='terms-popup'>
                    <p>
                      <p>Terms & conditions</p>
                      General Conditions of Use of the "MyTrip" Social Network
                      Introduction Welcome to MyTrip. By using our social
                      network, you agree to these terms of use. Please read them
                      carefully. Registration To use MyTrip, you must create an
                      account. You agree to provide accurate and complete
                      information when registering and to update such
                      information as necessary. Privacy Your privacy is
                      important to us. Our Privacy Policy explains how we
                      collect, use and protect your information. Using MyTrip
                      You are responsible for all activity on your MyTrip
                      account. You must not harass, threaten or intimidate other
                      users, or post any content that is unlawful, offensive,
                      hateful, obscene, discriminatory or defamatory. Content
                      You retain all rights to the content you post on MyTrip.
                      However, by posting content, you grant us a non-exclusive,
                      transferable, sublicensable, royalty-free, worldwide
                      license to use, modify, distribute, adapt and display such
                      content on MyTrip. Breach of Terms If you breach these
                      terms, we reserve the right to suspend or terminate your
                      account. Limitation of Liability MyTrip is not responsible
                      for the content posted by users, the actions of users, or
                      any loss or damage that may result therefrom.
                      Modifications We reserve the right to modify these terms
                      of use at any time. The modifications will come into force
                      as soon as they are published on MyTrip. Applicable Law
                      These terms of use are governed by French law and any
                      dispute will be settled by the French courts.
                      <p>Cookie Policy</p>
                      <p>
                        What is a cookie ? A cookie is a small text file stored
                        on your computer, tablet or smartphone when you visit a
                        website. Use of Cookies by MyTrip We use cookies to
                        improve user experience, remember your preferences,
                        provide social media functionality and gather statistics
                        about the use of our site. Types of Cookies Used
                        Functionality Cookies: These cookies allow us to
                        remember the choices you have made on our site.
                        Performance Cookies: These cookies collect information
                        about the use of our site, such as the most visited
                        pages and error messages received. Advertising Cookies:
                        These cookies collect information about your browsing
                        habits in order to provide you with advertisements that
                        are of interest to you. Cookie management You have the
                        choice to accept or refuse cookies. You can modify your
                        browser settings to refuse cookies or to be notified
                        when a cookie is installed. Amendments We reserve the
                        right to modify this cookie policy at any time. The
                        modifications will come into force as soon as they are
                        published on MyTrip.
                      </p>
                    </p>
                    <button
                      className='close_popup'
                      onClick={() => setShowTerms(false)}
                    >
                      X
                    </button>
                  </div>
                )}
                and <span onClick={handleTermsClick}>Cookie Policy.</span>
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
