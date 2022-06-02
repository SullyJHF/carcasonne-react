import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerMap } from '../../server/sockets/models/PlayerManager';
import { useAppSelector } from './hooks';

interface UserState {
  users: PlayerMap;
}

const initialState: UserState = {
  users: {},
};

export const STATE_KEY_USERS = 'users';
const UserSlice = createSlice({
  name: STATE_KEY_USERS,
  initialState,
  reducers: {
    setUserList: (state: UserState, action: PayloadAction<PlayerMap>) => {
      state.users = action.payload;
    },
  },
});

export const { setUserList } = UserSlice.actions;

export const useUserData = () => useAppSelector((state) => state[STATE_KEY_USERS]);

export default UserSlice.reducer;
