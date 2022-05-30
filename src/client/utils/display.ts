import { ORIENTATION } from './../Store/TileSlice';
export const posToStyle = ({ x, y, w, h }) => ({
  left: `${x}px`,
  top: `${y}px`,
  width: `${w}px`,
  height: `${h}px`,
});

export const orientationToStyle = (orientation: ORIENTATION) => ({
  transform: `rotate(${orientation * 90}deg)`,
});
