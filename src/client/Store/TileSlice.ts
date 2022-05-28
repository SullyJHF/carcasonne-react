import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import { GAME_EVENTS } from '../../shared/constants/socketConstants';
import { BoardPosition, STATE_KEY_BOARD } from './BoardSlice';
import { useAppSelector } from './hooks';
import { DispatchFunc } from './store';

export interface ITile extends BoardPosition {
  pieceId: number;
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
}

const initialState: TileState = {
  test: false,
  dimensions: {
    xOffset: 0,
    yOffset: 0,
    width: 0,
    height: 0,
  },
};

export const STATE_KEY_TILES = 'tiles';
const TileSlice = createSlice({
  name: STATE_KEY_TILES,
  initialState,
  reducers: {
    setTileDimensions: (state: TileState, action: PayloadAction<Dimensions>) => {
      state.dimensions = action.payload;
    },
  },
});

export const { setTileDimensions } = TileSlice.actions;

export const useTileData = () => useAppSelector((state) => state[STATE_KEY_TILES]);

export const tilePlaced =
  (socket: Socket): DispatchFunc =>
  (dispatch, getState) => {
    const boardState = getState()[STATE_KEY_BOARD];
    const { hoveringOver } = boardState;
    if (hoveringOver) {
      const { boardX, boardY } = hoveringOver;
      socket?.emit(GAME_EVENTS.TILE_PLACED, { boardX, boardY });
    }
  };

export default TileSlice.reducer;
