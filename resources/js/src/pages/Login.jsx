// resources/js/src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import clsx from 'clsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import login from '../../../sass/Login.module.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: '', password: '', general: '' });
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ email: '', password: '', general: '' });
    setLoading(true);

    try {
      const { data } = await axios.post('/api/login', { email, password });
      const { token, role } = data;

      if (!token || !role) {
        throw new Error('Invalid server response. Please contact support.');
      }

      const validRoles = ['admin', 'student', 'professor', 'guest'];
      if (validRoles.includes(role)) {
        authLogin(token, role);
        navigate(`/${role}/dashboard`);
      } else {
        throw new Error('Unauthorized role detected');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 403) {
          const { registration_progress, signup_email } = err.response.data;
          localStorage.setItem('signup_email', signup_email);
          localStorage.setItem('registration_progress', registration_progress);
          const redirectMap = {
            credentials: '/signup/information',
            information: '/signup/verify-email',
          };
          navigate(redirectMap[registration_progress] || '/signup/information');
        } else if (err.response.status === 401) {
          setError({ ...error, general: 'Invalid email or password' });
        } else if (err.response.status === 500) {
          setError({ ...error, general: 'Server error. Please try again later.' });
        } else {
          setError({ ...error, general: 'Something went wrong.' });
        }
      } else {
        setError({ ...error, general: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value.replace(/\s/g, ''));
    setError({ ...error, email: '' }); // Clear email error on change
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.replace(/\s/g, ''));
    setError({ ...error, password: '' }); // Clear password error on change
  };

  const preventSpace = (e) => {
    if (e.key === ' ') {
      e.preventDefault(); // Block spacebar keypress
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className={login.container}>
      <div className={login.content}>
        <h1>Sign In</h1>
        {error.general && <p className={login.error}>{error.general}</p>}
        <form onSubmit={handleSubmit}>
          <div className={login.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onKeyDown={preventSpace}
              onChange={handleEmailChange}
              className={clsx(login.input, { [login.filled]: email })}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className={login.formGroup}>
            <label htmlFor="password">Password</label>
            <div className={login.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                onKeyDown={preventSpace}
                className={clsx(login.input, { [login.filled]: password })}
                required
                placeholder="Enter your password"
              />
              <span
                className={login.toggleIcon}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {error.password && <p className={login.error}>{error.password}</p>}
          </div>
          <div className={login.forgotPasswordWrapper}>
            <a href="/forgot-password" className={login.forgotPasswordLink}>
              Forgot Password?
            </a>
          </div>
          <button type="submit" disabled={loading} className={login.button}>
            {loading ? <span className={login.spinner}></span> : 'Login'}
          </button>
        </form>
        <p>
          Don’t have an account?{' '}
          <a href="/signup" className={login.link}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;