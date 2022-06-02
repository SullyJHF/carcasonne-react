import ClearIcon from '@mui/icons-material/Clear';
import React from 'react';
import { Player as IPlayer } from '../../../../server/sockets/models/PlayerManager';
import { useUserData } from '../../../Store/UserSlice';
import './player.scss';

const Player = ({ player }: { player: IPlayer }) => {
  const { localUserId } = useUserData();
  const name = player.playerId === localUserId ? 'Me' : player.name;
  return (
    <div className="player">
      <div className="name">{name}</div>
      <div className={`connected-pip ${player.connected ? 'connected' : 'disconnected'}`}>
        <ClearIcon sx={{ color: 'red' }} />
      </div>
    </div>
  );
};

export const ConnectedUsers = () => {
  const { users } = useUserData();
  return (
    <div id="connected-users">
      {Object.keys(users).map((userId) => (
        <Player key={userId} player={users[userId]} />
      ))}
    </div>
  );
};
