import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from './hooks';
import { Dimensions, Tile } from './TileSlice';

interface Position {
  x: number;
  y: number;
}

interface BoardState {
  dimensions: Dimensions;
  tiles: Tile[];
  possiblePositions: Position[];
}

const initialState: BoardState = {
  dimensions: {},
  tiles: [],
  possiblePositions: [{ x: 0, y: 0 }],
};

export const STATE_KEY_BOARD = 'board';
const BoardSlice = createSlice({
  name: STATE_KEY_BOARD,
  initialState,
  reducers: {
    setBoardDimensions: (state, action: PayloadAction<Dimensions>) => {
      state.dimensions = action.payload;
    },
  },
});

export const { setBoardDimensions } = BoardSlice.actions;

export const useBoardData = () => useAppSelector((state) => state[STATE_KEY_BOARD]);

export default BoardSlice.reducer;
