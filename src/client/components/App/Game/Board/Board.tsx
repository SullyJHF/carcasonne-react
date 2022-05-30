import React, { useEffect } from 'react';
import { setBoardDimensions, useBoardData } from '../../../../Store/BoardSlice';
import { useAppDispatch } from '../../../../Store/hooks';
import useDimensions from '../../../../utils/hooks';
import { PlacedTile } from '../Tile/Tile';
import './board.scss';
import { useBoardEffects } from './boardEffects';
import { PossiblePosition } from './PossiblePosition/PossiblePosition';

const setupDimensions = () => {
  const dispatch = useAppDispatch();
  const [boardRef, dims] = useDimensions();
  useEffect(() => {
    dispatch(
      setBoardDimensions({
        xOffset: dims.x,
        yOffset: dims.y,
        width: dims.width,
        height: dims.height,
      }),
    );
  }, [dims]);
  return boardRef;
};

export const Board = () => {
  const boardRef = setupDimensions();
  const { possiblePositions, tiles } = useBoardData();
  useBoardEffects();

  return (
    <div id="board" ref={boardRef}>
      {tiles.map((tile) => (
        <PlacedTile
          key={`${tile.boardX}-${tile.boardY}`}
          boardX={tile.boardX}
          boardY={tile.boardY}
          tileId={tile.tileId}
          orientation={tile.orientation}
        />
      ))}
      {possiblePositions.map((position) => (
        <PossiblePosition
          key={`${position.boardX}-${position.boardY}`}
          boardX={position.boardX}
          boardY={position.boardY}
        />
      ))}
    </div>
  );
};
