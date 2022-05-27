import React, { useRef } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import { useBoardData } from '../../../../Store/BoardSlice';
import { useAppDispatch } from '../../../../Store/hooks';
import { tilePlaced, useTileData } from '../../../../Store/TileSlice';
import { intersects } from '../../../../utils/maths';
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
  const { possiblePositions } = useBoardData();
  const { dimensions: tileDims } = useTileData();
  const onDrag: DraggableEventHandler = (e, data) => {
    const { x, y } = data;
    for (const position of possiblePositions) {
      if (
        intersects(
          x + tileDims.xOffset,
          y + tileDims.yOffset,
          tileDims.width,
          tileDims.height,
          position.x,
          position.y,
          position.width,
          position.height,
        )
      ) {
        console.log('Intersection!!', x, y);
      }
    }
  };
  const tileReturn = (
    <div className="tile" ref={nodeRef}>
      <img src={`/images/${imageSrc}.png`} alt="a carcasonne tile" draggable={false} />
    </div>
  );
  if (draggable) {
    return (
      <Draggable nodeRef={nodeRef} onStop={onDragStop} onDrag={onDrag}>
        {tileReturn}
      </Draggable>
    );
  }
  return tileReturn;
};
