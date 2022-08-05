import { atom } from 'recoil';
import { CONSTANT } from '../constants/constant';

export interface UserInfo {
  createdAt: string;
  dob: string;
  email: string;
  firstName: string;
  gender: string;
  id: string;
  isActive: boolean;
  isStadiumRental: boolean;
  lastName: string;
  phone: string;
  region: string;
  token: string;
  updatedAt: string;
}
// @ts-ignore
// let user  = '';
// if (typeof window !== 'undefined') {
//   user = localStorage.getItem(CONSTANT.userStorage) as UserInfo;
// }
const user: UserInfo = {};
export const userAtom = atom({
  key: CONSTANT.userData,
  default: user,
});
