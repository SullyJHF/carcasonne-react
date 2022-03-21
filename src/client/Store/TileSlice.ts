import { createSlice } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import { GAME_EVENTS } from '../../socketConstants';
import { useAppSelector } from './hooks';
import { AppDispatch } from './store';

interface TileState {
  test: boolean;
}

const initialState: TileState = {
  test: false,
};

export const STATE_KEY_TILES = 'tiles';
const TileSlice = createSlice({
  name: STATE_KEY_TILES,
  initialState,
  reducers: {
    // setUserList: (state, action: PayloadAction<ConnectedUserMap>) => {
    //   state.users = action.payload;
    // },
  },
});

// export const { setUserList } = TileSlice.actions;

export const useTileData = () => useAppSelector((state) => state[STATE_KEY_TILES]);

export const tilePlaced = (socket: Socket | null, x: number, y: number) => (dispatch: AppDispatch) => {
  socket?.emit(GAME_EVENTS.TILE_PLACED, { x, y });
};

export default TileSlice.reducer;
