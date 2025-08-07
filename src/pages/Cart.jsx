import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { loadStripe } from '@stripe/stripe-js';
import cartSlice from "../store"

const Cart = () => {
    const { cart, setCart } = cartSlice();
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = await getAccessTokenSilently();
                
                const ep = import.meta.env.VITE_BACKEND_URI + `cart`;
                const res = await fetch(ep, {
                    headers: { Authorization: `Bearer ${token}`},
                });
                const data = await res.json();
                setCart(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        isAuthenticated && fetchCart();
    }, []);

    const handleCheckout = async () => {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
        const token = await getAccessTokenSilently();
        const epCheckout = import.meta.env.VITE_BACKEND_URI + `payment/create-checkout-session`;
        const epClear = import.meta.env.VITE_BACKEND_URI + `cart/clear`;

        const res = await fetch(epCheckout, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ 
                items: cart.items,
             }),
        });

        const session = await res.json();

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
