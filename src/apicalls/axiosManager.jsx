import axios from "axios";

export const axiosManager = axios.create({
  baseURL: '/api', // Set the base URL to the proxied API path
});

axiosManager.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
