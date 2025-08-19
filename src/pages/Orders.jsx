import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { readDataWithHeaders } from "../api/services";
import { BACKEND_ROUTES } from "../constants";
import '../styles/Orders.css'

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
      <h1>Orders</h1>
      {orders.length > 0 ? (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.id} className="order-card">
              <div className="order-id">
                <span className="label">{`Order #: `}</span>
                <span>{order.orderNumber}</span>
              </div>

              <div className={`order-status ${order.isDeliver ? 'delivered' : 'pending'}`}>
                Delivery Status: {order.isDeliver ? 'Delivered' : 'Pending'}
              </div>

              <div className="order-total">
                <span className="label">Total:</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p id="no-orders">No active or completed orders</p>
      )}
    </>
  )
}

export default Orders;
