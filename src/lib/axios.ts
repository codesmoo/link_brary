import axios from 'axios';

const BASE_URL = 'https://linkbrary-api.vercel.app/16-송성학/';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
