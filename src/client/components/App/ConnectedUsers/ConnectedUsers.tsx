import React from 'react';
import { useUsers } from '../../../Store/UserSlice';
import { useConnectedUsersEffects } from './connectedUsersHooks';



export const ConnectedUsers = () => {
  useConnectedUsersEffects();
  const { users } = useUsers();
  console.log(users);
  return (
    <div id="connected-users">
      {Object.keys(users).filter((userId) => users[userId]).map((userId) => (
        <div key={userId}>{userId}</div>
      ))}
    </div>
  );
};
