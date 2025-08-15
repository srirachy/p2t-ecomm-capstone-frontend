import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { FaCheckCircle } from 'react-icons/fa';
import '../styles/PaymentPages.css'
import { BACKEND_ROUTES } from '../constants';


const SuccessPage = () => {
  const navigate = useNavigate();
  const [orderNum, setOrderNum] = useState('');
  const [searchParams] = useSearchParams();
  const effectRan = useRef(false);

  useEffect(() => {
    const clearCart = async () => {
      // add to order
      const userId = searchParams.get('user_id');

      // clear cart
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/${BACKEND_ROUTES.CART}/clear/${userId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        console.log(`Cart cleared: ${userId}`);
      }
    }
    const createOrder = async () => {
      const sessionId = searchParams.get('session_id');
      const userId = searchParams.get('user_id');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/${BACKEND_ROUTES.ORDER}/${sessionId}/${userId}`, {
        method: 'POST',
        body: {
          sessionId,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setOrderNum(data.orderNumber);
        alert(`Order completed!`);
        clearCart(); // this is effectively clearCart
      }
    }
    if (effectRan.current || import.meta.env.VITE_NODE_ENV !== "development") {
        createOrder(); // create order
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
