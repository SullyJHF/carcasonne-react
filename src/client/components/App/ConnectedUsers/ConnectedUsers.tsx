import React from 'react';
import { useUserData } from '../../../Store/UserSlice';
import { useConnectedUsersEffects } from './connectedUsersEffects';

export const ConnectedUsers = () => {
  useConnectedUsersEffects();
  const { users } = useUserData();
  return (
    <div id="connected-users">
      {Object.keys(users).filter((userId) => users[userId]).map((userId) => (
        <div key={userId}>{userId}</div>
      ))}
    </div>
  );
};