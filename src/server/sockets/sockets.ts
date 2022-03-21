import http from 'http';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from '../../socketConstants';
import { registerGameHandlers } from './gameHandlers';
import { registerUserHandlers } from './userHandlers';

let io: Server;

export const initSocketIO = async (httpServer: http.Server) => {
  io = new Server(httpServer, { path: '/socket' });

  const onConnection = (socket: Socket) => {
    registerUserHandlers(io, socket);
    registerGameHandlers(io, socket);
  };

  io.on(SOCKET_EVENTS.CONNECTION, onConnection);
};

export const emit = (event: string, data: any, to = null) => {
  if (io == null) throw new Error('SocketIO must be initialised first!');

  if (to === null) io.emit(event, data);
  else io.to(to).emit(event, data);
};

export const broadcast = (socket: Socket, event: string, data: any, to: string | null = null) => {
  if (socket == null) throw new Error('SocketIO must be initialised first!');

  if (to === null) {
    console.log(`broadcasting to ${event}, ${data}`);
    socket.broadcast.emit(event, data);
  } else socket.broadcast.to(to).emit(event, data);
};

export const isIoInitialised = () => io != null;
