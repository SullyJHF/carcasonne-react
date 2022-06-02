import React from 'react';
import { useUserData } from '../../../Store/UserSlice';

export const ConnectedUsers = () => {
  const { users } = useUserData();
  return (
    <div id="connected-users">
      {Object.keys(users).map((userId) => (
        <div key={userId}>{users[userId].name}</div>
      ))}
    </div>
  );
};
