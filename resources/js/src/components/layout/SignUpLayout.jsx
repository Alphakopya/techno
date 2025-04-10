import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/GuestNavBar';
import ProgressBar from '../common/ProgressBar';
const SignUpLayout = () => {
  const guestLinks = [
    { url: '/', label: 'Home' },
  ];

  return (
    <div className="signup-layout">
      <Navbar links={guestLinks} />
      <main>
        <ProgressBar />
        <Outlet />
      </main>
    </div>
  );
};

export default SignUpLayout;