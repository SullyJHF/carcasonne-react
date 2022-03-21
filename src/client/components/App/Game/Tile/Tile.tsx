import React, { useRef } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import { useAppDispatch } from '../../../../Store/hooks';
import { tilePlaced } from '../../../../Store/TileSlice';
import { useSocket } from '../../SocketTest/socketHooks';
import './tile.scss';
import { useTileEffects } from './tileEffects';

interface TileProps {
  imageSrc: string;
}

export const Tile = ({ imageSrc = 'tile-back' }: TileProps) => {
  const dispatch = useAppDispatch();
  const socket = useSocket();
  useTileEffects();
  const nodeRef = useRef(null);
  const onDragStop: DraggableEventHandler = (e, data) => {
    const { x, y } = data;
    dispatch(tilePlaced(socket, x, y));
  };
  return (
    <Draggable nodeRef={nodeRef} onStop={onDragStop}>
      <div className="tile" ref={nodeRef}>
        <img src={`/images/${imageSrc}.png`} alt="a carcasonne tile" draggable={false}/>
      </div>
    </Draggable>
  );
};
