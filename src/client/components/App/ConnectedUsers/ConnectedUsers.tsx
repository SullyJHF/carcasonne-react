import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ClearIcon from '@mui/icons-material/Clear';
import React from 'react';
import { Player as IPlayer } from '../../../../server/sockets/models/PlayerManager';
import { setMeepleDimensions } from '../../../Store/MeepleSlice';
import { useUserData } from '../../../Store/UserSlice';
import { useSetupDimensions } from '../Game/Board/Board';
import { Meeple } from './Meeple';
import './player.scss';

const Player = ({ player, meepleRef }: { player: IPlayer; meepleRef?: (node: HTMLDivElement) => void }) => {
  const { localUserId, currentPlayer } = useUserData();
  const name = player.playerId === localUserId ? 'Me' : player.name;
  const myTurn = currentPlayer === player.playerId;
  return (
    <div className="player">
      <div className="row">
        <div className={`player-indicator ${myTurn ? 'show' : ''}`}>
          <ArrowRightIcon />
        </div>
        <div className="name">{name}</div>
        <div className={`connected-pip ${player.connected ? 'connected' : 'disconnected'}`}>
          <ClearIcon sx={{ color: 'red' }} />
        </div>
      </div>
      <div className="row">
        <div className="meeple-list">
          {player.meeple.map((meeple, i) =>
            i === 0 ? <Meeple key={i} meepleRef={meepleRef} meeple={meeple} /> : <Meeple key={i} meeple={meeple} />,
          )}
        </div>
      </div>
    </div>
  );
};

export const ConnectedUsers = () => {
  const meepleRef = useSetupDimensions(setMeepleDimensions);
  const { users } = useUserData();
  return (
    <div id="players">
      {Object.keys(users).map((userId, i) =>
        i === 0 ? (
          <Player key={userId} meepleRef={meepleRef} player={users[userId]} />
        ) : (
          <Player key={userId} player={users[userId]} />
        ),
      )}
    </div>
  );
};
