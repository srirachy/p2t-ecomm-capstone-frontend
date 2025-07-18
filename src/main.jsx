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
import './styles/index.css';
import ProductAdmin from './pages/ProductAdmin.jsx';
import ProductSingle from './pages/ProductSingle.jsx';

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
          path: '/products/:slug',
          element: <ProductSingle />
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
