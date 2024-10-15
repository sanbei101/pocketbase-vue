import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'https://fc.sanbei101.tech/pock',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default AxiosInstance;
