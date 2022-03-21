import React, { useRef } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import { useAppDispatch } from '../../../../Store/hooks';
import { tilePlaced } from '../../../../Store/TileSlice';
import { useSocket } from '../../SocketTest/socketHooks';
import './tile.scss';

interface TileProps {
  imageSrc: string;
  draggable?: boolean;
}

export const Tile = ({ imageSrc = 'tile-back', draggable = false }: TileProps) => {
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const nodeRef = useRef(null);
  const onDragStop: DraggableEventHandler = (e, data) => {
    const { x, y } = data;
    dispatch(tilePlaced(socket, x, y));
  };
  const tileReturn = (
    <div className="tile" ref={nodeRef}>
      <img src={`/images/${imageSrc}.png`} alt="a carcasonne tile" draggable={false}/>
    </div>
  );
  if (draggable) {
    return (
      <Draggable nodeRef={nodeRef} onStop={onDragStop}>
        {tileReturn}
      </Draggable>
    );
  }
  return tileReturn;
};
