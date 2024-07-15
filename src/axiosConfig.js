import axios from "axios";

const instance = axios.create({
  baseURL: "https://real-estate-react-app-backend.vercel.app",
  withCredentials: true,
});


instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;