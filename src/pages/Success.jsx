import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { FaCheckCircle } from 'react-icons/fa';
import '../styles/PaymentPages.css'
import { BACKEND_ROUTES } from '../constants';
import { useAuth0 } from '@auth0/auth0-react';
import { createDataNoContentType, deleteData } from '../api/services';

const SuccessPage = () => {
  const navigate = useNavigate();
  const [orderNum, setOrderNum] = useState('');
  const [searchParams] = useSearchParams();
  const effectRan = useRef(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const clearCart = async () => {
      const token = await getAccessTokenSilently();
      const res = await deleteData(`${BACKEND_ROUTES.CART}/clear`, token);

      if (res) {
        console.log(res.message);
      }
    };
    const createOrder = async () => {
      const sessionId = searchParams.get('session_id');
      const token = await getAccessTokenSilently();
      const body = { sessionId };
      const res = await createDataNoContentType(`${BACKEND_ROUTES.ORDER}/create-order/${sessionId}`, token, body);

      if (res) {
        setOrderNum(res.orderNumber);
        alert(`Order completed!`);
        clearCart();
      }
    };
    if (effectRan.current || import.meta.env.VITE_NODE_ENV !== "development") {
        createOrder();
    }
    
    return () => effectRan.current = true;
  }, []);

  return (
    <div className="payment-container">
      <FaCheckCircle className="payment-icon" style={{ color: 'green' }} />
      <h1 className="payment-title">Payment Successful!</h1>
      <p className="payment-message">
        Thank you for your purchase. Your order has been received and is being processed.
      </p>
      {orderNum &&
        <p className="payment-message">
          Your order number is: {orderNum}
        </p>
      }
      <div className="payment-buttons">
        <button className="btn btn-primary" onClick={() => navigate('/orders')}>
          View Your Orders
        </button>
        <button className="btn btn-outline" onClick={() => navigate('/')}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
