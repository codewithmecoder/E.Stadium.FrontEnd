import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { user, UserInfo } from '../../../models/user.model';
import { RootState } from '../../store';

const initialState = {
  user: user,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
    },
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { logOut, setUser } = userSlice.actions;
export const userState = (state: RootState) => state.userReducer.user;
export default userSlice.reducer;
