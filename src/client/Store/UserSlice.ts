import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import { PlayerMap } from '../../server/sockets/models/PlayerManager';
import { GAME_EVENTS } from '../../shared/constants/socketConstants';
import { BoardPosition } from './BoardSlice';
import { useAppSelector } from './hooks';
import { DispatchFunc } from './store';

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

export const useMe = () => useAppSelector((state) => state[STATE_KEY_USERS].users[state[STATE_KEY_USERS].localUserId]);
export const useAvailableMeeple = () => {
  const me = useMe();
  if (!me) return [];
  return me.meeple.filter((meeple) => !meeple.placedOnTile);
};

export const placeMeeple =
  (socket: Socket, position: BoardPosition): DispatchFunc =>
  (dispatch, getState) => {
    socket?.emit(GAME_EVENTS.PLACE_MEEPLE, position);
  };

export default UserSlice.reducer;
