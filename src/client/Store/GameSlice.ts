import { Game } from '../../server/sockets/models/Game';
import { setPossiblePositions } from './BoardSlice';
import { DispatchFunc } from './store';

export const gameStateUpdated =
  (gameState: Game): DispatchFunc =>
  (dispatch, getState) => {
    dispatch(setPossiblePositions(gameState.possiblePositions));
  };
