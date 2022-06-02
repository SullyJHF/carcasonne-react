import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerMap } from '../../server/sockets/models/PlayerManager';
import { useAppSelector } from './hooks';

interface UserState {
  users: PlayerMap;
  localUserId: string;
}

const initialState: UserState = {
  users: {},
  localUserId: null,
};

export const STATE_KEY_USERS = 'users';
const UserSlice = createSlice({
  name: STATE_KEY_USERS,
  initialState,
  reducers: {
    setUserList: (state: UserState, action: PayloadAction<PlayerMap>) => {
      state.users = action.payload;
    },
    setLocalUserId: (state: UserState, action: PayloadAction<string>) => {
      state.localUserId = action.payload;
    },
  },
});

export const { setUserList, setLocalUserId } = UserSlice.actions;

export const useUserData = () => useAppSelector((state) => state[STATE_KEY_USERS]);

export default UserSlice.reducer;
