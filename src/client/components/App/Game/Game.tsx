import React from 'react';
import { Board } from './Board/Board';
import './game.scss';
import { useGameEffects } from './gameEffects';
import { Inventory } from './Inventory/Inventory';
import { DebugTile } from './Tile/DebugTile/DebugTile';

export const Game = () => {
  useGameEffects();
  return (
    <div id="game">
      <Inventory />
      <Board />
      <DebugTile />
    </div>
  );
};
