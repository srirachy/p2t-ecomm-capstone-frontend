import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Orders = () => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    
  }, []);

  return (
    <div>Orders</div>
  )
}

export default Orders;
