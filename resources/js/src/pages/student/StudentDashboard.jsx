import React from 'react';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { userRole, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {userRole.toUpperCase()}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default StudentDashboard;
