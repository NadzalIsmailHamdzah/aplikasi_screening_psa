import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ showNav = true }) => {
  return (
    <div className="min-h-screen w-full bg-white">
      {showNav && <Navbar />}
      <main className={showNav ? 'pt-16' : ''}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;