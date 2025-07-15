import { Link } from 'react-router-dom';
import adminSlice from '../store';
import '../styles/ProductCard.css';

const ProductCard = ({name, slug, price, categories, images, shortDesc, longDesc}) => {
  const { isAdmin } = adminSlice();
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
      </Link>
      <div>
        <button>Add to Cart</button>
        { isAdmin &&
          <div>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        }
      </div>
      
    </div>
  )
}

export default ProductCard;