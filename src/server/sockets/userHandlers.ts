import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS, USER_EVENTS } from '../../shared/constants/socketConstants';
import ConnectedUsers from './models/UserManager';
import { emit } from './sockets';

export const registerUserHandlers = (io: Server, socket: Socket): void => {
  const userJoin = () => {
    ConnectedUsers.userConnected(socket.id);
    emit(USER_EVENTS.JOIN_GAME, ConnectedUsers.users);
  };
  const userLeave = () => {
    ConnectedUsers.userDisconnected(socket.id);
    emit(USER_EVENTS.JOIN_GAME, ConnectedUsers.users);
  };

  socket.on(USER_EVENTS.JOIN_GAME, userJoin);
  socket.on(SOCKET_EVENTS.DISCONNECT, userLeave);
};
