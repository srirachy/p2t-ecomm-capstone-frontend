import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { readDataWithHeaders } from "../api/services";
import { BACKEND_ROUTES } from "../constants";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await getAccessTokenSilently();
        const data = await readDataWithHeaders(`${BACKEND_ROUTES.ORDER}/myorders`, token);
        data.length > 0 && setOrders(data);
        
      } catch ( error ) {
        console.error('Error:', error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <>
      <div>Orders</div>
      {orders.length > 0 
        ? orders.map((order) => (
          <p>{order.id}</p>
        ))
        : (
          <>
            <p>No active/completed orders</p>
          </>
        )
      }
    </>
  )
}

export default Orders;
