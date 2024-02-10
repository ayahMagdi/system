import { Navigate , Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

const ProtectedRoute = () => {

  const cookies = new Cookies();
  const checkAuth = cookies.get('username')

  return (checkAuth !== undefined ? <Outlet /> : <Navigate to="/login" replace/>)
};

export default ProtectedRoute