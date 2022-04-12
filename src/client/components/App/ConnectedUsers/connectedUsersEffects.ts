import { useEffect } from 'react';
import { ConnectedUserMap } from '../../../../server/sockets/models/UserManager';
import { USER_EVENTS } from '../../../../shared/constants/socketConstants';
import { useAppDispatch } from '../../../Store/hooks';
import { setUserList } from '../../../Store/UserSlice';
import { useSocket } from '../SocketTest/socketHooks';
export const useConnectedUsersEffects = () => {
  const socket = useSocket();
  const dispatch = useAppDispatch();
  const subscribe = () => {
    console.log('subscribing to events');
    socket?.on(USER_EVENTS.JOIN_GAME, (users: ConnectedUserMap) => {
      dispatch(setUserList(users));
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
