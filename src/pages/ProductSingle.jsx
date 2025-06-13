import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../api/services';

const ProductSingle = () => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const params = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const ep = `products/${params.slug}`;
                const data = await fetchData(ep);
                if (data) {
                    setProduct(data);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            {product && 
            <>
                <p>{product.name}</p>
            </>}
        </>
    )
}

export default ProductSingle