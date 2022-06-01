import { BoardPosition, PossiblePosition } from '../../../client/Store/BoardSlice';
import { ITile, ORIENTATION } from '../../../client/Store/TileSlice';
import { TileEdgeMap, TileRotationTypeMap } from '../../../shared/constants/AvailableTiles';

export class Board {
  tiles: ITile[];
  possiblePositions: PossiblePosition[];

  constructor() {
    this.tiles = [];
    this.calculatePossiblePositions();
  }

  private getTile(boardX: number, boardY: number) {
    return this.tiles.find((tile) => tile.boardX === boardX && tile.boardY === boardY);
  }

  private getAdjacentTiles(position: BoardPosition) {
    return [
      this.getTile(position.boardX, position.boardY - 1),
      this.getTile(position.boardX + 1, position.boardY),
      this.getTile(position.boardX, position.boardY + 1),
      this.getTile(position.boardX - 1, position.boardY),
    ];
  }

  private static getOrientedTileRotation(tileId: number, orientation: ORIENTATION) {
    const rotationMap: TileEdgeMap = [...TileRotationTypeMap[tileId]];
    for (let o = 0; o < orientation; o++) {
      rotationMap.unshift(rotationMap.pop());
    }
    return rotationMap;
  }

  getPossiblePosition(boardX: number, boardY: number) {
    return this.possiblePositions.find((position) => position.boardX === boardX && position.boardY === boardY);
  }

  private static canTileBePlaced(src: TileEdgeMap, dst: TileEdgeMap, direction: ORIENTATION) {
    /**
     * try placing {dst} tile in the square that is {direction} away from {src}
     */
    return src[direction] === dst[(direction + 2) % 4];
  }

  calculatePossiblePositions(currentTileId?: number): void {
    if (!this.tiles.length || !currentTileId) {
      this.possiblePositions = [{ boardX: 0, boardY: 0, possibleOrientations: [0, 1, 2, 3] }];
      return;
    }
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
        const checkThisOrientation = Board.getOrientedTileRotation(currentTileId, i);
        let canPlaceThisRotation = true;
        for (const [index, tile] of adjTiles.entries()) {
          // index here is the same as ORIENTATIONS = [NORTH, EAST, SOUTH, WEST]
          if (!tile) continue;
          const adjTileRotation = Board.getOrientedTileRotation(tile.tileId, tile.orientation);
          const canPlaceHere = Board.canTileBePlaced(checkThisOrientation, adjTileRotation, index);

          canPlaceThisRotation = canPlaceThisRotation && canPlaceHere;
        }
        if (canPlaceThisRotation) placeableOrientations.push(i);
      }
      place.possibleOrientations = [...placeableOrientations];
      if (place.possibleOrientations.length > 0) {
        finalPlaces.push(place);
      }
    }

    this.possiblePositions = finalPlaces;
  }

  resetPossiblePositions(): void {
    this.possiblePositions = [];
  }

  addTile(tile: ITile) {
    this.tiles.push(tile);
  }
}
