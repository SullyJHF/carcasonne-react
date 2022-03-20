import React from 'react';
import { useConnectedUsersEffects } from './connectedUsersHooks';



export const ConnectedUsers = () => {
  useConnectedUsersEffects();
  return (
    <div id="connected-users">
      
    </div>
  );
};
