import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface Menu {
  id: number;
  value: string;
  isCurrent: boolean;
  href: string;
}

export const menus: Menu[] = [
  {
    id: 1,
    value: 'Near by',
    isCurrent: false,
    href: 'nearby',
  },
  {
    id: 2,
    value: 'My Stadium',
    isCurrent: false,
    href: 'mystadium',
  },
  {
    id: 3,
    value: 'Booking',
    isCurrent: false,
    href: 'booking',
  },
  {
    id: 4,
    value: 'Saved places',
    isCurrent: false,
    href: 'savedplaces',
  },
  {
    id: 5,
    value: 'Recently View',
    isCurrent: false,
    href: 'recentlyview',
  },
];
export const profileManu: Menu[] = [
  {
    id: 1,
    value: 'Your Profile',
    isCurrent: true,
    href: 'profile',
  },
];

const initialStateMenu = {
  menus: menus,
};

export const navbarSlice = createSlice({
  name: 'navMenu',
  initialState: initialStateMenu,
  reducers: {
    updateActiveNav: (state, action: PayloadAction<number>) => {
      state?.menus.forEach((i) => {
        if (action.payload === i.id) i.isCurrent = true;
        else i.isCurrent = false;
      });
    },
    updateActiveByHref: (state, action: PayloadAction<string>) => {
      state.menus.forEach((i) => {
        if (action.payload === i.href) i.isCurrent = true;
        else i.isCurrent = false;
      });
    },
  },
});

export const { updateActiveNav, updateActiveByHref } = navbarSlice.actions;
export const menuState = (state: RootState) => state.navbarReducer.menus;
export default navbarSlice.reducer;
