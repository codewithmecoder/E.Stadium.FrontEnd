import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface InitProps {
  staduimId: string | undefined;
}

const initialState: InitProps = {
  staduimId: '',
};

export const stadiumIdSlice = createSlice({
  name: 'stadiumId',
  initialState,
  reducers: {
    resetStadiumId: (state) => {
      state.staduimId = undefined;
    },
    setUserStadiumId: (state, action: PayloadAction<string>) => {
      state.staduimId = action.payload;
    },
  },
});

export const { resetStadiumId, setUserStadiumId } = stadiumIdSlice.actions;
export const stadiumIdState = (state: RootState) =>
  state.stadiumIdReducer.staduimId;
export default stadiumIdSlice.reducer;
