import dOne from '../assets/design-one.png';
import dTwo from '../assets/design-two.png';
import dThree from '../assets/design-three.png';
import Card from '../components/Card';
import '../styles/Designs.css';
import { nanoid } from 'nanoid'

const Designs = () => {
  const designArr = [{desImg: dOne, desAlt: 'Design One Image', desHeader: 'Design Card', desText: 'Ace tracks all your designs to keep your cards aligned with your lifestyle'}, {desImg: dTwo, desAlt: 'Design Two Image', desHeader: 'Design Card', desText: 'Ace tracks all your designs to keep your cards aligned with your lifestyle'}, {desImg: dThree, desAlt: 'Design Three Image', desHeader: 'Design Card', desText: 'Ace tracks all your designs to keep your cards aligned with your lifestyle'}];

  return (
    <section id='design-section'>
      <h2>Ace is fueling creativity</h2>
      {designArr.map(({desImg, desHeader, desText}) => <Card key={nanoid()} cardImg={desImg} cardHeader={desHeader} cardText={desText} />)}
    </section>
  )
}

export default Designs;