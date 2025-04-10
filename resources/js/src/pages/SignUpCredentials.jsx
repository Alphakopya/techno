// resources/js/src/pages/SignUpCredentials.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProgressBar from '../components/common/ProgressBar';
import signup from '../../../sass/SignUp.module.scss';
import { FaEye, FaEyeSlash, FaInfoCircle, FaCheck, FaTimes} from 'react-icons/fa';

const SignUpCredentials = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '', confirmPassword: '', general: '' });
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [criteria, setCriteria] = useState({
    lengthCheck: false,
    upperCheck: false,
    lowerCheck: false,
    numberCheck: false,
    specialCheck: false,
  });

  const navigate = useNavigate();

  const strengthLevels = [
    { label: 'Weak', color: '#FF4D4D', score: 1 },
    { label: 'Fair', color: '#FFA500', score: 2 },
    { label: 'Good', color: '#FFD700', score: 3 },
    { label: 'Strong', color: '#4CAF50', score: 4 },
  ];

  const checkPasswordStrength = (password) => {
    const lengthCheck = password.length >= 8;
    const upperCheck = /[A-Z]/.test(password);
    const lowerCheck = /[a-z]/.test(password);
    const numberCheck = /\d/.test(password);
    const specialCheck = /[!@#$%^&*()_,.?":{}|<>]/.test(password);

    const score = [lengthCheck, upperCheck, lowerCheck, numberCheck, specialCheck].filter(Boolean).length;
    setCriteria({ lengthCheck, upperCheck, lowerCheck, numberCheck, specialCheck });
    const strength = strengthLevels[Math.min(score - 1, 3)] || { label: 'Weak', color: '#FF4D4D', score: 0 };
    setPasswordStrength(strength);

    return { lengthCheck, upperCheck, lowerCheck, numberCheck, specialCheck };
  };

  const handleEmailChange = (e) => setEmail(e.target.value.replace(/\s/g, ''));
  const handlePasswordChange = (e) => {
    const noSpaces = e.target.value.replace(/\s/g, '');
    setPassword(noSpaces);
    checkPasswordStrength(noSpaces);
  };
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value.replace(/\s/g, ''));

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ email: '', password: '', confirmPassword: '', general: '' });
    setLoading(true);

    const { lengthCheck, upperCheck, lowerCheck, numberCheck, specialCheck } = checkPasswordStrength(password);
    if (!(lengthCheck && upperCheck && lowerCheck && numberCheck && specialCheck)) {
      setError({ ...error, password: 'Password must meet all criteria (see tooltip)' });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError({ ...error, confirmPassword: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    try {
      await axios.post('/api/signup/credentials', { email, password });
      localStorage.setItem('signup_email', email);
      navigate('/signup/information');
    } catch (err) {
      if (err.response) {
        if (err.response.status === 422) {
          const validationErrors = err.response.data.errors;
          setError({
            ...error,
            email: validationErrors.email ? validationErrors.email[0] : '',
            password: validationErrors.password ? validationErrors.password[0] : '',
          });
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

  return (
    <div className={signup.container}>
      <div className={signup.content}>
        <h1>Sign Up - Credentials</h1>
        {error.general && <p className={signup.error}>{error.general}</p>}
        <form onSubmit={handleSubmit}>
          <div className={signup.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={email ? signup.filled : ''}
              required
              placeholder="Enter your email"
            />
            {error.email && <p className={signup.error}>{error.email}</p>}
          </div>

          <div className={`${signup.formGroup} ${signup.passwordContainer}`}>
            <label htmlFor="password">Password</label>
            <div className={`${signup.inputWrapper} ${password ? signup.filled : ''}`}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
                placeholder="Enter your password"
              />
              <div className={signup.icons}>
                <span className={signup.togglePassword} onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <span className={signup.infoIcon} data-tooltip="Password must contain:">
                    <FaInfoCircle />
                  <div className={signup.tooltipContent}>
                  <ul>
                      <li>
                        {criteria.lengthCheck ? <FaCheck className={signup.checkIcon} /> : <FaTimes className={signup.timesIcon} />}
                        At least 8 characters
                      </li>
                      <li>
                        {criteria.upperCheck ? <FaCheck className={signup.checkIcon} /> : <FaTimes className={signup.timesIcon} />}
                        1 uppercase letter
                      </li>
                      <li>
                        {criteria.lowerCheck ? <FaCheck className={signup.checkIcon} /> : <FaTimes className={signup.timesIcon} />}
                        1 lowercase letter
                      </li>
                      <li>
                        {criteria.numberCheck ? <FaCheck className={signup.checkIcon} /> : <FaTimes className={signup.timesIcon} />}
                        1 number
                      </li>
                      <li>
                        {criteria.specialCheck ? <FaCheck className={signup.checkIcon} /> : <FaTimes className={signup.timesIcon} />}
                        1 special character
                      </li>
                    </ul>
                  </div>
                </span>
              </div>
            </div>
            <div className={signup.passwordStrength}>
                <div
                className={signup.progressBar}
                style={{
                    width: `${(passwordStrength.score / 4) * 100}%`,
                    backgroundColor: passwordStrength.color,
                }}
                />
                <p className={signup.strengthLabel}>{passwordStrength.label}</p>
            </div>
            {error.password && <p className={signup.error}>{error.password}</p>}
          </div>


          <div className={`${signup.formGroup} ${signup.passwordContainer}`}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={`${signup.inputWrapper} ${confirmPassword ? signup.filled : ''}`}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                placeholder="Confirm your password"
              />
              <div className={signup.icons}>
                <span className={signup.togglePassword} onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            {error.confirmPassword && <p className={signup.error}>{error.confirmPassword}</p>}
          </div>

          <button className={signup.button} type="submit" disabled={loading}>
            {loading ? <span className={signup.spinner}></span> : 'Next'}
          </button>
        </form>
        <p>
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpCredentials;