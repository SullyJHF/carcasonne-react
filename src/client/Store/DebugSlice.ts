import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Position } from '../../shared/types/Dimension.types';
import { useAppSelector } from './hooks';

export const STATE_KEY_DEBUG_SLICE = 'DEBUG_SLICE';

interface DebugSliceState {
  debugTilePosition: Position;
}

const initialState: DebugSliceState = {
  debugTilePosition: null,
};

const DebugSlice = createSlice({
  name: STATE_KEY_DEBUG_SLICE,
  initialState,
  reducers: {
    setDebugTilePosition: (state: DebugSliceState, action: PayloadAction<Position>) => {
      state.debugTilePosition = { ...state.debugTilePosition, ...action.payload };
    },
  },
});

export const { setDebugTilePosition } = DebugSlice.actions;

export const useDebugSliceData = () => useAppSelector((state) => state[STATE_KEY_DEBUG_SLICE]);

export default DebugSlice.reducer;
