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
import Product from './pages/Product.jsx';
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
          element: <Product />
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
