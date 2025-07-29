import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
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
                <button>
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
