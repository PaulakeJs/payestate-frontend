import axios from "axios";

export const axiosManager = axios.create({
  baseURL: 'https://backend-08gn.onrender.com/', // Set the base URL to the proxied API path
});

axiosManager.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
