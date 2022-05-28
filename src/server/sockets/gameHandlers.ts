import { Server, Socket } from 'socket.io';
import { BoardPosition } from '../../client/Store/BoardSlice';
import { GAME_EVENTS } from '../../shared/constants/socketConstants';
import { broadcast } from './sockets';

export const registerGameHandlers = (io: Server, socket: Socket): void => {
  const tilePlaced = ({ boardX, boardY }: BoardPosition) => {
    console.log(boardX, boardY);
    broadcast(socket, GAME_EVENTS.TILES_UPDATED, { boardX, boardY });
  };

  socket.on(GAME_EVENTS.TILE_PLACED, tilePlaced);
};
