import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loader from '../components/common/Loader';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading, isTeacher } = useAuth();

  if (loading) return <Loader fullScreen />;
  if (isAuthenticated) {
    return <Navigate to={isTeacher ? '/teacher' : '/student'} replace />;
  }
  return children;
};

export default PublicRoute;
