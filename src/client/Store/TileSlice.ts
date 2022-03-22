import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import { GAME_EVENTS } from '../../socketConstants';
import { useAppSelector } from './hooks';
import { AppDispatch } from './store';

export interface Tile {
  pieceId: number;
}
export interface Dimensions {
  width?: number;
  height?: number;
}
interface TileState {
  test: boolean;
  dimensions: Dimensions;
}

const initialState: TileState = {
  test: false,
  dimensions: {},
};

export const STATE_KEY_TILES = 'tiles';
const TileSlice = createSlice({
  name: STATE_KEY_TILES,
  initialState,
  reducers: {
    setTileDimensions: (state, action: PayloadAction<Dimensions>) => {
      state.dimensions = action.payload;
    },
  },
});

export const { setTileDimensions } = TileSlice.actions;

export const useTileData = () => useAppSelector((state) => state[STATE_KEY_TILES]);

export const tilePlaced = (socket: Socket | null, x: number, y: number) => (dispatch: AppDispatch) => {
  socket?.emit(GAME_EVENTS.TILE_PLACED, { x, y });
};

export default TileSlice.reducer;
