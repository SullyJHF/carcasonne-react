import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConnectedUserMap } from './../../server/sockets/models/UserManager';
import { useAppSelector } from './hooks';

interface UserState {
  users: ConnectedUserMap;
}

const initialState: UserState = {
  users: {},
};

export const STATE_KEY_USERS = 'users';
const UserSlice = createSlice({
  name: STATE_KEY_USERS,
  initialState,
  reducers: {
    setUserList: (state, action: PayloadAction<ConnectedUserMap>) => {
      state.users = action.payload;
    },
  },
});

export const { setUserList } = UserSlice.actions;

export const useUsers = () => useAppSelector((state) => state[STATE_KEY_USERS]);

export default UserSlice.reducer;
