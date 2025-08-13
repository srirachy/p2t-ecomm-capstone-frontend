import bene_one from '../assets/benefit-one.png';
import bene_two from '../assets/benefit-two.png';
import bene_three from '../assets/benefit-three.png';
import Card from './Card';
import { nanoid } from 'nanoid';
import '../styles/Benefits.css'

const Benefits = () => {
  const beneArrOfObj = [{beneImg: bene_one, beneAlt: 'Benefit One Image',beneHeader: 'Pokémon Deck', beneText: 'Ace tracks all your decks to keep your cards aligned with your lifestyle'},{beneImg: bene_two, beneAlt: 'Benefit Two Image', beneHeader: 'Pokémon Deck', beneText: 'Ace tracks all your decks to keep your cards aligned with your lifestyle'}, {beneImg: bene_three, beneAlt: 'Benefit Three Image', beneHeader: 'Pokémon Deck', beneText: 'Ace tracks all your decks to keep your cards aligned with your lifestyle'}]
  return (
    <section id='benefit-section'>
      {beneArrOfObj.map(({beneImg, beneAlt, beneHeader, beneText }) => <Card key={nanoid()} cardImg={beneImg} cardAlt={beneAlt} cardHeader={beneHeader} cardText={beneText} />)}
    </section>
  )
}

export default Benefits;
