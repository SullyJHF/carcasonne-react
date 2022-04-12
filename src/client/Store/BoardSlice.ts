import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from './hooks';
import { AppDispatch, RootState } from './store';
import { Dimensions, Tile } from './TileSlice';

interface Position {
  boardX: number;
  boardY: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

interface BoardState {
  dimensions: Dimensions;
  tiles: Tile[];
  possiblePositions: Position[];
}

const initialState: BoardState = {
  dimensions: {},
  tiles: [],
  possiblePositions: [],
};

export const STATE_KEY_BOARD = 'board';
const BoardSlice = createSlice({
  name: STATE_KEY_BOARD,
  initialState,
  reducers: {
    setBoardDimensions: (state, action: PayloadAction<Dimensions>) => {
      state.dimensions = action.payload;
    },
    setPossiblePositions: (state, action: PayloadAction<Position[]>) => {
      state.possiblePositions = action.payload;
    },
  },
});

export const { setBoardDimensions, setPossiblePositions } = BoardSlice.actions;

export const useBoardData = () => useAppSelector((state) => state[STATE_KEY_BOARD]);

export const calculatePossiblePositions = (tileDims: Dimensions, boardDims: Dimensions) => (dispatch: AppDispatch, getState: () => RootState) => {
  const x = (boardDims.width || 1) / 2 - (tileDims.width || 1) / 2;
  const y = (boardDims.height || 1) / 2 - (tileDims.height || 1) / 2;
  const width = tileDims.width;
  const height = tileDims.height;
  dispatch(setPossiblePositions([
    {
      boardX: 0,
      boardY: 0,
      x, y, width, height,
    },
  ]));
};

export default BoardSlice.reducer;
