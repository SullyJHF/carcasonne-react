import React from 'react';
import { Tile } from '../Tile';
import './placeholder.scss';

export const Placeholder = () => {
  return (
    <div id="placeholder">
      <Tile imageSrc='tile-back'/>
      <Tile imageSrc='1' draggable/>
    </div>
  );
};
