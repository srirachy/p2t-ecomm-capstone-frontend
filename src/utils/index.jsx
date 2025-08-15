import PrivateRoute from '../components/PrivateRoute.jsx';
import AdminRoute from '../components/AdminRoute.jsx';

export const protectedRoute = (path, element, role = 'user') => ({
  path,
  element: role === 'admin' 
    ? <AdminRoute>{element}</AdminRoute> 
    : <PrivateRoute>{element}</PrivateRoute>,
});
