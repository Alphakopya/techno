// resources/js/src/pages/SignUpInformation.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProgressBar from '../components/common/ProgressBar';
import signup from '../../../sass/SignUp.module.scss';

const SignUpInformation = () => {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    university: '',
  });
  const [error, setError] = useState({ firstname: '', lastname: '', role: '', general: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setError({ ...error, role: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ firstname: '', lastname: '', role: '', general: '' });
    setLoading(true);

    const email = localStorage.getItem('signup_email');
    if (!email) {
      setError({ general: 'Session expired. Please start over.' });
      setLoading(false);
      return;
    }

    if (!role) {
      setError({ ...error, role: 'Please select a role' });
      setLoading(false);
      return;
    }

    if (!formData.firstname || !formData.lastname) {
      setError({
        ...error,
        firstname: !formData.firstname ? 'First name is required' : '',
        lastname: !formData.lastname ? 'Last name is required' : '',
      });
      setLoading(false);
      return;
    }

    try {
      await axios.post('/api/signup/information', {
        email,
        role,
        firstname: formData.firstname,
        lastname: formData.lastname,
        university: formData.university,
      });
      navigate('/signup/verify-email');
    } catch (err) {
      if (err.response?.status === 422) {
        const validationErrors = err.response.data.errors;
        setError({
          ...error,
          firstname: validationErrors.firstname ? validationErrors.firstname[0] : '',
          lastname: validationErrors.lastname ? validationErrors.lastname[0] : '',
          general: validationErrors.email || validationErrors.role ? 'Invalid data' : '',
        });
      } else {
        setError({ general: err.response?.data?.message || 'Something went wrong.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={signup.container}>
      <div className={signup.content}>
        <h1>Sign Up - Information</h1>
        {error.general && <p className={signup.error}>{error.general}</p>}
        <form onSubmit={handleSubmit}>
          <div className={signup.formGroup}>
            <label htmlFor="role">I am a:</label>
            <select
              id="role"
              value={role}
              onChange={handleRoleChange}
              className={role ? signup.filled : ''}
              required
            >
              <option value="" disabled selected>Select Role</option>
              <option value="student">Student</option>
              <option value="professor">Professor</option>
            </select>
            {error.role && <p className={signup.error}>{error.role}</p>}
          </div>

          <div className={signup.formGroup}>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              className={formData.firstname ? signup.filled : ''}
              required
              placeholder="Enter your first name"
            />
            {error.firstname && <p className={signup.error}>{error.firstname}</p>}
          </div>

          <div className={signup.formGroup}>
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className={formData.lastname ? signup.filled : ''}
              required
              placeholder="Enter your last name"
            />
            {error.lastname && <p className={signup.error}>{error.lastname}</p>}
          </div>

          <div className={signup.formGroup}>
            <label htmlFor="university">University (Optional)</label>
            <input
              type="text"
              id="university"
              name="university"
              value={formData.university}
              onChange={handleInputChange}
              className={formData.university ? signup.filled : ''}
              placeholder="Enter your university"
            />
          </div>

          <button className={signup.button} type="submit" disabled={loading}>
            {loading ? <span className={signup.spinner}></span> : 'Next'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpInformation;