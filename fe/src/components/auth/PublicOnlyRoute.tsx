import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface PublicOnlyRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({
  children,
  redirectTo = '/',
}) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    // Redirect authenticated users away from auth pages
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default PublicOnlyRoute;
