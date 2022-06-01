import console from 'console';
import { randomUUID } from 'crypto';
import { BoardPosition } from '../../../client/Store/BoardSlice';
import { ITile, ORIENTATION } from '../../../client/Store/TileSlice';
import { InitialAvailableTiles } from '../../../shared/constants/AvailableTiles';
import { Board } from './Board';
import UserManager, { ConnectedUserMap } from './UserManager';

export class Game {
  id: string;
  players: ConnectedUserMap;

  board: Board;

  availableTiles: number[];
  currentTile: number;
  currentOrientingTile: ITile;

  constructor() {
    this.id = randomUUID();
    this.players = UserManager.getUsers();
    this.availableTiles = InitialAvailableTiles;
    this.currentTile = this.getRandomTile();

    this.board = new Board();
  }

  getGameData() {
    return this;
  }

  private startOrientingTile(tile: BoardPosition) {
    const position = this.board.getPossiblePosition(tile.boardX, tile.boardY);
    const newTile = {
      ...tile,
      orientation: position.possibleOrientations[0],
      tileId: this.currentTile,
      possibleOrientations: position.possibleOrientations,
    };
    this.currentOrientingTile = newTile;
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
    this.startOrientingTile(tile);
    this.currentTile = null;
    this.board.resetPossiblePositions();
  }

  onReorientTile(orientation: ORIENTATION) {
    this.currentOrientingTile.orientation = orientation;
  }

  onConfirmOrientation(orientation: ORIENTATION) {
    this.onReorientTile(orientation);
    this.board.addTile(this.currentOrientingTile);
    this.currentOrientingTile = null;
    this.currentTile = this.getRandomTile();
    this.board.calculatePossiblePositions(this.currentTile);
  }

  onCancelPlacement() {
    this.currentTile = this.currentOrientingTile.tileId;
    this.currentOrientingTile = null;
    this.board.calculatePossiblePositions(this.currentTile);
  }
  // #endregion
}
