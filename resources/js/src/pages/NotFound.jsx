// resources/js/src/pages/NotFound.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getDashboardPath } from '../routes';
import styles from './notfound.module.scss';

const NotFound = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(getDashboardPath(userRole));
  };

  return (
    <div className={styles.notFoundContainer}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <button onClick={handleRedirect}>Go to Dashboard</button>
    </div>
  );
};

export default NotFound;