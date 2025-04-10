import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { getDashboardPath } from './routes';

const RouteGuard = ({ route }) => {
  const { token, userRole, loading } = useAuth();
  const { public: isPublic, restrictedTo, roles, layout: Layout } = route;
  const location = useLocation(); // Use location hook to get current path

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  const isAuthenticated = !!token;
  const currentPath = location.pathname; // Using location.pathname
  const dashboardPath = getDashboardPath(userRole);
  const signupEmail = localStorage.getItem('signup_email');
  const registrationProgress = localStorage.getItem('registration_progress') || '';
  const signupProgressMap = {
    '/signup': '',
    '/signup/information': 'credentials',
    '/signup/verify-email': 'information',
    '/signup/completed': 'completed',
  };

  const progressRedirectMap = {
    'credentials': '/signup/information',
    'information': '/signup/verify-email',
    'completed': '/signup/completed',
  };

  if (Object.keys(signupProgressMap).includes(currentPath)) {
    if (currentPath === '/signup' && registrationProgress) {
      const redirectPath = progressRedirectMap[registrationProgress] || '/signup';
      return <Navigate to={redirectPath} replace />;
    }

    if (currentPath !== '/signup' && !signupEmail) {
      return <Navigate to="/signup" replace />;
    }

    const progressOrder = ['credentials', 'information', 'completed'];
    const requiredProgress = signupProgressMap[currentPath];
    const currentProgressIndex = progressOrder.indexOf(registrationProgress);
    const requiredProgressIndex = progressOrder.indexOf(requiredProgress);

    if (requiredProgress && (currentProgressIndex < requiredProgressIndex || currentProgressIndex > requiredProgressIndex)) {
      return <Navigate to="/login" replace />;
    }
  }

  if (isPublic) {
    if (restrictedTo && restrictedTo.includes('guest') && isAuthenticated) {
      return <Navigate to={dashboardPath} replace />;
    }
    return <Layout><Outlet /></Layout>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Layout><Outlet /></Layout>;
};

export default RouteGuard;
