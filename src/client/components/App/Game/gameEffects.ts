import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { Game } from '../../../../server/sockets/models/Game';
import { GAME_EVENTS } from '../../../../shared/constants/socketConstants';
import { gameStateUpdated } from '../../../Store/GameSlice';
import { useAppDispatch } from '../../../Store/hooks';
import { useSocket } from '../SocketTest/socketHooks';

export const useGameEffects = () => {
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const subscribe = (_socket: Socket) => {
    _socket.on(GAME_EVENTS.STATE_UPDATE, (gameState: Game) => {
      console.log(gameState);
      dispatch(gameStateUpdated(gameState));
    });
  };
  const unsubscribe = (_socket: Socket) => {
    _socket.off(GAME_EVENTS.STATE_UPDATE);
  };

  useEffect(() => {
    if (!socket) return;
    subscribe(socket);
    return () => {
      unsubscribe(socket);
    };
  }, [socket]);
};