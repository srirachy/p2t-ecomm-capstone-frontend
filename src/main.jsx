import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router';
import { protectedRoute } from './utils/index.jsx';
import { ROUTES } from './constants/index.js';
import App from './App.jsx';
import Error from './pages/Error';
import Home from './pages/Home'
import Products from './pages/Products.jsx';
import ProductAdmin from './pages/ProductAdmin.jsx';
import Cart from './pages/Cart.jsx';
import Success from './pages/Success.jsx';
import Cancel from './pages/Cancel.jsx';
import Orders from './pages/Orders.jsx';
import OrderAdmin from './pages/OrderAdmin.jsx';
import './styles/index.css';

const router = createBrowserRouter(
  [
    {
      path: ROUTES.HOME,
      element: <App />,
      errorElement: <Error />,
      children: [
        {
          path: ROUTES.HOME,
          element: <Home />
        },
        {
          path: ROUTES.PRODUCTS,
          element: <Products />
        },
        protectedRoute(ROUTES.CART, <Cart />),
        protectedRoute(ROUTES.SUCCESS, <Success />),
        protectedRoute(ROUTES.CANCEL, <Cancel />),
        protectedRoute(ROUTES.ORDERS_USER, <Orders />),
        protectedRoute(ROUTES.ADMIN.PRODUCTS_CREATE, <ProductAdmin />, 'admin'),
        protectedRoute(ROUTES.ADMIN.ORDERS, <OrderAdmin />, 'admin')
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
