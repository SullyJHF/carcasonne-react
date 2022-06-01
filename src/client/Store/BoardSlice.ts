import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from './hooks';
import { Dimensions, ITile, ORIENTATION } from './TileSlice';

export interface PossiblePosition extends BoardPosition {
  possibleOrientations?: ORIENTATION[];
}

export interface BoardPosition {
  boardX: number;
  boardY: number;
}

interface BoardState {
  dimensions: Dimensions;
  tiles: ITile[];
  possiblePositions: PossiblePosition[];
  hoveringOver: BoardPosition;
  isDragging: boolean;
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
  isDragging: false,
};

export const STATE_KEY_BOARD = 'board';
const BoardSlice = createSlice({
  name: STATE_KEY_BOARD,
  initialState,
  reducers: {
    setBoardDimensions: (state: BoardState, action: PayloadAction<Dimensions>) => {
      state.dimensions = action.payload;
    },
    setPossiblePositions: (state: BoardState, action: PayloadAction<PossiblePosition[]>) => {
      state.possiblePositions = action.payload;
    },
    setIsDragging: (state: BoardState, action: PayloadAction<boolean>) => {
      state.isDragging = action.payload;
    },
    setTiles: (state: BoardState, action: PayloadAction<ITile[]>) => {
      state.tiles = action.payload;
    },
    setHoveringOver: (state: BoardState, action: PayloadAction<BoardPosition>) => {
      state.hoveringOver = action.payload;
    },
  },
});

export const { setBoardDimensions, setPossiblePositions, setHoveringOver, setTiles, setIsDragging } =
  BoardSlice.actions;

export const useBoardData = () => useAppSelector((state) => state[STATE_KEY_BOARD]);

export default BoardSlice.reducer;
