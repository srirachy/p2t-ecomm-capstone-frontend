import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = ({isMobile, toggleMenu}) => {
  const { loginWithRedirect } = useAuth0();

  const mobileLogin = () => {
    toggleMenu();
    loginWithRedirect();
  }

  return isMobile ? <span className='dropdown-item' onClick={() => mobileLogin()}>Log In</span>: <button onClick={() => loginWithRedirect()}><span>Log In</span></button>;
}

export default LoginButton;
