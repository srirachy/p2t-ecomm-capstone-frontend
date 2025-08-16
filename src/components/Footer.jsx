import logoImg from '../assets/logo-footer.png';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div id='logo-link-container'>
        <figure id='footer-logo-container'>
          <img src={logoImg} alt={''}/>
        </figure>
        <ul id='footer-link-container'>
          <li>Terms of Use</li>
          <li>Privacy Notice</li>
          <li>Legal Info</li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;
