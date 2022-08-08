import axios from 'axios';
import { CONSTANT } from '../constants/constant';
import { UserInfo } from '../models/user.model';

export const getUserStorage = () => {
  const userStr = localStorage.getItem(CONSTANT.userData);
  if (!userStr) return null;
  return JSON.parse(userStr) as UserInfo;
};

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_ENDPOINT,
});
axiosInstance.defaults.withCredentials = true;
