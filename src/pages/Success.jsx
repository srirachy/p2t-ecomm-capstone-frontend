import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { FaCheckCircle } from 'react-icons/fa';
import '../styles/PaymentPages.css'


const SuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const effectRan = useRef(false);

  useEffect(() => {
    const createOrder = async () => {
      const sessionId = searchParams.get('session_id');
      const ep = import.meta.env.VITE_BACKEND_URI + `order/${sessionId}`;
      const res = await fetch(ep, {
        method: 'POST',
        body: {
          sessionId,
        },
      });

      if (res.ok) {
        alert(`Order completed!`);
      }
    }
    const clearCart = async () => {
        // add to order
        const userId = searchParams.get('user_id');

        // clear cart
        const ep = import.meta.env.VITE_BACKEND_URI + `cart/clear/${userId}`;
        const res = await fetch(ep, {
          method: 'DELETE',
        });
        if (res.ok) {
          console.log(`Cart cleared: ${userId}`);
        }
    }
    if (effectRan.current || import.meta.env.VITE_NODE_ENV !== "development") {
        createOrder(); // create order
        clearCart(); // this is effectively clearCart
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
      <p className="payment-message">
        A confirmation email has been sent to your registered email address.
      </p>
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
