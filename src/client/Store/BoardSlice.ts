import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { boardToScreenPos } from '../utils/maths';
import { setDebugTilePosition } from './DebugSlice';
import { useAppSelector } from './hooks';
import { AppDispatch, DispatchFunc, RootState } from './store';
import { Dimensions, ITile } from './TileSlice';

export interface BoardPosition {
  boardX: number;
  boardY: number;
}
interface BoardTilePosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface BoardState {
  dimensions: Dimensions;
  tiles: ITile[];
  possiblePositions: BoardPosition[];
  hoveringOver: BoardPosition;
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
  hoveringOver: null,
};

export const STATE_KEY_BOARD = 'board';
const BoardSlice = createSlice({
  name: STATE_KEY_BOARD,
  initialState,
  reducers: {
    setBoardDimensions: (state, action: PayloadAction<Dimensions>) => {
      state.dimensions = action.payload;
    },
    setPossiblePositions: (state, action: PayloadAction<BoardPosition[]>) => {
      state.possiblePositions = action.payload;
    },
    setHoveringOver: (state, action: PayloadAction<BoardPosition>) => {
      state.hoveringOver = action.payload;
    },
    addTile: (state: BoardState, action: PayloadAction<BoardPosition>) => {
      state.tiles.push({
        pieceId: 1,
        ...action.payload,
      });
    },
  },
});

export const { setBoardDimensions, setPossiblePositions, setHoveringOver, addTile } = BoardSlice.actions;

export const useBoardData = () => useAppSelector((state) => state[STATE_KEY_BOARD]);

export const calculatePossiblePositions =
  (tileDims: Dimensions, boardDims: Dimensions) => (dispatch: AppDispatch, getState: () => RootState) => {
    const debug = boardToScreenPos(1, 0, tileDims, boardDims);
    dispatch(
      setPossiblePositions([
        { boardX: 0, boardY: 0 },
        { boardX: 0, boardY: 1 },
        { boardX: 1, boardY: 1 },
      ]),
    );
    dispatch(setDebugTilePosition({ x: debug.x, y: debug.y }));
  };

export const tilesUpdated =
  (position: BoardPosition): DispatchFunc =>
  (dispatch, getState) => {
    dispatch(addTile(position));
  };

export default BoardSlice.reducer;
