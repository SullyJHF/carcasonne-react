import { ActionCreatorWithOptionalPayload } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { setBoardDimensions, useBoardData } from '../../../../Store/BoardSlice';
import { useAppDispatch } from '../../../../Store/hooks';
import { Dimensions, useTileData } from '../../../../Store/TileSlice';
import { useAllMeeple, useUserData } from '../../../../Store/UserSlice';
import { useDimensions } from '../../../../utils/hooks';
import { PlacedMeeple } from '../../ConnectedUsers/Meeple';
import { OrientingTile, PlacedTile } from '../Tile/Tile';
import './board.scss';
import { PossiblePosition } from './PossiblePosition/PossiblePosition';

export const useSetupDimensions = (dispatchFunc: ActionCreatorWithOptionalPayload<Dimensions, string>) => {
  const dispatch = useAppDispatch();
  const [elementRef, dims] = useDimensions();
  useEffect(() => {
    dispatch(
      dispatchFunc({
        xOffset: dims.x,
        yOffset: dims.y,
        width: dims.width,
        height: dims.height,
      }),
    );
  }, [dims]);
  return elementRef;
};

export const Board = () => {
  const boardRef = useSetupDimensions(setBoardDimensions);
  const { possiblePositions, tiles } = useBoardData();
  const { currentOrientingTile } = useTileData();
  const { users } = useUserData();
  const allMeeple = useAllMeeple();

  return (
    <div id="board" ref={boardRef}>
      {allMeeple
        .filter((meep) => meep.placedOnTile)
        .map((meep, i) => (
          <PlacedMeeple key={`${meep.playerId}-${i}`} meeple={meep} colour={users[meep.playerId].colour} />
        ))}
      {tiles.map((tile) => (
        <PlacedTile
          key={`${tile.boardX}-${tile.boardY}`}
          boardX={tile.boardX}
          boardY={tile.boardY}
          tileId={tile.tileId}
          orientation={tile.orientation}
        />
      ))}
      {currentOrientingTile && <OrientingTile tile={currentOrientingTile} />}
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
