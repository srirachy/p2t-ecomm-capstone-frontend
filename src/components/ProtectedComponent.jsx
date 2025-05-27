import { useAuth0 } from '@auth0/auth0-react';

const ProtectedComponent = () => {
  const { getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    const ep = 'api/manage-product';

    
    try {
      const token = await getAccessTokenSilently();

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
