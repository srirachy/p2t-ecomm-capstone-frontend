import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { loadStripe } from '@stripe/stripe-js';
import { createData, readDataWithHeaders } from '../api/services';
import { BACKEND_ROUTES } from "../constants";
import { FaTimes } from 'react-icons/fa';
import cartSlice from "../store"
import '../styles/Cart.css';

const Cart = () => {
    const { cart, setCart } = cartSlice();
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = await getAccessTokenSilently();
                const data = await readDataWithHeaders(`${BACKEND_ROUTES.CART}`, token);
                data && setCart(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        isAuthenticated && fetchCart();
    }, []);

    const handleCheckout = async () => {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
        const token = await getAccessTokenSilently();
        const data = JSON.stringify({ items: cart.items });

        const session = await createData(`${BACKEND_ROUTES.PAYMENT}/create-checkout-session`, token, data);

        const result = await stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) {
            console.error(result.error);
        }
    };

    // To-do: Add logic for quantity control and remove button
    const updateQuantity = async (id, quantity) => {};

    const removeFromCart = async (id) => {};
  
    return (
    <>
        <h1>Cart</h1>
        {cart?.items?.length ? (
            <>
                <ul className="cart-items">
                    {cart.items.map((item) => (
                    <li key={item.product._id} className="cart-item">
                        <img 
                            src={item.product.images[0].url} 
                            alt={item.product.name} 
                            className="cart-item-image"
                        />
                        
                        <h3 className="cart-item-name">{item.product.name}</h3>
                        
                        <div className="cart-item-quantity">
                        <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>
                            {`-`}
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>
                            {`+`}
                        </button>
                        </div>
                        
                        <p className="cart-item-price">
                            ${item.product.price.toFixed(2)}
                        </p>
                        
                        <p className="cart-item-total">
                            ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        
                        <button 
                            onClick={() => removeFromCart(item.product._id)}
                            className="cart-item-remove"
                        >
                            <FaTimes size={12} />
                        </button>
                    </li>
                    ))}
                </ul>
                
                <div className="cart-total">
                    <strong>Cart Total:</strong> $
                    {cart.items
                    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
                    .toFixed(2)}
                </div>
            
                <button onClick={handleCheckout} className="checkout-button">
                    Checkout
                </button>
            </>
            ) : (
            <p>Your cart is empty</p>
        )}
    </>
  )
}

export default Cart;
