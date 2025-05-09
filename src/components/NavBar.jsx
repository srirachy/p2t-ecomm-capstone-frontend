import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import '../styles/NavBar.css'
// import ProtectedComponent from './ProtectedComponent';

const NavBar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <nav>
      <div id='logo-container'>
        <NavLink to='/'>Logo</NavLink>
      </div>
      <div id='link-container'>
        <NavLink to='/products'>Products</NavLink>
        {/* <ProtectedComponent /> */}
      </div>
      <div id='auth-container'>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </nav>
  )
}

export default NavBar;
