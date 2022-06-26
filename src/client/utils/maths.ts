import { Dimensions } from '../Store/TileSlice';
import { ORIENTATION } from './../Store/TileSlice';

export const intersects = (
  x1: number,
  y1: number,
  w1: number,
  h1: number,

  x2: number,
  y2: number,
  w2: number,
  h2: number,
) => {
  const xx1 = x1 + w1;
  const yy1 = y1 + h1;

  const xx2 = x2 + w2;
  const yy2 = y2 + h2;

  if (x1 >= xx2 || x2 >= xx1) return false;
  if (y1 >= yy2 || y2 >= yy1) return false;
  return true;
};

export const tileToScreenPos = (boardX: number, boardY: number, tileDims: Dimensions, boardDims: Dimensions) => {
  const x = (boardDims.width || 1) / 2 - (tileDims.width || 1) / 2 + boardDims.xOffset + tileDims.width * boardX;
  const y = (boardDims.height || 1) / 2 - (tileDims.height || 1) / 2 + boardDims.yOffset + tileDims.height * boardY;
  const w = tileDims.width;
  const h = tileDims.height;
  return { x, y, w, h };
};

export const meepleToScreenPos = (
  boardX: number,
  boardY: number,
  meepleDims: Dimensions,
  tileDims: Dimensions,
  boardDims: Dimensions,
) => {
  let x = (boardDims.width || 1) / 2 - (tileDims.width || 1) / 2 + boardDims.xOffset + tileDims.width * boardX;
  let y = (boardDims.height || 1) / 2 - (tileDims.height || 1) / 2 + boardDims.yOffset + tileDims.height * boardY;
  x += (tileDims.width || 1) / 2 - (meepleDims.width || 1) / 2;
  y += (tileDims.height || 1) / 2 - (meepleDims.height || 1) / 2;
  const w = meepleDims.width;
  const h = meepleDims.height;
  return { x, y, w, h };
};

export const getCentre = (x, y, w, h) => ({ x: x + w / 2, y: y + h / 2 });

export const distance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

// This will need to change when doing more meeple positions
export const rotateMeepleOrientation = (orientation: ORIENTATION, rotateBy: ORIENTATION) =>
  (orientation + rotateBy) % 4;
