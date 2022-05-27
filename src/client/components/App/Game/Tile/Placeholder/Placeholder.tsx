import React, { useEffect } from 'react';
import { setDebugTilePosition } from '../../../../../Store/DebugSlice';
import { useAppDispatch } from '../../../../../Store/hooks';
import { setTileDimensions } from '../../../../../Store/TileSlice';
import useDimensions from '../../../../../utils/hooks';
import { Tile } from '../Tile';
import './placeholder.scss';

export const Placeholder = () => {
  const dispatch = useAppDispatch();
  const [ref, dims] = useDimensions();
  useEffect(() => {
    dispatch(
      setTileDimensions({
        xOffset: dims.x,
        yOffset: dims.y,
        width: dims.width,
        height: dims.height,
      }),
    );
    dispatch(
      setDebugTilePosition({
        w: dims.width,
        h: dims.height,
        x: dims.x,
        y: dims.y,
      }),
    );
  }, [dims]);
  return (
    <div id="placeholder" ref={ref}>
      <Tile imageSrc="tile-back" />
      <Tile imageSrc="1" draggable />
    </div>
  );
};
