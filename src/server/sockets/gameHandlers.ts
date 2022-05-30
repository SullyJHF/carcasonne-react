import { Server, Socket } from 'socket.io';
import { BoardPosition } from '../../client/Store/BoardSlice';
import { ORIENTATION } from '../../client/Store/TileSlice';
import { GAME_EVENTS } from '../../shared/constants/socketConstants';
import GameManager from './models/GameManager';
import { broadcast, emit } from './sockets';

export const registerGameHandlers = (io: Server, socket: Socket): void => {
  const tilePlaced = ({ boardX, boardY }: BoardPosition) => {
    console.log(`Tile placed! (${boardX}, ${boardY})`);
    GameManager.getGame('test').onTilePlaced({ boardX, boardY });
    emit(GAME_EVENTS.STATE_UPDATE, GameManager.getGame('test'));
  };

  const reorientTile = (orientation: ORIENTATION) => {
    console.log(`Tile reorientation received: ${orientation}`);
    GameManager.getGame('test').onReorientTile(orientation);
    broadcast(socket, GAME_EVENTS.REORIENT_TILE, orientation);
  };
  const confirmOrientation = (orientation: ORIENTATION) => {
    console.log(`Tile reorientation confirmed: ${orientation}`);
    GameManager.getGame('test').onConfirmOrientation(orientation);
    emit(GAME_EVENTS.STATE_UPDATE, GameManager.getGame('test'));
  };

  socket.on(GAME_EVENTS.TILE_PLACED, tilePlaced);
  socket.on(GAME_EVENTS.REORIENT_TILE, reorientTile);
  socket.on(GAME_EVENTS.CONFIRM_ORIENTATION, confirmOrientation);
};
