
const baseURL = import.meta.env.VITE_BACKEND_URL;

export const fetchNoToken = async (endpoint, data, method = 'GET' ) => {
    const url = `${baseURL}/api/${endpoint}`;
    let response;
    if(method === 'GET') {
        response = await fetch( url ); 
    } else {
        response = await fetch( url , {
            method,
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(data)
        });
    } 

    return await response.json();
}

export const fetchToken = async (endpoint, data, method = 'GET') => {
    const url = `${baseURL}/api/${endpoint}`;
    const token = localStorage.getItem('token-chat') || '';

    let response;
    if(method === 'GET') {
        response = await fetch( url, { 
            headers: {
                'x-token': token
            }
        }); 
    } else {
        response = await fetch( url , {
            method,
            headers: {
                'Content-type': "application/json",
                'x-token': token
            },
            body: JSON.stringify(data)
        });
    } 

    return await response.json();
}