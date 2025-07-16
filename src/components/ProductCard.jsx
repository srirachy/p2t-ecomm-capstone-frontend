import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

const ProductCard = ({id, name, slug, price, categories, images, shortDesc, longDesc, deleteProduct, isAdmin}) => {
  return (
    <div className='product-card'>
      {/* <Link 
        to={`/products/${slug}`}
        slug={slug}
      > */}
        {/* carousel images eventually */}
      <div>
        <figure>
          <img src={images[0].url} alt={images[0].altText} />
        </figure>
        <p>{name}</p>
        <p>{price}</p>
        <p>{categories}</p>
        <p>{shortDesc}</p>
      </div>
      {/* </Link> */}
      <div>
        <button>Add to Cart</button>
        { isAdmin &&
          <div>
            {/* <button>Edit</button> */}
            <button onClick={() => deleteProduct(id)}>Delete</button>
          </div>
        }
      </div>
      
    </div>
  )
}

export default ProductCard;