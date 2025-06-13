import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

const ProductCard = ({name, slug, price, categories, images, shortDesc, longDesc}) => {
  return (
    <div className='product-card'>
      <Link 
        to={`/products/${slug}`}
        slug={slug}
      >
        <figure>
          <img src={images.url} alt={images.altText} />
        </figure>
        <p>{name}</p>
        <p>{price}</p>
        <p>{categories}</p>
        <p>{shortDesc}</p>
        <button>Add to Cart</button>
      </Link>
    </div>
  )
}

export default ProductCard