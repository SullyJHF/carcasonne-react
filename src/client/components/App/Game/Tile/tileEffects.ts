import { useEffect } from 'react';
import { GAME_EVENTS } from '../../../../../socketConstants';
import { useAppDispatch } from '../../../../Store/hooks';
import { useSocket } from '../../SocketTest/socketHooks';

export const useTileEffects = () => {
  const socket = useSocket();
  const dispatch = useAppDispatch();
  const subscribe = () => {
    socket?.on(GAME_EVENTS.TILES_UPDATED, ({ x, y }: { x: number; y: number }) => {
      console.log(`someone else moved a tile to ${x}, ${y}`);
    });
  };
  const unsubscribe = () => {
    socket?.off(GAME_EVENTS.TILES_UPDATED);
  };
  useEffect(() => {
    subscribe();
    return () => {
      unsubscribe();
    };
  }, [socket]);
};
