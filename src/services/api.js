import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_API,
  crednetials: true,
});

export default apiClient;
