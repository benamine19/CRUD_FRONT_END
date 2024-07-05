import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbare from '../components/Navbare';
import { useSelector } from 'react-redux';

function Layout() {
  const { user } = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to='/login' />;
  }
  
  return (
    <div>
      <Navbare />
      <Outlet />
    </div>
  );
}

export default Layout;
