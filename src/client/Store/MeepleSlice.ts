import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from './hooks';
import { Dimensions } from './TileSlice';

interface MeepleState {
  dimensions: Dimensions;
}

const initialState: MeepleState = {
  dimensions: {
    xOffset: 0,
    yOffset: 0,
    width: 0,
    height: 0,
  },
};

export const STATE_KEY_MEEPLE = 'meeple';
const MeepleSlice = createSlice({
  name: STATE_KEY_MEEPLE,
  initialState,
  reducers: {
    setMeepleDimensions: (state: MeepleState, action: PayloadAction<Dimensions>) => {
      state.dimensions = action.payload;
    },
  },
});

export const { setMeepleDimensions } = MeepleSlice.actions;

export const useMeepleData = () => useAppSelector((state) => state[STATE_KEY_MEEPLE]);
export const useMeepleDims = () => useAppSelector((state) => state[STATE_KEY_MEEPLE].dimensions);

export default MeepleSlice.reducer;
