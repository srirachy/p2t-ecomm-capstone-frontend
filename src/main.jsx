import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App.jsx';
import Error from './pages/Error';
import Home from './pages/Home'
import Products from './pages/Products.jsx';
import ProductAdmin from './pages/ProductAdmin.jsx';
import Cart from './pages/Cart.jsx';
import Success from './pages/Success.jsx';
import Cancel from './pages/Cancel.jsx';
import './styles/index.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <Error />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/products',
          element: <Products />
        },
        {
          path: '/admin/products/create',
          element: <ProductAdmin />
        },
        {
          path: '/cart',
          element: <Cart />
        },
        {
          path: '/success',
          element: <Success />
        },
        {
          path: '/cancel',
          element: <Cancel />
        }
      ],
    }
  ]
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: import.meta.env.VITE_AUTH0_SCOPE,
      }}
      useRefreshTokens={true}
      cacheLocation={import.meta.env.VITE_AUTH0_CACHELOC}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </StrictMode>,
);
