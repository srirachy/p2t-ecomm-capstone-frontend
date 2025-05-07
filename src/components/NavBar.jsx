// import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import '../styles/NavBar.css'
import ProtectedComponent from './ProtectedComponent';

const NavBar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <nav>
      <div id='logo-container'>
        Logo
      </div>
      <div id='link-container'>
        Links
        <ProtectedComponent />
      </div>
      <div id='auth-container'>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </nav>
  )
}

export default NavBar;
