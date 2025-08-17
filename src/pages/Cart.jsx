import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { loadStripe } from '@stripe/stripe-js';
import { createData, readDataWithHeaders } from '../api/services';
import { BACKEND_ROUTES } from "../constants";
import '../styles/Cart.css';
import cartSlice from "../store"

const Cart = () => {
    const { cart, setCart } = cartSlice();
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = await getAccessTokenSilently();
                const data = await readDataWithHeaders(`${BACKEND_ROUTES.CART}`, token);
                data && setCart(data);
                console.log(data);
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

  
    return (
    <>
        <h2>Cart</h2>
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
                        
                        {/* Quantity Controls */}
                        <div className="cart-item-quantity">
                        <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>
                            {`-`}
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>
                            {`+`}
                        </button>
                        </div>
                        
                        {/* Price */}
                        <p className="cart-item-price">
                            ${item.product.price.toFixed(2)}
                        </p>
                        
                        {/* Total (Price × Quantity) */}
                        <p className="cart-item-total">
                            ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        
                        {/* Remove Button */}
                        <button 
                            onClick={() => removeFromCart(item.product._id)}
                            className="cart-item-remove"
                        >
                            {`×`}
                        </button>
                    </li>
                    ))}
                </ul>
                
                {/* Grand Total */}
                <div className="cart-total">
                    <strong>Total:</strong> $
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
