import { ORIENTATION } from './../Store/TileSlice';
import { rotateMeepleOrientation } from './maths';
export const posToStyle = ({ x, y, w, h }) => ({
  left: `${x}px`,
  top: `${y}px`,
  width: `${w}px`,
  height: `${h}px`,
});

export const orientationToStyle = (orientation: ORIENTATION) => ({
  transform: `rotate(${orientation * 90}deg)`,
});

const buttonPosOffset = '75%';
export const meeplePositionToStyle = (meeplePosition: ORIENTATION, orientation: ORIENTATION) => {
  const rotatedOrientation = rotateMeepleOrientation(meeplePosition, orientation);
  switch (rotatedOrientation) {
    case ORIENTATION.NORTH:
      return {
        top: 0,
        left: '50%',
        transform: `translate(-50%, ${buttonPosOffset})`,
      };
    case ORIENTATION.SOUTH:
      return {
        bottom: 0,
        left: '50%',
        transform: `translate(-50%, -${buttonPosOffset})`,
      };
    case ORIENTATION.EAST:
      return {
        top: '50%',
        right: 0,
        transform: `translate(-${buttonPosOffset}, -50%)`,
      };
    case ORIENTATION.WEST:
      return {
        top: '50%',
        left: 0,
        transform: `translate(${buttonPosOffset}, -50%)`,
      };
  }
};
