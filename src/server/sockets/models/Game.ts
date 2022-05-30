import { randomUUID } from 'crypto';
import { BoardPosition } from '../../../client/Store/BoardSlice';
import { ITile, ORIENTATION } from '../../../client/Store/TileSlice';
import { InitialAvailableTiles } from '../../../shared/constants/AvailableTiles';
import UserManager, { ConnectedUserMap } from './UserManager';

export class Game {
  id: string;
  players: ConnectedUserMap;

  tiles: ITile[];
  availableTiles: number[];
  currentTile: number;
  currentOrientingTile: ITile;

  possiblePositions: BoardPosition[];

  constructor() {
    this.id = randomUUID();
    this.players = UserManager.getUsers();
    this.availableTiles = InitialAvailableTiles;
    this.tiles = [];
    this.currentTile = this.getRandomTile();
    this.possiblePositions = this.calculatePossiblePositions();
  }

  getGameData() {
    return this;
  }

  private calculatePossiblePositions(): BoardPosition[] {
    if (!this.tiles.length) return [{ boardX: 0, boardY: 0 }];
    const potentialPlaces = [];
    for (const tile of this.tiles) {
      const { boardX, boardY } = tile;
      const tempPlaces = [
        { boardX, boardY: boardY + 1 },
        { boardX: boardX + 1, boardY },
        { boardX, boardY: boardY - 1 },
        { boardX: boardX - 1, boardY },
      ];
      potentialPlaces.push(...tempPlaces);
    }
    const placesNotOnTiles = potentialPlaces.reduce((acc, cur) => {
      const placedTile = this.tiles.find((tile) => tile.boardX === cur.boardX && tile.boardY === cur.boardY);
      const placedPlace = acc.find((place) => place.boardX === cur.boardX && place.boardY === cur.boardY);
      if (!placedTile && !placedPlace) {
        acc.push(cur);
      }
      return acc;
    }, []);
    return placesNotOnTiles;
  }

  private addTile(tile: BoardPosition) {
    const newTile = { ...tile, orientation: ORIENTATION.NORTH, tileId: this.currentTile };
    this.currentOrientingTile = newTile;
    // this.tiles.push(newTile);
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
    this.currentTile = null; //this.getRandomTile();
    this.possiblePositions = []; //this.calculatePossiblePositions();
  }
  // #endregion
}
