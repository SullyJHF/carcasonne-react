import React, { createContext, useContext, useEffect, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';

const CONNECTION_EVENTS = {
  CONNECT: 'connect',
};

const useSocketConnection = (): Socket | null => {
  const [socket, setSocket] = useState<null | Socket>(null);

  // Initialise socket on first load
  useEffect(() => {
    setSocket(socketIOClient('http://localhost:3000', {
      path:'/socket',
      transports: ['websocket'],
    }));
  }, []);

  // Initialise connect listener
  useEffect(() => {
    if (socket === null) return undefined;
    socket.on(CONNECTION_EVENTS.CONNECT, () => { console.log('Socket connected!'); });
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
