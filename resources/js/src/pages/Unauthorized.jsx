// resources/js/src/pages/Unauthorized.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getDashboardPath } from '../routes';

const Unauthorized = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(getDashboardPath(userRole));
  };

  return (
    <div className="unauthorized-container">
      <h1>403 - Unauthorized</h1>
      <p>You don’t have permission to access this page.</p>
      <button onClick={handleRedirect}>Go to Dashboard</button>
    </div>
  );
};

export default Unauthorized;