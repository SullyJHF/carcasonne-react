import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from './hooks';
import { AppDispatch, RootState } from './store';
import { Dimensions, Tile } from './TileSlice';

interface BoardTilePosition {
  boardX: number;
  boardY: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface BoardState {
  dimensions: Dimensions;
  tiles: Tile[];
  possiblePositions: BoardTilePosition[];
}

const initialState: BoardState = {
  dimensions: {
    xOffset: 0,
    yOffset: 0,
    width: 0,
    height: 0,
  },
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
    setPossiblePositions: (state, action: PayloadAction<BoardTilePosition[]>) => {
      state.possiblePositions = action.payload;
    },
  },
});

export const { setBoardDimensions, setPossiblePositions } = BoardSlice.actions;

export const useBoardData = () => useAppSelector((state) => state[STATE_KEY_BOARD]);

export const calculatePossiblePositions =
  (tileDims: Dimensions, boardDims: Dimensions) => (dispatch: AppDispatch, getState: () => RootState) => {
    console.log(boardDims.xOffset);
    const x = (boardDims.width || 1) / 2 - (tileDims.width || 1) / 2 + boardDims.xOffset;
    const y = (boardDims.height || 1) / 2 - (tileDims.height || 1) / 2;
    const width = tileDims.width;
    const height = tileDims.height;
    dispatch(
      setPossiblePositions([
        {
          boardX: 0,
          boardY: 0,
          x,
          y,
          width,
          height,
        },
      ]),
    );
  };

export default BoardSlice.reducer;
