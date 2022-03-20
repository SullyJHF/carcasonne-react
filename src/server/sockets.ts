import http from 'http';
import { Server, Socket } from 'socket.io';

let io: Server;

export const SOCKET_EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
};

export const initSocketIO = async (httpServer: http.Server) => {
  console.log('initting socke tio');
  io = new Server(httpServer, { path:'/socket' });

  const onConnection = (socket: Socket) => {
    console.log('User connected!');

    socket.emit('test', 'hello!');
    socket.on('test', (data) => {console.log(data);});
  };

  io.on(SOCKET_EVENTS.CONNECTION, onConnection);
};

export const emit = (event: string, data: any, to = null) => {
  if (io == null) throw new Error('SocketIO must be initialised first!');

  if (to === null) io.emit(event, data);
  else io.to(to).emit(event, data);
};

export const broadcast = (socket: Socket, event: string, data: any, to = null) => {
  if (socket == null) throw new Error('SocketIO must be initialised first!');

  if (to === null) socket.broadcast.emit(event, data);
  else socket.broadcast.to(to).emit(event, data);
};

export const isIoInitialised = () => io != null;
