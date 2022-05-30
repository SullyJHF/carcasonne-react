import React, { useRef } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import { BoardPosition, setHoveringOver, setIsDragging, useBoardData } from '../../../../Store/BoardSlice';
import { useAppDispatch } from '../../../../Store/hooks';
import { ITile, tilePlaced, useTileData } from '../../../../Store/TileSlice';
import { posToStyle } from '../../../../utils/display';
import { boardToScreenPos, distance, getCentre, intersects } from '../../../../utils/maths';
import { useSocket } from '../../SocketTest/socketHooks';
import './tile.scss';

interface TileProps {
  tileId: number;
  draggable?: boolean;
}

const useTileDrag = () => {
  const socket = useSocket();
  const dispatch = useAppDispatch();
  const { dimensions: boardDims, possiblePositions } = useBoardData();
  const { dimensions: tileDims } = useTileData();
  const onDrag: DraggableEventHandler = (e, data) => {
    const { x: dragX, y: dragY } = data;
    const tileX = dragX + tileDims.xOffset;
    const tileY = dragY + tileDims.yOffset;
    const hoveringPositions: BoardPosition[] = [];
    for (const position of possiblePositions) {
      const { x, y, w, h } = boardToScreenPos(position.boardX, position.boardY, tileDims, boardDims);
      if (intersects(tileX, tileY, tileDims.width, tileDims.height, x, y, w, h)) {
        hoveringPositions.push(position);
      }
    }
    if (!hoveringPositions.length) {
      dispatch(setHoveringOver(null));
      return;
    }

    if (hoveringPositions.length === 1) {
      dispatch(setHoveringOver(hoveringPositions[0]));
      return;
    }

    // Get closest hover
    const { x: tileCentreX, y: tileCentreY } = getCentre(tileX, tileY, tileDims.width, tileDims.height);
    let minDist = Number.MAX_SAFE_INTEGER;
    let minPos: BoardPosition = null;
    for (const position of hoveringPositions) {
      const { x, y } = boardToScreenPos(position.boardX, position.boardY, tileDims, boardDims);
      const { x: posCentreX, y: posCentreY } = getCentre(x, y, tileDims.width, tileDims.height);
      const dist = distance(tileCentreX, tileCentreY, posCentreX, posCentreY);
      if (dist < minDist) {
        minDist = dist;
        minPos = position;
      }
    }
    // TODO: maybe don't do this every single drag event
    // lots of dispatches happening in quick succession atm
    dispatch(setHoveringOver(minPos));
  };
  const onDragStart: DraggableEventHandler = () => {
    dispatch(setIsDragging(true));
  };
  const onDragStop: DraggableEventHandler = () => {
    dispatch(setIsDragging(false));
    dispatch(tilePlaced(socket));
  };

  return { onDrag, onDragStart, onDragStop };
};

const getTileImageSrc = (tileId: number) => `/images/${tileId >= 0 && tileId <= 24 ? tileId : 'tile-back'}.png`;

export const Tile = ({ tileId = -1, draggable = false }: TileProps) => {
  const nodeRef = useRef(null);
  const { onDrag, onDragStart, onDragStop } = useTileDrag();

  // Using a standard variable here instead of a wrapped custom StaticTile component
  // because of the props needed to be passed: https://github.com/react-grid-layout/react-draggable#draggable-api
  const TileReturn = (
    <div className="tile" ref={nodeRef}>
      <img src={getTileImageSrc(tileId)} alt="a carcasonne tile" draggable={false} />
    </div>
  );

  if (!draggable) return TileReturn;

  return (
    <Draggable nodeRef={nodeRef} onStart={onDragStart} onStop={onDragStop} onDrag={onDrag}>
      {TileReturn}
    </Draggable>
  );
};

export const PlacedTile = (props: ITile & { key: string }) => {
  const { dimensions: tileDims } = useTileData();
  const { dimensions: boardDims } = useBoardData();
  const pos = boardToScreenPos(props.boardX, props.boardY, tileDims, boardDims);
  const style = posToStyle(pos, props.orientation);
  return (
    <div className="tile placed" style={style}>
      <img src={getTileImageSrc(props.tileId)} alt="a carcasonne tile" draggable={false} />
    </div>
  );
};
