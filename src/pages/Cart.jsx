import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { loadStripe } from '@stripe/stripe-js';
import { createData, readDataWithHeaders } from '../api/services';
import { BACKEND_ROUTES } from "../constants";
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
                <ul>
                    {cart.items.map(item => (
                        <li key={item.product._id}>
                            <h3>{item.product.name}</h3>
                        </li>
                    ))}
                </ul>
                <button onClick={() => handleCheckout()}>
                    Checkout
                </button>
            </>
        ) : (
            <p>Cart is empty</p>
        )}
    </>
  )
}

export default Cart;
