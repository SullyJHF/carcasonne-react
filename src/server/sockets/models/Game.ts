import { randomUUID } from 'crypto';
import { BoardPosition } from '../../../client/Store/BoardSlice';
import UserManager, { ConnectedUserMap } from './UserManager';

export class Game {
  id: string;
  possiblePositions: BoardPosition[];
  players: ConnectedUserMap;

  constructor() {
    this.id = randomUUID();
    this.possiblePositions = this.initialisePossiblePositions();
    this.players = UserManager.getUsers();
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
}
