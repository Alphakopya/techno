// resources/js/src/pages/SignUpVerifyEmail.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProgressBar from '../components/common/ProgressBar';
import signup from '../../../sass/SignUp.module.scss';

const SignUpVerifyEmail = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']); // Array for 6 digits
  const [error, setError] = useState({ code: '', general: '' });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputRefs = useRef([]); // Refs for focusing inputs
  const navigate = useNavigate();

  const handleCodeChange = (index, value) => {
    if (/^\d?$/.test(value)) { // Only allow single digits
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setError({ ...error, code: '' });

      // Move to next input if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length > 0) {
      const newCode = pasted.split('').concat(Array(6 - pasted.length).fill(''));
      setCode(newCode);
      inputRefs.current[Math.min(pasted.length - 1, 5)].focus();
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ code: '', general: '' });
    setLoading(true);

    const email = localStorage.getItem('signup_email');
    if (!email) {
      setError({ general: 'Session expired. Please start over.' });
      setLoading(false);
      return;
    }

    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setError({ code: 'Please enter a 6-digit code' });
      setLoading(false);
      return;
    }

    try {
      await axios.post('/api/signup/verify-email', { email, code: fullCode });
      localStorage.setItem('registration_progress', 'completed');
      navigate('/signup/completed');
    } catch (err) {
      if (err.response?.status === 400) {
        setError({ code: 'Invalid or expired code', general: '' });
      } else {
        setError({ general: err.response?.data?.message || 'Something went wrong.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError({ code: '', general: '' });
    setLoading(true);

    const email = localStorage.getItem('signup_email');
    if (!email) {
      setError({ general: 'Session expired. Please start over.' });
      setLoading(false);
      return;
    }

    try {
      await axios.post('/api/signup/resend-verification', { email });
      setShowModal(true);
      setTimeout(() => setShowModal(false), 1000);
    } catch (err) {
      setError({ general: err.response?.data?.message || 'Failed to resend code. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={signup.container}>
      <div className={signup.content}>
        <h1>Verify Your Email</h1>
        <p>Enter the 6-digit code sent to your email.</p>
        {error.general && <p className={signup.error}>{error.general}</p>}
        <form onSubmit={handleSubmit}>
          <div className={signup.formGroup}>
            <div className={signup.codeInputs}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : null} // Paste only on first input
                  ref={(el) => (inputRefs.current[index] = el)}
                  className={`${signup.codeInput} ${digit ? signup.filled : ''}`}
                  required
                />
              ))}
            </div>
            {error.code && <p className={signup.error}>{error.code}</p>}
          </div>
          <button className={signup.button} type="submit" disabled={loading}>
            {loading ? <span className={signup.spinner}></span> : 'Verify'}
          </button>
        </form>
        <p>
          Didn’t receive a code?{' '}
          <a href="#" onClick={handleResend} disabled={loading}>
            Resend
          </a>
        </p>
      </div>
      {showModal && (
        <div className={signup.modal}>
          <p>Verification code resent!</p>
        </div>
      )}
    </div>
  );
};

export default SignUpVerifyEmail;