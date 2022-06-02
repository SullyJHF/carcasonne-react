import React, { createContext, useContext, useEffect, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { USER_EVENTS } from '../../../../shared/constants/socketConstants';
import { useAppDispatch } from '../../../Store/hooks';
import { setLocalUserId } from '../../../Store/UserSlice';
import { useLocalStorage } from '../../../utils/hooks';

const CONNECTION_EVENTS = {
  CONNECT: 'connect',
};

const useSocketConnection = (): Socket | null => {
  const dispatch = useAppDispatch();
  const [socket, setSocket] = useState<null | Socket>(null);
  const [localId, setLocalId] = useLocalStorage('player-id', null);

  // Initialise socket on first load
  useEffect(() => {
    setSocket(
      socketIOClient('http://localhost:3000', {
        path: '/socket',
        transports: ['websocket'],
      }),
    );
  }, []);

  // Initialise connect listener
  useEffect(() => {
    if (socket === null) return undefined;
    socket.on(CONNECTION_EVENTS.CONNECT, () => {
      let uuid = localId;
      if (localId === null) {
        uuid = uuidv4();
        setLocalId(uuid);
      }
      dispatch(setLocalUserId(uuid));
      socket.emit(USER_EVENTS.JOIN_GAME, uuid);
    });
    return () => {
      socket.disconnect();
      setSocket(null);
    };
  }, [socket]);
  return socket;
};

const socketContext = createContext<Socket | null>(null);

export const ProvideSocket = ({ children }: { children: React.ReactNode }) => (
  <socketContext.Provider value={useSocketConnection()}>{children}</socketContext.Provider>
);

export const useSocket = () => useContext(socketContext);
