import { Server, Socket } from 'socket.io';
import { GAME_EVENTS } from '../../shared/constants/socketConstants';
import { TilePosition } from '../../shared/types/Tile.types';
import { broadcast } from './sockets';

export const registerGameHandlers = (io: Server, socket: Socket): void => {
  const tilePlaced = ({ x, y }: TilePosition) => {
    console.log(x, y);
    broadcast(socket, GAME_EVENTS.TILES_UPDATED, { x, y });
  };

  socket.on(GAME_EVENTS.TILE_PLACED, tilePlaced);
};
