import React, { createContext, useContext, useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const useSocketConnection = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log('setting socket!');
    setSocket(socketIOClient('http://localhost:3000', {
      path:'/socket',
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttemps: 10,
      transports: ['websocket'],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
    }));
  }, []);
  useEffect(() => {
    if (socket === null) return undefined;
    console.log(socket);
    socket.on('connect', () => {
      console.log('Socket connected!');
    });
    socket.emit('test', 'hello');
    return () => {
      socket.disconnect();
      setSocket(null);
    };
  }, [socket]);
  return { socket };
};

const socketContext = createContext();

export const ProvideSocket = ({ children }) => (
  <socketContext.Provider value={useSocketConnection()}>{children}</socketContext.Provider>
);

export const useSocket = () => useContext(socketContext);
