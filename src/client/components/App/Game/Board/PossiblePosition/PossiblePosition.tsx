import React from 'react';
import { BoardPosition, useBoardData } from '../../../../../Store/BoardSlice';
import { useTileData } from '../../../../../Store/TileSlice';
import { posToStyle } from '../../../../../utils/display';
import { boardToScreenPos } from '../../../../../utils/maths';
import './possible-position.scss';

export const PossiblePosition = ({ boardX, boardY }: BoardPosition & { key: string }) => {
  const { dimensions: tileDims } = useTileData();
  const { dimensions: boardDims, hoveringOver, isDragging } = useBoardData();
  const hovering = hoveringOver && hoveringOver.boardX === boardX && hoveringOver.boardY === boardY;
  const className = `possible-position ${hovering ? 'hovering' : ''} ${isDragging ? 'dragging' : ''}`;
  const pos = boardToScreenPos(boardX, boardY, tileDims, boardDims);
  const styleObj = posToStyle(pos);
  return <div className={className} style={styleObj} />;
};
