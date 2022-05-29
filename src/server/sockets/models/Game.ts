import { randomUUID } from 'crypto';
import { BoardPosition } from '../../../client/Store/BoardSlice';
import { ITile } from '../../../client/Store/TileSlice';
import UserManager, { ConnectedUserMap } from './UserManager';

export class Game {
  id: string;
  possiblePositions: BoardPosition[];
  players: ConnectedUserMap;
  tiles: ITile[];

  constructor() {
    this.id = randomUUID();
    this.possiblePositions = this.initialisePossiblePositions();
    this.players = UserManager.getUsers();
    this.tiles = [];
    console.log(`Game created: ${this.id}`);
  }

  getGameData() {
    return this;
  }

  private initialisePossiblePositions(): BoardPosition[] {
    return [
      { boardX: 0, boardY: 0 },
      { boardX: 1, boardY: 3 },
      { boardX: 3, boardY: 2 },
    ];
  }

  addTile(tile: BoardPosition) {
    const pieceId = 1; // currentPieceId
    this.tiles.push({ ...tile, pieceId });
  }
}
