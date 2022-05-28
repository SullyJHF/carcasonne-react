import React, { useRef } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import { setHoveringOver, useBoardData } from '../../../../Store/BoardSlice';
import { useAppDispatch } from '../../../../Store/hooks';
import { tilePlaced, useTileData } from '../../../../Store/TileSlice';
import { boardToScreenPos, intersects } from '../../../../utils/maths';
import { useSocket } from '../../SocketTest/socketHooks';
import './tile.scss';

interface TileProps {
  imageSrc: string;
  draggable?: boolean;
}

const useTileDrag = () => {
  const socket = useSocket();
  const dispatch = useAppDispatch();
  const { dimensions: boardDims, possiblePositions } = useBoardData();
  const { dimensions: tileDims } = useTileData();
  const onDrag: DraggableEventHandler = (e, data) => {
    const { x: dragX, y: dragY } = data;
    /**
     * TODO: put current drag over into an object here
     * Then check which one is closest after the loop
     */
    for (const position of possiblePositions) {
      const { x, y, w, h } = boardToScreenPos(position.boardX, position.boardY, tileDims, boardDims);
      if (intersects(dragX + tileDims.xOffset, dragY + tileDims.yOffset, tileDims.width, tileDims.height, x, y, w, h)) {
        dispatch(setHoveringOver({ boardX: position.boardX, boardY: position.boardY }));
        break;
      } else {
        dispatch(setHoveringOver(null));
      }
    }
  };

  const onDragStop: DraggableEventHandler = (e, data) => {
    const { x, y } = data;
    dispatch(tilePlaced(socket, x, y));
  };
  return { onDrag, onDragStop };
};

export const Tile = ({ imageSrc = 'tile-back', draggable = false }: TileProps) => {
  const nodeRef = useRef(null);
  const { onDrag, onDragStop } = useTileDrag();

  // Using a standard variable here instead of a wrapped custom StaticTile component
  // because of the props needed to be passed: https://github.com/react-grid-layout/react-draggable#draggable-api
  const TileReturn = (
    <div className="tile" ref={nodeRef}>
      <img src={`/images/${imageSrc}.png`} alt="a carcasonne tile" draggable={false} />
    </div>
  );

  if (!draggable) return TileReturn;

  return (
    <Draggable nodeRef={nodeRef} onStop={onDragStop} onDrag={onDrag}>
      {TileReturn}
    </Draggable>
  );
};
