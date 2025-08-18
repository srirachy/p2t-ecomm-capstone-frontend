import '../styles/ProductCard.css';

// import { Link } from 'react-router';

const ProductCard = ({id, name, price, images, longDescription: longDesc, deleteProduct, isAdmin, user, addToCart}) => {
  
  return (
    <div className='product-card'>
      <div className='product-detail-container'>
        <figure>
          <img src={images[0].url} alt={images[0].altText} />
        </figure>
        <div className='product-text-container'>
          <p>Card Name: {name}</p>
          <p>Price: ${price.toFixed(2)}</p>
          <p>Description: {longDesc ? longDesc : 'No description...'}</p>
        </div>
      </div>
      <div className='product-button-container'>
        { user &&
          <button onClick={() => addToCart(id, 1)}>Add to Cart</button>
        }
        { isAdmin &&
          <button id='delete-product-btn' onClick={() => deleteProduct(id)}>Delete</button>
        }
      </div>
    </div>
  )
}

export default ProductCard;
