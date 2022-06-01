// prettier-ignore
export const InitialAvailableTiles = [
  1, 1, 1, 1,
  2, 2,
  3,
  4, 4, 4,
  5,
  6,
  7, 7,
  8, 8, 8,
  9, 9,
  10, 10, 10,
  11, 11,
  12,
  13, 13,
  14, 14,
  15, 15, 15,
  16, 16, 16, 16, 16,
  17, 17, 17,
  18, 18, 18,
  19, 19, 19,
  20, 20, 20,
  21, 21, 21, 21, 21, 21, 21, 21,
  22, 22, 22, 22, 22, 22, 22, 22, 22,
  23, 23, 23, 23,
  24,
];

export enum TileEdges {
  FIELD = 0,
  ROAD = 1,
  CITY = 2,
}

export type TileEdgeMap = [TileEdges, TileEdges, TileEdges, TileEdges];
// top, right, bottom, left
export const TileRotationTypeMap: {
  [id: number]: TileEdgeMap;
} = {
  1: [TileEdges.FIELD, TileEdges.FIELD, TileEdges.FIELD, TileEdges.FIELD],
  2: [TileEdges.FIELD, TileEdges.FIELD, TileEdges.ROAD, TileEdges.FIELD],
  3: [TileEdges.CITY, TileEdges.CITY, TileEdges.CITY, TileEdges.CITY],
  4: [TileEdges.CITY, TileEdges.CITY, TileEdges.FIELD, TileEdges.CITY],
  5: [TileEdges.CITY, TileEdges.CITY, TileEdges.FIELD, TileEdges.CITY],
  6: [TileEdges.CITY, TileEdges.CITY, TileEdges.ROAD, TileEdges.CITY],
  7: [TileEdges.CITY, TileEdges.CITY, TileEdges.ROAD, TileEdges.CITY],
  8: [TileEdges.CITY, TileEdges.FIELD, TileEdges.FIELD, TileEdges.CITY],
  9: [TileEdges.CITY, TileEdges.FIELD, TileEdges.FIELD, TileEdges.CITY],
  10: [TileEdges.CITY, TileEdges.ROAD, TileEdges.ROAD, TileEdges.CITY],
  11: [TileEdges.CITY, TileEdges.ROAD, TileEdges.ROAD, TileEdges.CITY],
  12: [TileEdges.FIELD, TileEdges.CITY, TileEdges.FIELD, TileEdges.CITY],
  13: [TileEdges.FIELD, TileEdges.CITY, TileEdges.FIELD, TileEdges.CITY],
  14: [TileEdges.CITY, TileEdges.FIELD, TileEdges.FIELD, TileEdges.CITY],
  15: [TileEdges.CITY, TileEdges.FIELD, TileEdges.CITY, TileEdges.FIELD],
  16: [TileEdges.CITY, TileEdges.FIELD, TileEdges.FIELD, TileEdges.FIELD],
  17: [TileEdges.CITY, TileEdges.FIELD, TileEdges.ROAD, TileEdges.ROAD],
  18: [TileEdges.CITY, TileEdges.ROAD, TileEdges.ROAD, TileEdges.FIELD],
  19: [TileEdges.CITY, TileEdges.ROAD, TileEdges.ROAD, TileEdges.ROAD],
  20: [TileEdges.CITY, TileEdges.ROAD, TileEdges.FIELD, TileEdges.ROAD],
  21: [TileEdges.ROAD, TileEdges.FIELD, TileEdges.ROAD, TileEdges.FIELD],
  22: [TileEdges.FIELD, TileEdges.FIELD, TileEdges.ROAD, TileEdges.ROAD],
  23: [TileEdges.FIELD, TileEdges.ROAD, TileEdges.ROAD, TileEdges.ROAD],
  24: [TileEdges.ROAD, TileEdges.ROAD, TileEdges.ROAD, TileEdges.ROAD],
};
