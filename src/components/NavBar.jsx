import { Link } from 'react-router-dom';
import '../styles/NavBar.css'

const NavBar = () => {
  return (
    <nav>
      <div id='logo-container'>
        Logo
      </div>
      <div id='link-container'>
        Links
      </div>
      <div id='auth-container'>
        <Link to={`login`}><button><span>Login</span></button></Link>
      </div>
    </nav>
  )
}

export default NavBar;
