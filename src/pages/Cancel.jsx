import { useNavigate } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';
import '../styles/PaymentPages.css';

const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-container">
      <FaTimesCircle className="payment-icon" style={{ color: 'red' }} />
      <h1 className="payment-title">Payment Cancelled</h1>
      <p className="payment-message">
        Your payment was not completed. Your order has not been placed.
      </p>
      <div className="payment-buttons">
        <button className="btn btn-danger" onClick={() => navigate('/cart')}>
          Back to Cart
        </button>
        <button className="btn btn-outline" onClick={() => navigate('/')}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CancelPage;
