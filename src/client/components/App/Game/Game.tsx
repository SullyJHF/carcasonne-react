import React from 'react';
import { Board } from './Board/Board';
import './game.scss';
import { Inventory } from './Inventory/Inventory';
import { DebugTile } from './Tile/DebugTile/DebugTile';
import { useTileEffects } from './Tile/tileEffects';

export const Game = () => {
  useTileEffects();
  return (
    <div id="game">
      <Inventory />
      <Board />
      <DebugTile />
    </div>
  );
};
