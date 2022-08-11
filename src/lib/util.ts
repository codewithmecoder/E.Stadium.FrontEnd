import axios, { AxiosRequestHeaders } from 'axios';
import { user, UserInfo } from '../models/user.model';
import { setUser } from '../redux/slices/userSlices/userSlices';
import { ENV } from './env';

export const getUser = async (headers: AxiosRequestHeaders, store: any) => {
  let userInfo = user;
  try {
    const { data } = await axiosInstance.get<UserInfo>('v1/user', {
      headers: headers as AxiosRequestHeaders,
      withCredentials: true,
    });
    userInfo = data;
    store.dispatch(setUser(data));
  } catch (error) {
    userInfo = null;
  }
  return {
    props: { userData: userInfo as UserInfo },
  };
};

export const axiosInstance = axios.create({
  baseURL: ENV.NEXT_PUBLIC_SERVER_ENDPOINT,
});
axiosInstance.defaults.withCredentials = true;
