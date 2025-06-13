import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { fetchData } from '../api/services'
import ProductCard from '../components/ProductCard';
import '../styles/Products.css';

const Products = () => {
  const {categories} = useOutletContext();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const ep = 'products';
        const data = await fetchData(ep);
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
  }, []);

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
            name={product.name} 
            slug={product.slug}
            price={product.price}
            categories={product.categories}
            images={product.images}
            shortDesc={product.shortDescription}
            longDesc={product.longDescription}
          />
        ))}
      </div>
    </section>
  )
}

export default Products;