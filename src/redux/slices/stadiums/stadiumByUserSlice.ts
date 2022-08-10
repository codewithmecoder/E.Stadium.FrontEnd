import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Paginate } from '../../../models/paginate.model';
import { StadiumInfo } from '../../../models/stadiums/stadium.model';
import { RootState } from '../../store';

interface InitProps {
  stadiums: Paginate<StadiumInfo> | null;
}

const initialState: InitProps = {
  stadiums: null,
};

export const stadiumIdSlice = createSlice({
  name: 'stadiumId',
  initialState,
  reducers: {
    setUserStadium: (state, action: PayloadAction<Paginate<StadiumInfo>>) => {
      state.stadiums = action.payload;
    },
    addStadiumToUserStadium: (state, action: PayloadAction<StadiumInfo>) => {
      state.stadiums = {
        ...state.stadiums,
        items: [...state.stadiums!.items!, action.payload].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
      };
    },
  },
});

export const { setUserStadium, addStadiumToUserStadium } =
  stadiumIdSlice.actions;
export const stadiumUserState = (state: RootState) =>
  state.stadiumUserReducer.stadiums;
export default stadiumIdSlice.reducer;
