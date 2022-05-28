import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { GAME_EVENTS } from '../../../../../shared/constants/socketConstants';
import { BoardPosition, tilesUpdated } from '../../../../Store/BoardSlice';
import { useAppDispatch } from '../../../../Store/hooks';
import { useSocket } from '../../SocketTest/socketHooks';

export const useTileEffects = () => {
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const subscribe = (_socket: Socket) => {
    _socket.on(GAME_EVENTS.TILES_UPDATED, (position: BoardPosition) => {
      dispatch(tilesUpdated(position));
    });
  };
  const unsubscribe = (_socket: Socket) => {
    _socket.off(GAME_EVENTS.TILES_UPDATED);
  };

  useEffect(() => {
    if (!socket) return;
    subscribe(socket);
    return () => {
      unsubscribe(socket);
    };
  }, [socket]);
};
