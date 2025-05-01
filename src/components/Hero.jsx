import char from '../assets/bench_char.png';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section id='hero-section'>
      <div id='hero-text-container'>
        <h1>Let AI handle your TCG lifestyle</h1>
        <p>Over 1k thriving customers</p>
        <p>Automated trades that adapts to your lifestyle</p>
        <button><span>Get Started</span></button>
      </div>
      <figure id='hero-img-container'>
        <img src={char} alt='Image of Charmander Plushie Sitting on a Bench.'/>
      </figure>
    </section>
  )
}

export default Hero;