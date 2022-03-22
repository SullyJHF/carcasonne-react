import React, { useEffect } from 'react';
import { setBoardDimensions, useBoardData } from '../../../../Store/BoardSlice';
import { useAppDispatch } from '../../../../Store/hooks';
import useDimensions from '../../../../utils/hooks';
import './board.scss';
import { PossiblePosition } from './PossiblePosition/PossiblePosition';

const setupDimensions = () => {
  const dispatch = useAppDispatch();
  const [boardRef, dims] = useDimensions();
  useEffect(() => {
    dispatch(setBoardDimensions({
      width: dims.width,
      height: dims.height,
    }));
  }, [dims]);
  return boardRef;
};

export const Board = () => {
  const boardRef = setupDimensions();
  const { possiblePositions } = useBoardData();
  console.log(possiblePositions);

  return (
    <div id="board" ref={boardRef}>
      {possiblePositions.map((position) => (
        <PossiblePosition key={`${position.x}-${position.y}`} x={position.x} y={position.y} />
      ))}
    </div>
  );
};
