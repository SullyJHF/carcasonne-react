import React from 'react';
import { Board } from './Board/Board';
import './game.scss';
import { Inventory } from './Inventory/Inventory';

export const Game = () => {
  return (
    <div id="game">
      <Inventory />
      <Board />
    </div>
  );
};
