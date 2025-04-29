import React from 'react';
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
        Login
      </div>
    </nav>
  )
}

export default NavBar;