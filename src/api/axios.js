import axios from 'axios';


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' }
});


// Add auth header automatically if stored
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        // token may already include "Bearer " or "Basic " prefix
        if (token.startsWith('Bearer ') || token.startsWith('Basic ')) {
            config.headers.Authorization = token;
        } else {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});


export default api;