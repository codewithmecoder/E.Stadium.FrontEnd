import { UserInfo } from '../models/user.model';
import { CONSTANT } from '../constants/constant';

export const getUserStorage = () => {
  const userStr = localStorage.getItem(CONSTANT.userData);
  if (!userStr) return null;
  return JSON.parse(userStr) as UserInfo;
};
