import React from 'react';
import { ConnectedUsers } from '../../ConnectedUsers/ConnectedUsers';
import { Placeholder } from '../Tile/Placeholder/Placeholder';
import './inventory.scss';

export const Inventory = () => {
  return (
    <div id="inventory">
      <Placeholder />
      <ConnectedUsers />
    </div>
  );
};
