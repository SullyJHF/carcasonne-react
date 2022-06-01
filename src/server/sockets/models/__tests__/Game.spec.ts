import { ORIENTATION } from '../../../../client/Store/TileSlice';
import { Game } from '../Game';

describe('Game Tests', () => {
  describe('Placing tiles', () => {
    it("Doesn't allow placing incorrect tiles 1", () => {
      // 17: [TileEdges.CITY, TileEdges.FIELD, TileEdges.ROAD, TileEdges.ROAD],
      // 12: [TileEdges.FIELD, TileEdges.CITY, TileEdges.FIELD, TileEdges.CITY],
      const src = Game['getOrientedTileRotation'](17, 0);
      const dst = Game['getOrientedTileRotation'](12, 0);
      expect(Game['canTileBePlaced'](src, dst, ORIENTATION.NORTH)).toBe(false);
      expect(Game['canTileBePlaced'](src, dst, ORIENTATION.EAST)).toBe(false);
      expect(Game['canTileBePlaced'](src, dst, ORIENTATION.SOUTH)).toBe(false);
      expect(Game['canTileBePlaced'](src, dst, ORIENTATION.WEST)).toBe(false);
    });
    it('Allows placing correct tiles 1', () => {
      // 17: [TileEdges.CITY, TileEdges.FIELD, TileEdges.ROAD, TileEdges.ROAD],
      // 12: [TileEdges.FIELD, TileEdges.CITY, TileEdges.FIELD, TileEdges.CITY],
      const src = Game['getOrientedTileRotation'](17, 0);
      const dst = Game['getOrientedTileRotation'](12, 1);
      expect(Game['canTileBePlaced'](src, dst, ORIENTATION.NORTH)).toBe(true);
      expect(Game['canTileBePlaced'](src, dst, ORIENTATION.EAST)).toBe(true);
      expect(Game['canTileBePlaced'](src, dst, ORIENTATION.SOUTH)).toBe(false);
      expect(Game['canTileBePlaced'](src, dst, ORIENTATION.WEST)).toBe(false);
    });
    it('Allows placing correct tiles 2', () => {
      // 17: [TileEdges.CITY, TileEdges.FIELD, TileEdges.ROAD, TileEdges.ROAD],
      // 12: [TileEdges.FIELD, TileEdges.CITY, TileEdges.FIELD, TileEdges.CITY],
      const src = Game['getOrientedTileRotation'](12, 0);
      const dst = Game['getOrientedTileRotation'](17, 1);
      expect(Game['canTileBePlaced'](src, dst, ORIENTATION.NORTH)).toBe(true);
      expect(Game['canTileBePlaced'](src, dst, ORIENTATION.EAST)).toBe(false);
      expect(Game['canTileBePlaced'](src, dst, ORIENTATION.SOUTH)).toBe(false);
      expect(Game['canTileBePlaced'](src, dst, ORIENTATION.WEST)).toBe(true);
    });
  });
  describe('Calculating possible positions', () => {
    it('Gets the correct possible position for an unrotated tile', () => {
      const game = new Game();
      // 17: [TileEdges.CITY, TileEdges.FIELD, TileEdges.ROAD, TileEdges.ROAD],
      game.currentTile = 17;
      // 24: [TileEdges.ROAD, TileEdges.ROAD, TileEdges.ROAD, TileEdges.ROAD],
      game.tiles = [{ boardX: 0, boardY: 0, tileId: 24, orientation: ORIENTATION.NORTH }];
      const positions = game['calculatePossiblePositions']();
      expect(positions).toEqual([
        {
          boardX: 0,
          boardY: 1,
          possibleOrientations: [1, 2],
        },
        {
          boardX: 1,
          boardY: 0,
          possibleOrientations: [0, 1],
        },
        {
          boardX: 0,
          boardY: -1,
          possibleOrientations: [0, 3],
        },
        {
          boardX: -1,
          boardY: 0,
          possibleOrientations: [2, 3],
        },
      ]);
    });
    it('Gets the correct possible position for another unrotated tile', () => {
      const game = new Game();
      // 17: [TileEdges.CITY, TileEdges.FIELD, TileEdges.ROAD, TileEdges.ROAD],
      game.currentTile = 17;
      // 12: [TileEdges.FIELD, TileEdges.CITY, TileEdges.FIELD, TileEdges.CITY],
      game.tiles = [{ boardX: 0, boardY: 0, tileId: 12, orientation: ORIENTATION.NORTH }];
      const positions = game['calculatePossiblePositions']();
      expect(positions).toEqual([
        { boardX: 0, boardY: 1, possibleOrientations: [3] },
        { boardX: 1, boardY: 0, possibleOrientations: [3] },
        { boardX: 0, boardY: -1, possibleOrientations: [1] },
        { boardX: -1, boardY: 0, possibleOrientations: [1] },
      ]);
    });
  });
});
