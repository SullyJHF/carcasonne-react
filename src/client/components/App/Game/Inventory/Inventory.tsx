import React from 'react';
import { ConnectedUsers } from '../../ConnectedUsers/ConnectedUsers';
import { PlaceholderTile } from '../Tile/Placeholder/PlaceholderTile';
import './inventory.scss';

export const Inventory = () => {
  return (
    <div id="inventory">
      <PlaceholderTile />
      <ConnectedUsers />
    </div>
  );
};
