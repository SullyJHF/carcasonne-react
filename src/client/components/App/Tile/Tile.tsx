import React from 'react';
import Draggable from 'react-draggable';
import './tile.scss';

export const Tile = () => {
  return (
    <Draggable>
      <div className="tile">
        <img src="/images/1.png" alt="a carcasonne tile" draggable={false}/>
      </div>
    </Draggable>
  );
};
