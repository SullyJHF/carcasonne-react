import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import { GAME_EVENTS } from '../../shared/constants/socketConstants';
import { PossiblePosition, setHoveringOver, STATE_KEY_BOARD } from './BoardSlice';
import { useAppSelector } from './hooks';
import { DispatchFunc } from './store';

export enum ORIENTATION {
  NORTH = 0,
  EAST = 1,
  SOUTH = 2,
  WEST = 3,
}
export interface ITile extends PossiblePosition {
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
    dispatch(setHoveringOver(null));
  };

export const rotateOrientingTile =
  (socket: Socket, clockwise: boolean): DispatchFunc =>
  (dispatch, getState) => {
    const currentOrientingTile = getState()[STATE_KEY_TILES].currentOrientingTile;
    const { possibleOrientations, orientation } = currentOrientingTile;
    const l = possibleOrientations.length;
    if (l === 1) return;

    const orientationIndex = possibleOrientations.indexOf(orientation);
    const nextOrientationIndex = clockwise ? (orientationIndex + 1) % l : (l + ((orientationIndex - 1) % l)) % l;
    const nextOrientation = possibleOrientations[nextOrientationIndex];
    dispatch(setCurrentOrientingTile({ ...currentOrientingTile, orientation: nextOrientation }));
    socket?.emit(GAME_EVENTS.REORIENT_TILE, nextOrientation);
  };

export const confirmOrientation =
  (socket: Socket): DispatchFunc =>
  (dispatch, getState) => {
    const currentOrientingTile = getState()[STATE_KEY_TILES].currentOrientingTile;
    socket?.emit(GAME_EVENTS.CONFIRM_ORIENTATION, currentOrientingTile.orientation);
  };
export const cancelTilePlacement =
  (socket: Socket): DispatchFunc =>
  (dispatch, getState) => {
    const currentOrientingTile = getState()[STATE_KEY_TILES].currentOrientingTile;
    dispatch(setCurrentTile(currentOrientingTile.tileId));
    dispatch(setCurrentOrientingTile(null));
    socket?.emit(GAME_EVENTS.CANCEL_PLACEMENT);
  };

export default TileSlice.reducer;
