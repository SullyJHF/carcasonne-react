import React from 'react';
import { ConnectedUsers } from './ConnectedUsers/ConnectedUsers';
import './reset.css';
import { ProvideSocket } from './SocketTest/socketHooks';

const App = () => {
  return (
    <ProvideSocket>
      <ConnectedUsers />
    </ProvideSocket>
  );
};

export default App;
