import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { readDataWithHeaders } from "../api/services";
import { BACKEND_ROUTES } from "../constants";
import '../styles/OrderAdmin.css'

const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const token = await getAccessTokenSilently();
        const data = await readDataWithHeaders(`${BACKEND_ROUTES.ORDER}`, token);
        data.length > 0 && setOrders(data);
      } catch ( error ) {
        console.error('Error:', error);
      }
    }
    fetchAllOrders()
  }, []);

  const handleDeliveryChange = async (orderNum, newStatus) => {
    try {
      setOrders(orders.map(order => order.orderNumber === orderNum ? {...order, isDeliver: newStatus} : order));
    } catch ( error ) {
      console.error('Failed to update delivery status:', error);
    }
  }

  const handleSendUpdate = async () => {
    try {} catch ( error ) {}
  }
  return (
  <section id="order-admin-container">
    <h1>Order Admin</h1>
    {orders.length > 0 ? (
      <div>
        {orders.map(({ orderNumber, isPaid, isDeliver }) => (
          <div className="order-card" key={orderNumber}>
            <div className="order-info">
              <h3>Order: {orderNumber}</h3>
              <div className="paid-status">
                <label className="paid-status">Paid Status: </label>
                <p>{isPaid ? "💰" : "🙅‍♂️"}</p>
              </div>
            </div>
            <div className="admin-order-status">
              <label>Delivery Status:</label>
              <select
                value={isDeliver.toString()}
                onChange={(e) => handleDeliveryChange(orderNumber, e.target.value === "true")}
              >
                <option value="true">Delivered</option>
                <option value="false">Not Delivered</option>
              </select>
            </div>
          </div>
        ))}
        <button
          onClick={handleSendUpdate}
          id="update-button"
          disabled={orders.length === 0}
        >
          Update All Orders
        </button>
      </div>
    ) : (
      <p className="no-orders">No orders available</p>
    )}
  </section>
  )
}

export default OrderAdmin;
