import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  // console.log(user);
  // const isAdmin = user?.['https://pokecommerce.onrender.com/roles']?.includes('admin');
  // const generalPerms = 'openid profile email read:products purchase:products';
  // const adminPerms = 'manage:products';
  // console.log(isAdmin);

  // return <button onClick={() => loginWithRedirect({authorizationParams: {scope: isAdmin ? `${generalPerms} ${adminPerms}` : generalPerms}})}><span>Log In</span></button>;
  return <button onClick={() => loginWithRedirect()}><span>Log In</span></button>;
}

export default LoginButton;
