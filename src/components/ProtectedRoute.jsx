import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isLoaded, userId } = useAuth();
  
  if (!isLoaded) return <div style={{padding: '2rem'}}>Loading Secure Session...</div>;

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
