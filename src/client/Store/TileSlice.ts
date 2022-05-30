import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import { GAME_EVENTS } from '../../shared/constants/socketConstants';
import { BoardPosition, STATE_KEY_BOARD } from './BoardSlice';
import { useAppSelector } from './hooks';
import { DispatchFunc } from './store';

export enum ORIENTATION {
  NORTH = 0,
  EAST = 1,
  SOUTH = 2,
  WEST = 3,
}
export interface ITile extends BoardPosition {
  tileId: number;
  orientation: ORIENTATION;
}
export interface Dimensions {
  xOffset: number;
  yOffset: number;
  width: number;
  height: number;
}
interface TileState {
  test: boolean;
  dimensions: Dimensions;
  currentTile: number;
  currentOrientingTile: ITile;
}

const initialState: TileState = {
  test: false,
  dimensions: {
    xOffset: 0,
    yOffset: 0,
    width: 0,
    height: 0,
  },
  currentTile: null,
  currentOrientingTile: null,
};

export const STATE_KEY_TILES = 'tiles';
const TileSlice = createSlice({
  name: STATE_KEY_TILES,
  initialState,
  reducers: {
    setTileDimensions: (state: TileState, action: PayloadAction<Dimensions>) => {
      state.dimensions = action.payload;
    },
    setCurrentTile: (state: TileState, action: PayloadAction<number>) => {
      state.currentTile = action.payload;
    },
    setCurrentOrientingTile: (state: TileState, action: PayloadAction<ITile>) => {
      state.currentOrientingTile = action.payload;
    },
    updateOrientation: (state: TileState, action: PayloadAction<ORIENTATION>) => {
      state.currentOrientingTile.orientation = action.payload;
    },
  },
});

export const { setTileDimensions, setCurrentTile, setCurrentOrientingTile, updateOrientation } = TileSlice.actions;

export const useTileData = () => useAppSelector((state) => state[STATE_KEY_TILES]);

export const tilePlaced =
  (socket: Socket): DispatchFunc =>
  (dispatch, getState) => {
    const oldCurrentTile = getState()[STATE_KEY_TILES].currentTile;
    dispatch(setCurrentTile(null));
    const boardState = getState()[STATE_KEY_BOARD];
    const { hoveringOver } = boardState;
    if (hoveringOver) {
      const { boardX, boardY } = hoveringOver;
      socket?.emit(GAME_EVENTS.TILE_PLACED, { boardX, boardY });
    } else {
      dispatch(setCurrentTile(oldCurrentTile));
    }
  };

export const rotateOrientingTile =
  (socket: Socket, clockwise: boolean): DispatchFunc =>
  (dispatch, getState) => {
    const currentOrientingTile = getState()[STATE_KEY_TILES].currentOrientingTile;
    const l = Object.keys(ORIENTATION).length / 2; // for some reason length has to be divided by 2 - https://stackoverflow.com/questions/38034673/determine-the-number-of-enum-elements-typescript
    const curI = currentOrientingTile.orientation;
    const nextOrientation = clockwise ? (curI + 1) % l : (l + ((curI - 1) % l)) % l;
    dispatch(setCurrentOrientingTile({ ...currentOrientingTile, orientation: nextOrientation }));
    socket?.emit(GAME_EVENTS.REORIENT_TILE, nextOrientation);
  };

export const confirmOrientation =
  (socket: Socket): DispatchFunc =>
  (dispatch, getState) => {
    const currentOrientingTile = getState()[STATE_KEY_TILES].currentOrientingTile;
    socket?.emit(GAME_EVENTS.CONFIRM_ORIENTATION, currentOrientingTile.orientation);
    // const l = Object.keys(ORIENTATION).length / 2; // for some reason length has to be divided by 2 - https://stackoverflow.com/questions/38034673/determine-the-number-of-enum-elements-typescript
    // const curI = currentOrientingTile.orientation;
    // const nextOrientation = clockwise ? (curI + 1) % l : (l + ((curI - 1) % l)) % l;
    // dispatch(setCurrentOrientingTile({ ...currentOrientingTile, orientation: nextOrientation }));
    // socket?.emit(GAME_EVENTS.REORIENT_TILE, nextOrientation);
  };

export default TileSlice.reducer;
