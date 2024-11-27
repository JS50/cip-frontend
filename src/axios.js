import axios from 'axios';

// Create an Axios instance for the API
const axiosInstance = axios.create({
    baseURL: 'http://cip-backend.test/api/', // Set the correct backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
