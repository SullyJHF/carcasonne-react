import { Server, Socket } from 'socket.io';
import { BoardPosition } from '../../client/Store/BoardSlice';
import { GAME_EVENTS } from '../../shared/constants/socketConstants';
import GameManager from './models/GameManager';
import { emit } from './sockets';

export const registerGameHandlers = (io: Server, socket: Socket): void => {
  const tilePlaced = ({ boardX, boardY }: BoardPosition) => {
    GameManager.getGame('test').addTile({ boardX, boardY });
    console.log(`Tile placed! (${boardX}, ${boardY})`);
    emit(GAME_EVENTS.STATE_UPDATE, GameManager.getGame('test'));
  };

  socket.on(GAME_EVENTS.TILE_PLACED, tilePlaced);
};
