import { configureStore } from '@reduxjs/toolkit';
import UserSlice, { STATE_KEY_USERS } from './UserSlice';

const store = configureStore({
  reducer: {
    [STATE_KEY_USERS]: UserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
