import { Game } from '../../server/sockets/models/Game';
import { setPossiblePositions, setTiles } from './BoardSlice';
import { DispatchFunc } from './store';
import { setCurrentOrientingTile, setCurrentTile } from './TileSlice';
import { setUserList } from './UserSlice';

export const gameStateUpdated =
  (gameState: Game): DispatchFunc =>
  (dispatch, getState) => {
    dispatch(setPossiblePositions(gameState.board.possiblePositions));
    dispatch(setTiles(gameState.board.tiles));
    dispatch(setCurrentTile(gameState.currentTile));
    dispatch(setCurrentOrientingTile(gameState.currentOrientingTile));
    dispatch(setUserList(gameState.playerManager.players));
  };
