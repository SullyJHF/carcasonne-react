import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { GAME_EVENTS } from '../../../../../shared/constants/socketConstants';
import { TilePosition } from '../../../../../shared/types/Tile.types';
import { useSocket } from '../../SocketTest/socketHooks';

export const useTileEffects = () => {
  const socket = useSocket();
  const subscribe = (_socket: Socket) => {
    _socket.on(GAME_EVENTS.TILES_UPDATED, (data: TilePosition) => {
      console.log(data);
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
