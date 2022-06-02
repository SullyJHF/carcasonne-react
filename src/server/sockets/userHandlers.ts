import { Server, Socket } from 'socket.io';
import { GAME_EVENTS, SOCKET_EVENTS, USER_EVENTS } from '../../shared/constants/socketConstants';
import GameManager from './models/GameManager';
import ConnectedUsers from './models/UserManager';
import { emit } from './sockets';

export const registerUserHandlers = (io: Server, socket: Socket): void => {
  const userJoin = (userId: string) => {
    const user = ConnectedUsers.userConnected(userId, socket.id);
    GameManager.getGame('test').playerManager.addPlayer(user);
    emit(GAME_EVENTS.STATE_UPDATE, GameManager.getGame('test'));
  };
  const userLeave = () => {
    const user = ConnectedUsers.userDisconnected(socket.id);
    GameManager.getGame('test').playerManager.removePlayer(user);
    emit(GAME_EVENTS.STATE_UPDATE, GameManager.getGame('test'));
  };

  socket.on(USER_EVENTS.JOIN_GAME, userJoin);
  socket.on(SOCKET_EVENTS.DISCONNECT, userLeave);
};
