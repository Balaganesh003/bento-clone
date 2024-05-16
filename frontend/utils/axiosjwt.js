import Cookies from 'js-cookie';
import axios from 'axios';

export const axiosWithToken = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // Send cookies with requests
  headers: {
    Authorization: `Bearer ${Cookies.get('jwt')}`,
  },
});
