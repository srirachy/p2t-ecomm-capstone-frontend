import { useAuth0 } from '@auth0/auth0-react';

const ProtectedComponent = () => {
  const { getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    const ep = 'api/private-scoped';

    
    try {
      // Get the token silently (checks cache first)
      console.log('yo')
      const token = await getAccessTokenSilently({
        authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            scope: "read:products",
      },}).catch((error) => {
        console.error("Silent token error:", error); // Debug silent renewal
        throw error;
      });
      console.log(token);
      
      // Use the token in an API request
      const response = await fetch(import.meta.env.VITE_BACKEND_URI + ep, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
        console.error("API error:", error);
    }
  };

  return <button onClick={() => callApi()}>Call Secure API</button>;
}

export default ProtectedComponent;