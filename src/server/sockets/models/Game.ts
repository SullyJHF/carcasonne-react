import console from 'console';
import { randomUUID } from 'crypto';
import { BoardPosition } from '../../../client/Store/BoardSlice';
import { ITile, ORIENTATION } from '../../../client/Store/TileSlice';
import { CityConnectionMap, InitialAvailableTiles, RoadConnectionMap } from '../../../shared/constants/AvailableTiles';
import { MeeplePositions } from './../../../client/Store/MeepleSlice';
import { Board } from './Board';
import { PlayerManager } from './PlayerManager';

export class Game {
  id: string;
  playerManager: PlayerManager;

  board: Board;

  availableTiles: number[];
  currentTile: number;
  currentOrientingTile: ITile;

  constructor() {
    this.id = randomUUID();
    this.playerManager = new PlayerManager();

    this.availableTiles = InitialAvailableTiles;
    this.currentTile = this.getRandomTile();

    this.board = new Board();
  }

  getGameData() {
    return this;
  }

  static calculateCityMeeplePositions(tileId: number) {
    const positions = [];
    for (const cityConnection of CityConnectionMap[tileId]) {
      // might need to work out the average position if there are multiple in this array
      // that will occur when a city connects across or between two areas
      positions.push(cityConnection[0]);
    }
    return positions;
  }

  static calculateRoadMeeplePositions(tileId: number): ORIENTATION[] {
    const positions = [];
    for (const roadConnection of RoadConnectionMap[tileId]) {
      positions.push(roadConnection[0]);
    }
    return positions;
  }

  static calculateMeeplePositions(tileId: number): MeeplePositions {
    // this will eventually calculate whether someone else is on a road/city etc.
    // but for now just returning the naïve possible positions
    const roads = Game.calculateRoadMeeplePositions(tileId);
    const cities = Game.calculateCityMeeplePositions(tileId);
    return { roads, cities };
  }

  private startOrientingTile(tile: BoardPosition) {
    const position = this.board.getPossiblePosition(tile.boardX, tile.boardY);
    const possibleMeeplePositions = Game.calculateMeeplePositions(this.currentTile);
    const newTile = {
      ...tile,
      orientation: position.possibleOrientations[0],
      tileId: this.currentTile,
      possibleOrientations: position.possibleOrientations,
      possibleMeeplePositions,
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
    this.playerManager.nextPlayer();
  }

  onCancelPlacement() {
    this.currentTile = this.currentOrientingTile.tileId;
    this.currentOrientingTile = null;
    this.board.calculatePossiblePositions(this.currentTile);
    this.playerManager.cancelPlacedMeeple();
  }

  onMeeplePlaced(position: BoardPosition) {
    this.playerManager.placeMeeple(position);
  }
  // #endregion
}
