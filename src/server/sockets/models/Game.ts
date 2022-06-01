import console from 'console';
import { randomUUID } from 'crypto';
import { BoardPosition, PossiblePosition } from '../../../client/Store/BoardSlice';
import { ITile, ORIENTATION } from '../../../client/Store/TileSlice';
import { InitialAvailableTiles, TileEdgeMap, TileRotationTypeMap } from '../../../shared/constants/AvailableTiles';
import UserManager, { ConnectedUserMap } from './UserManager';

export class Game {
  id: string;
  players: ConnectedUserMap;

  tiles: ITile[];
  availableTiles: number[];
  currentTile: number;
  currentOrientingTile: ITile;

  possiblePositions: PossiblePosition[];

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

  private static getOrientedTileRotation(tileId: number, orientation: ORIENTATION) {
    const rotationMap: TileEdgeMap = [...TileRotationTypeMap[tileId]];
    for (let o = 0; o < orientation; o++) {
      rotationMap.unshift(rotationMap.pop());
    }
    return rotationMap;
  }

  private static canTileBePlaced(src: TileEdgeMap, dst: TileEdgeMap, direction: ORIENTATION) {
    /**
     * try placing {dst} tile in the square that is {direction} away from {src}
     */
    return src[direction] === dst[(direction + 2) % 4];
  }

  private calculatePossiblePositions(): PossiblePosition[] {
    if (!this.tiles.length) return [{ boardX: 0, boardY: 0, possibleOrientations: [0, 1, 2, 3] }];
    const potentialPlaces: PossiblePosition[] = [];
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
    const placesNotOnTiles = potentialPlaces.reduce((acc: PossiblePosition[], cur) => {
      const placedTile = this.tiles.find((tile) => tile.boardX === cur.boardX && tile.boardY === cur.boardY);
      const placedPlace = acc.find((place) => place.boardX === cur.boardX && place.boardY === cur.boardY);
      if (!placedTile && !placedPlace) {
        acc.push(cur);
      }
      return acc;
    }, []);

    const finalPlaces: PossiblePosition[] = [];

    for (const place of placesNotOnTiles) {
      const adjTiles = this.getAdjacentTiles(place);
      const placeableOrientations: ORIENTATION[] = [];
      for (let i = 0; i < 4; i++) {
        const checkThisOrientation = Game.getOrientedTileRotation(this.currentTile, i);
        let canPlaceThisRotation = true;
        for (const [index, tile] of adjTiles.entries()) {
          // index here is the same as ORIENTATIONS = [NORTH, EAST, SOUTH, WEST]
          if (!tile) continue;
          const adjTileRotation = Game.getOrientedTileRotation(tile.tileId, tile.orientation);
          const canPlaceHere = Game.canTileBePlaced(checkThisOrientation, adjTileRotation, index);

          canPlaceThisRotation = canPlaceThisRotation && canPlaceHere;
        }
        if (canPlaceThisRotation) placeableOrientations.push(i);
      }
      place.possibleOrientations = [...placeableOrientations];
      if (place.possibleOrientations.length > 0) {
        finalPlaces.push(place);
      }
    }

    return finalPlaces;
  }

  private getTile(boardX: number, boardY: number) {
    return this.tiles.find((tile) => tile.boardX === boardX && tile.boardY === boardY);
  }

  private getPossiblePosition(boardX: number, boardY: number) {
    return this.possiblePositions.find((position) => position.boardX === boardX && position.boardY === boardY);
  }

  private getAdjacentTiles(position: BoardPosition) {
    return [
      this.getTile(position.boardX, position.boardY - 1),
      this.getTile(position.boardX + 1, position.boardY),
      this.getTile(position.boardX, position.boardY + 1),
      this.getTile(position.boardX - 1, position.boardY),
    ];
  }

  private startOrientingTile(tile: BoardPosition) {
    const position = this.getPossiblePosition(tile.boardX, tile.boardY);
    const newTile = {
      ...tile,
      orientation: position.possibleOrientations[0],
      tileId: this.currentTile,
      possibleOrientations: position.possibleOrientations,
    };
    this.currentOrientingTile = newTile;
  }

  private addTile(tile: ITile) {
    this.tiles.push(tile);
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
    this.currentTile = null; //this.getRandomTile();
    this.possiblePositions = []; //this.calculatePossiblePositions();
  }

  onReorientTile(orientation: ORIENTATION) {
    this.currentOrientingTile.orientation = orientation;
  }

  onConfirmOrientation(orientation: ORIENTATION) {
    this.onReorientTile(orientation);
    this.addTile(this.currentOrientingTile);
    this.currentOrientingTile = null;
    this.currentTile = this.getRandomTile();
    this.possiblePositions = this.calculatePossiblePositions();
  }

  onCancelPlacement() {
    this.currentTile = this.currentOrientingTile.tileId;
    this.currentOrientingTile = null;
    this.possiblePositions = this.calculatePossiblePositions();
  }
  // #endregion
}
