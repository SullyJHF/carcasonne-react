import React from 'react';
import { BoardPosition, useBoardData } from '../../../../../Store/BoardSlice';
import { useTileData } from '../../../../../Store/TileSlice';
import { boardToScreenPos } from '../../../../../utils/maths';
import './possible-position.scss';

export const PossiblePosition = ({ boardX, boardY }: BoardPosition) => {
  const { dimensions: tileDims } = useTileData();
  const { dimensions: boardDims, hoveringOver } = useBoardData();
  const hovering = hoveringOver && hoveringOver.boardX === boardX && hoveringOver.boardY === boardY;
  const className = `possible-position ${hovering ? 'hovering' : ''}`;
  const { x, y, w, h } = boardToScreenPos(boardX, boardY, tileDims, boardDims);
  const styleObj = {
    left: `${x}px`,
    top: `${y}px`,
    width: `${w}px`,
    height: `${h}px`,
  };
  return (
    <div className={className} style={styleObj}>
      hello
    </div>
  );
};
