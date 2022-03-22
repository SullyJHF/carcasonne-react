import React, { useEffect } from 'react';
import { setBoardDimensions } from '../../../../Store/BoardSlice';
import { useAppDispatch } from '../../../../Store/hooks';
import useDimensions from '../../../../utils/hooks';
import './board.scss';


export const Board = () => {
  const dispatch = useAppDispatch();
  const [boardRef, dims] = useDimensions();
  useEffect(() => {
    dispatch(setBoardDimensions({
      width: dims.width,
      height: dims.height,
    }));
  }, [dims]);
  return (
    <div id="board" ref={boardRef}>
    </div>
  );
};
