import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL:'http://localhost:2119/api',
  withCredentials:true
});
