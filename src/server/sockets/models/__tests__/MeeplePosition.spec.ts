import { ORIENTATION } from '../../../../client/Store/TileSlice';
import { Game } from '../Game';

describe('Meeple Tests', () => {
  describe('Calculating meeple position tests', () => {
    it('Gets the naive road positions for various tiles', () => {
      let roadMeeplePositions = Game.calculateRoadMeeplePositions(2);
      expect(roadMeeplePositions).toEqual([ORIENTATION.SOUTH]);

      roadMeeplePositions = Game.calculateRoadMeeplePositions(6);
      expect(roadMeeplePositions).toEqual([ORIENTATION.SOUTH]);

      roadMeeplePositions = Game.calculateRoadMeeplePositions(11);
      expect(roadMeeplePositions).toEqual([ORIENTATION.SOUTH]); // or EAST

      roadMeeplePositions = Game.calculateRoadMeeplePositions(19);
      expect(roadMeeplePositions.sort()).toEqual([ORIENTATION.SOUTH, ORIENTATION.WEST, ORIENTATION.EAST].sort());

      roadMeeplePositions = Game.calculateRoadMeeplePositions(21);
      expect(roadMeeplePositions).toEqual([ORIENTATION.NORTH]);
    });
    it('Gets the naive city positions for various tiles', () => {
      let cityMeeplePositions = Game.calculateCityMeeplePositions(2);
      expect(cityMeeplePositions).toEqual([]);

      cityMeeplePositions = Game.calculateCityMeeplePositions(6);
      expect(cityMeeplePositions).toEqual([ORIENTATION.WEST]);

      cityMeeplePositions = Game.calculateCityMeeplePositions(11);
      expect(cityMeeplePositions).toEqual([ORIENTATION.WEST]); // or EAST

      cityMeeplePositions = Game.calculateCityMeeplePositions(19);
      expect(cityMeeplePositions).toEqual([ORIENTATION.NORTH]);

      cityMeeplePositions = Game.calculateCityMeeplePositions(21);
      expect(cityMeeplePositions).toEqual([]);

      cityMeeplePositions = Game.calculateCityMeeplePositions(15);
      expect(cityMeeplePositions).toEqual([ORIENTATION.NORTH, ORIENTATION.SOUTH]);

      cityMeeplePositions = Game.calculateCityMeeplePositions(14);
      expect(cityMeeplePositions).toEqual([ORIENTATION.WEST, ORIENTATION.NORTH]);
    });
    it('Gets the naive meeple positions for various tiles', () => {
      let meeplePositions = Game.calculateMeeplePositions(2);
      expect(meeplePositions).toEqual({ roads: [ORIENTATION.SOUTH], cities: [] });

      meeplePositions = Game.calculateMeeplePositions(6);
      expect(meeplePositions).toEqual({ roads: [ORIENTATION.SOUTH], cities: [ORIENTATION.WEST] });

      meeplePositions = Game.calculateMeeplePositions(11);
      expect(meeplePositions).toEqual({ roads: [ORIENTATION.SOUTH], cities: [ORIENTATION.WEST] }); // or EAST

      meeplePositions = Game.calculateMeeplePositions(19);
      expect(meeplePositions).toEqual({
        roads: [ORIENTATION.WEST, ORIENTATION.SOUTH, ORIENTATION.EAST],
        cities: [ORIENTATION.NORTH],
      });

      meeplePositions = Game.calculateMeeplePositions(21);
      expect(meeplePositions).toEqual({ roads: [ORIENTATION.NORTH], cities: [] });

      meeplePositions = Game.calculateMeeplePositions(15);
      expect(meeplePositions).toEqual({ roads: [], cities: [ORIENTATION.NORTH, ORIENTATION.SOUTH] });

      meeplePositions = Game.calculateMeeplePositions(14);
      expect(meeplePositions).toEqual({ roads: [], cities: [ORIENTATION.WEST, ORIENTATION.NORTH] });
    });
  });
});
