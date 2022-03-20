import { useEffect } from 'react';
import { USER_EVENTS } from '../../../../socketConstants';
import { useSocket } from '../SocketTest/socketHooks';
import { ConnectedUserMap } from './../../../../server/sockets/models/UserManager';
export const useConnectedUsersEffects = () => {
  const socket = useSocket();
  const subscribe = () => {
    console.log('subscribing to events');
    socket?.on(USER_EVENTS.JOIN_GAME, (users: ConnectedUserMap) => {
      console.log(users);
    });
  };
  const unsubscribe = () => {
    console.log('subscribing to events');
    socket?.off(USER_EVENTS.JOIN_GAME);
  };
  useEffect(() => {
    subscribe();
    return () => {
      unsubscribe();
    };
  }, [socket]);
};
