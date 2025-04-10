// resources/js/src/routes.js
import React from 'react';
import GuestLayout from './components/layout/GuestLayout';
import AdminLayout from './components/layout/AdminLayout';
import StudentLayout from './components/layout/StudentLayout';
import ProfessorLayout from './components/layout/ProfessorLayout';
import SignUpLayout from './components/layout/SignUpLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import UserList from './pages/admin/UserList';
import CreateUser from './pages/admin/CreateUser';
import UpdateUser from './pages/admin/UpdateUser';
import ChallengeList from './pages/admin/ChallengeList';
import ViewChallenge from './pages/admin/ViewChallenge';
import CreateChallenge from './pages/admin/CreateChallenge';
import UpdateChallenge from './pages/admin/UpdateChallenge';
import SignUpCredentials from './pages/SignUpCredentials';
import SignUpInformation from './pages/SignUpInformation';
import SignUpVerifyEmail from './pages/SignUpVerifyEmail';
import SignUpCompleted from './pages/SignUpCompleted';
import Unauthorized from './pages/Unauthorized';
import StudentPlay from './pages/student/StudentPlay';
import StudentChallengeList from './pages/student/StudentChallengeList';
import StudentChallengeDetail from './pages/student/StudentChallengeDetail';
import NotFound from './pages/NotFound';

// Factory function to create routes with defaults
const createRoutes = (defaults, routeConfigs) =>
  routeConfigs.map((route) => ({ ...defaults, ...route }));

// Guest Routes (shared properties: public, guest-only, GuestLayout)
const guestRoutes = createRoutes(
  {
    layout: GuestLayout,
    public: true,
    restrictedTo: ['guest'],
  },
  [
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
  ]
);

const signUpRoutes = createRoutes(
  {
    layout: SignUpLayout,
    public: true,
    restrictedTo: ['guest'],
  },
  [
    { path: '/signup', element: <SignUpCredentials /> },
    { path: '/signup/information', element: <SignUpInformation /> },
    { path: '/signup/verify-email', element: <SignUpVerifyEmail /> },
    { path: '/signup/completed', element: <SignUpCompleted /> }
  ]
);

// Admin Routes
const adminRoutes = createRoutes(
  {
    layout: AdminLayout,
    roles: ['admin'],
  },
  [
    { path: '/admin/dashboard', element: <AdminDashboard />, dashboardFor: 'admin' },
    { path: '/admin/users', element: <UserList />, dashboardFor: 'admin' },
    { path: '/admin/users/create', element: <CreateUser />, dashboardFor: 'admin' },
    { path: '/admin/users/:id/edit', element: <UpdateUser />, dashboardFor: 'admin' },
    { path: '/admin/challenges', element: <ChallengeList />, dashboardFor: 'admin' },
    { path: '/admin/challenges/:id', element: <ViewChallenge />, dashboardFor: 'admin' },
    { path: '/admin/challenges/create', element: <CreateChallenge />, dashboardFor: 'admin' },
    { path: '/admin/challenges/:id/edit', element: <UpdateChallenge />, dashboardFor: 'admin' },
    
  ]
);

// Student Routes
const studentRoutes = createRoutes(
  {
    layout: StudentLayout,
    roles: ['student'],
  },
  [
    { path: '/student/dashboard', element: <div></div>, dashboardFor: 'student' }, // Replace with actual component
    { path: '/student/challenges', element: <StudentChallengeList />, dashboardFor: 'student' },
    { path: '/student/challenges/:id', element: <StudentChallengeDetail />, dashboardFor: 'student' },
    { path: '/student/matchmaking', element: <StudentPlay />, dashboardFor: 'student' },
  ]
);

// Professor Routes
const professorRoutes = createRoutes(
  {
    layout: ProfessorLayout,
    roles: ['professor'],
  },
  [
    { path: '/professor/dashboard', element: <div>Professor Dashboard</div>, dashboardFor: 'professor' }, // Replace with actual component
  ]
);

// Miscellaneous Routes (public but not guest-restricted)
const miscRoutes = createRoutes(
  {
    layout: GuestLayout,
    public: true,
  },
  [
    { path: '/unauthorized', element: <Unauthorized /> },
    { path: '*', element: <NotFound /> },
  ]
);

// Combine all routes into a single array
export const routes = [
  ...guestRoutes,
  ...signUpRoutes,
  ...adminRoutes,
  ...studentRoutes,
  ...professorRoutes,
  ...miscRoutes,
];

// Utility to get dashboard path for a role
export const getDashboardPath = (role) => {
  const route = routes.find((r) => r.dashboardFor === role);
  return route ? route.path : '/login';
};