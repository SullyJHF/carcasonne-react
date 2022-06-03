import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import { Meeple, PlayerMap } from '../../server/sockets/models/PlayerManager';
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

export const useAllMeeple = () =>
  useAppSelector(
    (state) =>
      Object.keys(state[STATE_KEY_USERS].users).reduce((acc, userId) => {
        const user = state[STATE_KEY_USERS].users[userId];
        return [...acc, ...user.meeple];
      }, []) as Meeple[],
  );

export const useIsMyTurn = () =>
  useAppSelector((state) => state[STATE_KEY_USERS].currentPlayer === state[STATE_KEY_USERS].localUserId);

export const useMe = () => useAppSelector((state) => state[STATE_KEY_USERS].users[state[STATE_KEY_USERS].localUserId]);
export const useCanPlaceMeeple = () => {
  const me = useMe();
  if (!me) return false;
  const availableMeeple = me.meeple.filter((meeple) => !meeple.placedOnTile);
  const currentlyPlacingMeeple = me.meeple.find((meeple) => meeple.placedOnTile && !meeple.confirmed);
  // if (currentlyPlacingMeeple) return false;
  return availableMeeple.length && !currentlyPlacingMeeple;
};

export const placeMeeple =
  (socket: Socket, position: BoardPosition): DispatchFunc =>
  (dispatch, getState) => {
    socket?.emit(GAME_EVENTS.PLACE_MEEPLE, position);
  };

export default UserSlice.reducer;
