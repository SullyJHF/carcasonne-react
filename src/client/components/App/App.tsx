import React from 'react';
import { ProvideSocket } from '../../utils/socket';
import './reset.css';
import { SocketTest } from './SocketTest/SocketTest';

const App = () => {
  return (
    <ProvideSocket>
      <SocketTest />
    </ProvideSocket>
  );
};

export default App;
