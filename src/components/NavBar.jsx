import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { BACKEND_ROUTES, ROUTES } from '../constants/index.js';
import adminSlice from '../store';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Logo from '../assets/logo.png'
import '../styles/NavBar.css'
import { readDataWithHeaders } from '../api/services.js';

const NavBar = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { isAdmin, setIsAdmin } = adminSlice();
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ isMobile, setIsMobile ] = useState(window.innerWidth <= 768);

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
        const res = await readDataWithHeaders(`${BACKEND_ROUTES.USERS}/me`, token);

        setIsAdmin(res.isAdmin);
      } catch (error) {
        console.error('Failed to check admin status:', error);
      }
    }
    isAuthenticated ? checkAdminStatus() : setIsAdmin(false);
  }, [isAuthenticated]);

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav>
      <div id='nav-container'>
        <div id='logo-container'>
          <Link to={ROUTES.HOME}><img id='logo' src={Logo} alt='Image of Logo' /></Link>
        </div>
        {isMobile ? 
          <>
            <button className='hamburger' onClick={toggleMenu} aria-label='menu'>
              {isOpen ? <FaTimes size={24} />: <FaBars size={24} /> }
            </button>
            <div className={`ham-menu ${isMobile ? (isOpen ? "active" : "hidden") : ""}`}>
              <Link to={ROUTES.PRODUCTS} className='dropdown-item' onClick={toggleMenu}>Products</Link>
              {
                isAuthenticated &&
                <>
                  <Link to={ROUTES.CART} className='dropdown-item' onClick={toggleMenu}>Cart</Link>
                  <Link to={ROUTES.ORDERS_USER} className='dropdown-item' onClick={toggleMenu}>Orders</Link>
                </>
              }
              {isAdmin && (
                <>
                  <Link
                    to={ROUTES.ADMIN.PRODUCTS_CREATE}
                    className='dropdown-item'
                    onClick={toggleMenu}
                  >
                    Add Product
                  </Link>
                  <Link
                    to={ROUTES.ADMIN.ORDERS}
                    className='dropdown-item'
                    onClick={toggleMenu}
                  >
                    View Orders
                  </Link>
                </>
              )}
            
              <div id='auth-container'>
                {isAuthenticated ? <LogoutButton isMobile={isMobile} toggleMenu={toggleMenu} /> : <LoginButton isMobile={isMobile} toggleMenu={toggleMenu} />}
              </div>
            </div>
          </> // my navBar when its mobile
          :
          <div id='link-auth-container'>
            <div id='link-container'>
              <Link to={ROUTES.PRODUCTS}>Products</Link>
              {
                isAuthenticated && 
                <>
                  <Link to={ROUTES.CART}>Cart</Link>
                  <Link to={ROUTES.ORDERS_USER}>Orders</Link>
                </>
              }
              {isAdmin && (
                
                      <div id='dropdown-container'>
                        <button
                          id='dropdown-toggle'
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                          <span>
                            Admin
                          </span>
                          <span id={`dropdown-arrow${isDropdownOpen ? '-open' : ''}`}>
                            ▼
                          </span>
                        </button>

                        {isDropdownOpen && (
                          <div id='dropdown-menu'>
                            <Link
                              to={ROUTES.ADMIN.PRODUCTS_CREATE}
                              className='dropdown-item'
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              <span>
                                Add Product
                              </span>
                            </Link>
                            <Link
                              to={ROUTES.ADMIN.ORDERS}
                              className='dropdown-item'
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              <span>
                                View Orders
                              </span>
                            </Link>
                          </div>
                        )}
                      </div>
                    )}

              
            </div>
            <div id='auth-container'>
              {isAuthenticated ? <LogoutButton isMobile={isMobile} /> : <LoginButton isMobile={isMobile} />}
            </div>
          </div> // my navBar when its desktop
        }
      </div>
    </nav>
  )
}

export default NavBar;
