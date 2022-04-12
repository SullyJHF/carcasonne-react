import { useEffect } from 'react';
import { calculatePossiblePositions, useBoardData } from '../../../../Store/BoardSlice';
import { useAppDispatch } from '../../../../Store/hooks';
import { useTileData } from '../../../../Store/TileSlice';

export const useBoardEffects = () => {
  const dispatch = useAppDispatch();
  const { dimensions: tileDims } = useTileData();
  const { dimensions: boardDims } = useBoardData();
  useEffect(() => {
    if (!tileDims || !boardDims) return;
    dispatch(calculatePossiblePositions(tileDims, boardDims));
  }, [tileDims, boardDims]);
};
