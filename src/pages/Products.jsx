import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useAuth0 } from '@auth0/auth0-react';
import { readData } from '../api/services';
import { BACKEND_ROUTES } from '../constants';
import adminSlice from '../store';
import categorySlice from '../store';
import ProductCard from '../components/ProductCard';
import '../styles/Products.css';

const Products = () => {
  const {categories} = categorySlice();
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { getAccessTokenSilently, user } = useAuth0();
  const { isAdmin } = adminSlice();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await readData(BACKEND_ROUTES.PRODUCTS);
        if (data) {
          setProducts(data);
        }
      } catch ( error ) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [refresh]);

  const deleteProduct = async (pid) => {
    if(isAdmin){
      const token = await getAccessTokenSilently();
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/${BACKEND_ROUTES.PRODUCTS}/${pid}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}`},
        });

        if (res.ok) {
          setRefresh(prev => !prev);
          alert(`Product deleted: ${pid}`);
        }
      } catch ( error ) {
        console.error('Error:', error);
        alert('Failed to delete product');
      }
    } else {
      console.log('Unable to delete, how did the button appear for you anyway?!');
    }
  }

  const addToCart = async (productId, quantity) => {
    if (user) {
      const token = await getAccessTokenSilently();
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/${BACKEND_ROUTES.CART}/add`, {
          method: 'POST',
          body: JSON.stringify({
            productId,
            quantity,
          }),
          headers: { 
             'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`},
        });
        if (res.ok) {
          console.log('added to cart')
        }
      } catch ( error ) {
        console.error('Error:', error);
      }
    }
  }


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section id='product-page'>
      <h1>Products</h1>
      <div id='product-filter'>
        {categories?.map((catItem) => (
          <p key={nanoid()}>{catItem}</p>
        ))}
      </div>
      <div id='product-container'>
        {products?.map((product) => (
          <ProductCard 
            key={product._id}
            id={product._id}
            name={product.name} 
            slug={product.slug}
            price={product.price}
            categories={product.categories}
            images={product.images}
            shortDesc={product.shortDescription}
            longDesc={product.longDescription}
            deleteProduct={deleteProduct}
            isAdmin={isAdmin}
            user={user}
            addToCart={addToCart}
          />
        ))}
      </div>
    </section>
  )
}

export default Products;
