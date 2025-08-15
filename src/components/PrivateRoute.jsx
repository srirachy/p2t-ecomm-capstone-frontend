import { Navigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await getAccessTokenSilently();
        setIsAuth(true);
      } catch ( error ) {
        console.error('Auth verification failed:', error);
        setIsAuth(false);
      }
    };
    if(!isAuthenticated) {
      verifyAuth();
    }
  }, [])

  if (!isAuth) {
    return <Navigate to='/' replace />;
  }
  
  return children;
}

export default PrivateRoute;
