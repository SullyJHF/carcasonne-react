import { randomUUID } from 'crypto';
import { BoardPosition } from '../../../client/Store/BoardSlice';

export class Game {
  id: string;
  possiblePositions: BoardPosition[];

  constructor() {
    this.id = randomUUID();
    this.possiblePositions = this.initialisePossiblePositions();
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
