import React from 'react';
import { Board } from './Board/Board';
import './game.scss';
import { Inventory } from './Inventory/Inventory';
import { useTileEffects } from './Tile/tileEffects';

export const Game = () => {
  useTileEffects();
  return (
    <div id="game">
      <Inventory />
      <Board />
    </div>
  );
};
