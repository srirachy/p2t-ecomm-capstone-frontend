import '../styles/Card.css'

const Card = ({cardImg, cardAlt, cardHeader, cardText}) => {
  return (
    <div className='card-container'>
        <figure>
            <img src={cardImg} alt={cardAlt}/>
        </figure>
        <div className='card-text'>
            <h3>{cardHeader}</h3>
            <p>{cardText}</p>
        </div>
    </div>
  )
}

export default Card;