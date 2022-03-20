import React, { useEffect } from 'react';
import { useSocket } from './socketHooks';


export const SocketTest = () => {
  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;
    socket.on('test', (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div>
      Sockets!
    </div>
  );
};
