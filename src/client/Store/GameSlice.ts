import { Game } from '../../server/sockets/models/Game';
import { setPossiblePositions, setTiles } from './BoardSlice';
import { DispatchFunc } from './store';

export const gameStateUpdated =
  (gameState: Game): DispatchFunc =>
  (dispatch, getState) => {
    dispatch(setPossiblePositions(gameState.possiblePositions));
    dispatch(setTiles(gameState.tiles));
  };
