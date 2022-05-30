import { ORIENTATION } from './../Store/TileSlice';
export const posToStyle = ({ x, y, w, h }, orientation: ORIENTATION = ORIENTATION.NORTH) => ({
  transform: `rotate(${orientation * 90}deg)`,
  left: `${x}px`,
  top: `${y}px`,
  width: `${w}px`,
  height: `${h}px`,
});
