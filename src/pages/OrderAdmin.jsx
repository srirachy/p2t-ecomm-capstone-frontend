import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { readDataWithHeaders } from "../api/services";
import { BACKEND_ROUTES } from "../constants";

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
    <>
      <div>OrderAdmin</div>
      {orders.length > 0 
        ? (
          <div>
            {orders.map(({orderNumber, isPaid, isDeliver}) => (
              <React.Fragment key={orderNumber}>
                <p>Order: {orderNumber}</p>
                <p>Paid: {isPaid.toString()}</p>
                <div>
                  <label>Delivery Status:</label>
                  <select
                    value={isDeliver.toString()}
                    onChange={(e) => handleDeliveryChange(orderNumber, e.target.value === 'true')}
                  >
                    <option value="true">Delivered</option>
                    <option value="false">Not Delivered</option>
                  </select>
                </div>
              </React.Fragment>
            ))}
            <button
              onClick={() => handleSendUpdate()}
              id='update-button'
              disabled={orders.length === 0}
            >
              Update All Orders
            </button>
          </div>
        )
        : (
          <>
            <p>No orders available</p>
          </>
        )
      }
    </>
  )
}

export default OrderAdmin;
