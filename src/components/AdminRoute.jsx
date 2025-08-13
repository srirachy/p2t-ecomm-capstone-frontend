import { Navigate } from "react-router";
import adminSlice from "../store/";

const AdminRoute = ({ children }) => {
    
  const { isAdmin } = adminSlice();

  if (!isAdmin) {
    return <Navigate to='/' replace />;
  }

  return children;
}

export default AdminRoute;
