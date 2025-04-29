import '../styles/BenefitCard.css'

const BenefitCard = ({beneImg, beneAlt, beneHeader, beneText}) => {
  return (
    <div className='benefit-card-container'>
        <figure>
            <img src={beneImg} alt={beneAlt}/>
        </figure>
        <div className='benefit-card-text'>
            <h3>{beneHeader}</h3>
            <p>{beneText}</p>
        </div>
    </div>
  )
}

export default BenefitCard;