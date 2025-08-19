import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { createData, readData } from '../api/services';
import { BACKEND_ROUTES } from '../constants';
import adminSlice from '../store';
import categorySlice from '../store';
import ProductCard from '../components/ProductCard';
import '../styles/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [recentlyAdded, setRecentlyAdded] = useState(null);
  const [error, setError] = useState('');
  const { getAccessTokenSilently, user } = useAuth0();
  const { categories } = categorySlice();
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
      const reqData = JSON.stringify({ productId, quantity });
      try {
        const res = await createData(`${BACKEND_ROUTES.CART}/add`, token, reqData);

        if (res) {
          setRecentlyAdded(productId);
          setTimeout(() => setRecentlyAdded(null), 2000);
        }
      } catch ( error ) {
        console.error('Error:', error);
      }
    }
  }

  const filteredProducts = activeCategory ? products?.filter(product => product.categories.includes(activeCategory)) : products;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section id='product-page'>
      <h1>Products</h1>
      <div id='product-filter'>
        <p
          className={!activeCategory ? 'active' : ''}
          onClick={() => setActiveCategory(null)}
        >
          All
        </p>
        {categories?.map((catItem) => (
          <p 
            key={catItem}
            className={activeCategory === catItem ? 'active' : ''}
            onClick={() => setActiveCategory(catItem)}
          >
            {catItem}
          </p>
        ))}
      </div>
      <div id='product-container'>
        {
          filteredProducts.length > 0 
          ?
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                {...product}
                id={product._id}
                deleteProduct={deleteProduct}
                isAdmin={isAdmin}
                user={user}
                addToCart={addToCart}
                recentlyAdded={recentlyAdded}
              />
            ))
          : 
            <h3>Currently no products with category: {activeCategory}</h3>
        }
      </div>
    </section>
  )
}

export default Products;
