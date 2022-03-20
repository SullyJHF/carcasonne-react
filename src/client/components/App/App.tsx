import React from 'react';
import { Game } from './Game/Game';
import './reset.css';
import { ProvideSocket } from './SocketTest/socketHooks';

const App = () => {
  return (
    <ProvideSocket>
      <Game />
    </ProvideSocket>
  );
};

export default App;
