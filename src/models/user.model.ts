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
  updatedAt: string;
  fullName: string;
  imageUrl: string;
}

export const user: UserInfo | null = {
  createdAt: '',
  dob: '',
  email: '',
  firstName: '',
  gender: '',
  id: '',
  isActive: false,
  isStadiumRental: false,
  lastName: '',
  phone: '',
  region: '',
  updatedAt: '',
  fullName: '',
  imageUrl: '',
};

// export const userInfoState = atom<UserInfo | null>({
//   key: CONSTANT.userData,
//   default: null,
// });
