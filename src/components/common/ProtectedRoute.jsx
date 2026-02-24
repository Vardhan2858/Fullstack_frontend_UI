import { Navigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthProvider';

export function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
