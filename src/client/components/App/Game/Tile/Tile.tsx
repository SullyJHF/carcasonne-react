import React, { useRef } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import './tile.scss';

interface TileProps {
  imageSrc: string;
}

export const Tile = ({ imageSrc = 'tile-back' }: TileProps) => {
  const nodeRef = useRef(null);
  const onDragStop: DraggableEventHandler = (e, data) => {
    const { x, y } = data;
    console.log(x, y);
  };
  return (
    <Draggable nodeRef={nodeRef} onStop={onDragStop}>
      <div className="tile" ref={nodeRef}>
        <img src={`/images/${imageSrc}.png`} alt="a carcasonne tile" draggable={false}/>
      </div>
    </Draggable>
  );
};
