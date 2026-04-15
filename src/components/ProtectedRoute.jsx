import React from 'react';
import { Navigate } from 'react-router-dom';

// This is a placeholder for actual Clerk/JWT Auth check
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  // Mock auth state (Assume user is logged in for local dev until real Auth is connected)
  const isAuthenticated = true;
  const userRole = 'donor'; // Mock role
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Once Clerk is connected, we will verify role against allowedRoles
  // if (allowedRoles.length && !allowedRoles.includes(userRole)) {
  //   return <Navigate to="/" replace />;
  // }

  return children;
};

export default ProtectedRoute;
