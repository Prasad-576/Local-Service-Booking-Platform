import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isLoggedIn, user, token } = useAuth();
  const location = useLocation();

  // If resolving state or checking token... (we could add a loading state layer if needed)
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the route has specific role requirements
  if (allowedRoles && user && !allowedRoles.includes(user.role || 'user')) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
