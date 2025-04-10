// resources/js/src/pages/SignUpCompleted.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/common/ProgressBar';
import signup from '../../../sass/SignUp.module.scss';

const SignUpCompleted = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000); // 3 seconds
    localStorage.removeItem('signup_email'); // Clear the email from local storage
    localStorage.removeItem('registration_progress'); // Clear the registration progress from local storage
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className={signup.container}>
      <div className={signup.content}>
        <h1>Sign Up Complete!</h1>
        <div className={signup.successMessage}>
          <p>Congratulations! Your account has been successfully created.</p>
          <p>You’ll be redirected to the login page in a few seconds, or click below to go there now.</p>
        </div>
        <button onClick={handleLoginClick} className={signup.successButton}>
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default SignUpCompleted;