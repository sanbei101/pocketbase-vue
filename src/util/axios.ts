import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://62.234.178.169:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default AxiosInstance;
