import { configureStore } from '@reduxjs/toolkit';
import BoardSlice, { STATE_KEY_BOARD } from './BoardSlice';
import DebugSlice, { STATE_KEY_DEBUG_SLICE } from './DebugSlice';
import TileSlice, { STATE_KEY_TILES } from './TileSlice';
import UserSlice, { STATE_KEY_USERS } from './UserSlice';

const store = configureStore({
  reducer: {
    [STATE_KEY_USERS]: UserSlice,
    [STATE_KEY_TILES]: TileSlice,
    [STATE_KEY_BOARD]: BoardSlice,
    [STATE_KEY_DEBUG_SLICE]: DebugSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type DispatchFunc = (dispatch: AppDispatch, getState: () => RootState) => void;

export default store;
