import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerMap } from '../../server/sockets/models/PlayerManager';
import { useAppSelector } from './hooks';

interface UserState {
  users: PlayerMap;
  localUserId: string;
  currentPlayer: string;
}

const initialState: UserState = {
  users: {},
  localUserId: null,
  currentPlayer: null,
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
    setCurrentPlayer: (state: UserState, action: PayloadAction<string>) => {
      state.currentPlayer = action.payload;
    },
  },
});

export const { setUserList, setLocalUserId, setCurrentPlayer } = UserSlice.actions;

export const useUserData = () => useAppSelector((state) => state[STATE_KEY_USERS]);

export const useIsMyTurn = () =>
  useAppSelector((state) => state[STATE_KEY_USERS].currentPlayer === state[STATE_KEY_USERS].localUserId);

export default UserSlice.reducer;
