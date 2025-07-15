import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import adminSlice from '../store';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Logo from '../assets/logo.png'
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/NavBar.css'

const NavBar = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const {isAdmin, setIsAdmin} = adminSlice();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsOpen(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch(import.meta.env.VITE_BACKEND_URI + 'users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error('Failed to check admin status:', error);
      }
    }
    isAuthenticated ? checkAdminStatus() : setIsAdmin(false);
  }, [isAuthenticated]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <nav>
      <div id='logo-container'>
        <Link to='/'><img id='logo' src={Logo} alt='Image of Logo' /></Link>
      </div>
      {isMobile ? 
        <>
          <button className='hamburger' onClick={toggleMenu} aria-label='menu'>
            {isOpen ? <FaTimes size={24} />: <FaBars size={24} /> }
          </button>
          <div className={`ham-menu ${isMobile ? (isOpen ? "active" : "hidden") : ""}`}>
            <Link to='/products' className='dropdown-item' onClick={toggleMenu}>Products</Link>
            {isAdmin && (
              <>
                <Link
                  to='/admin/products/create'
                  className='dropdown-item'
                  onClick={toggleMenu}
                >
                  Add Product
                </Link>
                {/* <Link
                  to='/admin/orders/view'
                  className='dropdown-item'
                >
                  View Order
                </Link> */}
              </>
            )}
           
            <div id='auth-container'>
              {isAuthenticated ? <LogoutButton isMobile={isMobile} toggleMenu={toggleMenu} /> : <LoginButton isMobile={isMobile} toggleMenu={toggleMenu} />}
            </div>
          </div>
        </>
        :
        <>
          <div id='link-container'>
            <Link to='/products'>Products</Link>
            {isAdmin && (
              <>
                {!isMobile 
                  ? 
                  (<Link to="/admin/products/create">
                    Add Product
                  </Link>) 
                  : 
                  (
                    <div id='dropdown-container'>
                      <button
                        id='dropdown-toggle'
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        Admin
                        <span id={`dropdown-arrow${isDropdownOpen ? '-open' : ''}`}>
                          ▼
                        </span>
                      </button>

                      {isDropdownOpen && (
                        <div id='dropdown-menu'>
                          <Link
                            to='/admin/products/create'
                            className='dropdown-item'
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Add Product
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
              </>
            )}
          </div>
          <div id='auth-container'>
            {isAuthenticated ? <LogoutButton isMobile={isMobile} /> : <LoginButton isMobile={isMobile} />}
          </div>
        </>
      }
    </nav>
  )
}

export default NavBar;
