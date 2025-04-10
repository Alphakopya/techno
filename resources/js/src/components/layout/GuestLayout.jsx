import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/GuestNavBar';

const GuestLayout = () => {
  const guestLinks = [
    { url: '/', label: 'Home' },
  ];

  return (
    <div className="guest-layout">
      <Navbar links={guestLinks} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default GuestLayout;