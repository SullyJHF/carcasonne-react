import React from 'react';
import { BoardPosition, useBoardData } from '../../../../../Store/BoardSlice';
import { useTileData } from '../../../../../Store/TileSlice';
import './possible-position.scss';

export const PossiblePosition = ({ boardX, boardY }: BoardPosition) => {
  const { dimensions: tileDims } = useTileData();
  const { dimensions: boardDims, hoveringOver } = useBoardData();
  const hovering = hoveringOver && hoveringOver.boardX === boardX && hoveringOver.boardY === boardY;
  const className = `possible-position ${hovering ? 'hovering' : ''}`;
  const styleObj = {
    left: `${(boardDims.width || 1) / 2 - (tileDims.width || 1) / 2}px`,
    top: `${(boardDims.height || 1) / 2 - (tileDims.height || 1) / 2}px`,
    width: tileDims.width,
    height: tileDims.height,
  };
  return (
    <div className={className} style={styleObj}>
      hello
    </div>
  );
};
