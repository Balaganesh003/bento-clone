import Cookies from 'js-cookie';
import axios from 'axios';

export const axiosWithToken = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${Cookies.get('jwt')}`,
  },
});
