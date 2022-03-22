import React from 'react';
import { useBoardData } from '../../../../../Store/BoardSlice';
import { useTileData } from '../../../../../Store/TileSlice';
import './possible-position.scss';

interface PossiblePositionProps {
  x: number;
  y: number;
}
export const PossiblePosition = ({ x, y }: PossiblePositionProps) => {
  const { dimensions: tileDims } = useTileData();
  const { dimensions: boardDims } = useBoardData();
  return (
    <div
      className="possible-position"
      style={{
        left: `${(boardDims.width || 1) / 2 - (tileDims.width || 1) / 2}px`,
        top: `${(boardDims.height || 1) / 2 - (tileDims.height || 1) / 2}px`,
        width: tileDims.width,
        height: tileDims.height,
      }}
    >
      hello
    </div>
  );
};
