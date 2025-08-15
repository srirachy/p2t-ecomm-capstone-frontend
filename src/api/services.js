export const createData = async (route, tkn, body) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/${route}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tkn}`
            },
            body
        });
        if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch ( error ) {
        console.error('Error:', error);
        throw error;
    }
};

export const createDataNoContentType = async (route, tkn, body) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/${route}`, {
            method: 'POST',
            headers: { 
                Authorization: `Bearer ${tkn}`
            },
            body
        });
        if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch ( error ) {
        console.error('Error:', error);
        throw error;
    }
};

export const readData = async (route) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/${route}`);
        if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch ( error ) {
        console.error('Error:', error);
        throw error;
    }
};

export const readDataWithHeaders = async (route, tkn) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/${route}`, {
            headers: { Authorization: `Bearer ${tkn}`},
        });
        if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch ( error ) {
        console.error('Error:', error);
        throw error;
    }
};

export const updateData = async (route, tkn, body) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/${route}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tkn}`
            },
            body
        });
        if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch ( error ) {
        console.error('Error:', error);
        throw error;
    }
};

export const deleteData = async (route, tkn) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/${route}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${tkn}`},
        });
        if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch ( error ) {
        console.error('Error:', error);
        throw error;
    }
};
