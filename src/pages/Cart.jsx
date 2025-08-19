import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { loadStripe } from '@stripe/stripe-js';
import { createData, deleteData, readDataWithHeaders, updateData } from '../api/services';
import { BACKEND_ROUTES } from "../constants";
import { FaTimes } from 'react-icons/fa';
import cartSlice from "../store"
import '../styles/Cart.css';

const Cart = () => {
    const { cart, setCart } = cartSlice();
    const [ refresh, setRefresh ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
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
    }, [refresh]);

    const handleCheckout = async () => {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
        const token = await getAccessTokenSilently();
        const reqData = JSON.stringify({ items: cart.items });

        const session = await createData(`${BACKEND_ROUTES.PAYMENT}/create-checkout-session`, token, reqData);

        const result = await stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) {
            console.error(result.error);
        }
    };

    const updateQuantity = async (id, quantity) => {
        setIsLoading(true);
        const token = await getAccessTokenSilently();
        const reqData = { id, quantity };
        const res = await updateData(`${BACKEND_ROUTES.CART}/update`, token, reqData);
        
        if(res) {
            setIsLoading(false);
            setRefresh(prev => !prev);
        }
    };

    const removeFromCart = async (id) => {
        const token = await getAccessTokenSilently();
        const res = await deleteData(`${BACKEND_ROUTES.CART}/remove/${id}`, token);
        
        if(res) {
            setRefresh(prev => !prev);
        }
    };
  
    return (
    <section id="cart-page">
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
                            <button 
                                onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                disabled={isLoading}
                            >
                                {`-`}
                            </button>
                            <span>{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                disabled={isLoading}
                            >
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
            <p id="no-cart">Your cart is empty</p>
        )}
    </section>
  )
}

export default Cart;
