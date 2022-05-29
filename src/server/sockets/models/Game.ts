import { randomUUID } from 'crypto';
import { BoardPosition } from '../../../client/Store/BoardSlice';
import { ITile } from '../../../client/Store/TileSlice';
import { InitialAvailableTiles } from '../../../shared/constants/AvailableTiles';
import UserManager, { ConnectedUserMap } from './UserManager';

export class Game {
  id: string;
  players: ConnectedUserMap;

  tiles: ITile[];
  availableTiles: number[];
  currentTile: number;

  possiblePositions: BoardPosition[];

  constructor() {
    this.id = randomUUID();
    this.possiblePositions = this.initialisePossiblePositions();
    this.players = UserManager.getUsers();
    this.tiles = [];
    this.availableTiles = InitialAvailableTiles;
    this.currentTile = this.getRandomTile();
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

  private addTile(tile: BoardPosition) {
    this.tiles.push({ ...tile, tileId: this.currentTile });
  }

  getRandomTile(): number {
    if (!this.availableTiles.length) {
      console.log('No tiles left!');
      return -1;
    }

    const randIndex = Math.floor(Math.random() * this.availableTiles.length);
    const [tileId] = this.availableTiles.splice(randIndex, 1);
    return tileId;
  }

  // #region Socket handlers
  onTilePlaced(tile: BoardPosition) {
    this.addTile(tile);
    this.currentTile = this.getRandomTile();
  }
  // #endregion
}
