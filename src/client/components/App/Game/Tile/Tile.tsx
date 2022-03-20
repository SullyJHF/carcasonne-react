import React from 'react';
import Draggable from 'react-draggable';
import './tile.scss';

interface TileProps {
  imageSrc: string;
}

export const Tile = ({ imageSrc = 'tile-back' }: TileProps) => {
  return (
    <Draggable>
      <div className="tile">
        <img src={`/images/${imageSrc}.png`} alt="a carcasonne tile" draggable={false}/>
      </div>
    </Draggable>
  );
};
