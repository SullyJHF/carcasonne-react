import { Game } from '../../server/sockets/models/Game';
import { setPossiblePositions, setTiles } from './BoardSlice';
import { DispatchFunc } from './store';
import { setCurrentOrientingTile, setCurrentTile } from './TileSlice';

export const gameStateUpdated =
  (gameState: Game): DispatchFunc =>
  (dispatch, getState) => {
    dispatch(setPossiblePositions(gameState.possiblePositions));
    dispatch(setTiles(gameState.tiles));
    dispatch(setCurrentTile(gameState.currentTile));
    dispatch(setCurrentOrientingTile(gameState.currentOrientingTile));
  };
