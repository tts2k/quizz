import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ admin, children }) {

  const user = useSelector(state => state.user);

  if (!user.userInfo) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
