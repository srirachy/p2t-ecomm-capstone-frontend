export const fetchData = async (route) => {
    try{
        const url = import.meta.env.VITE_BACKEND_URI + route;
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch ( error ) {
        console.error('Error:', error);
        throw error;
    }
}
