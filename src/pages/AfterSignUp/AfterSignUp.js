import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AfterSignUp.css';

const AfterRegister = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className='registration-success'>
      <h1>Redirection To MyTrip</h1>
    </div>
  );
};

export default AfterRegister;
