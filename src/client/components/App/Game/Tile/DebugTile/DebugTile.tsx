import React from 'react';
import { useDebugSliceData } from '../../../../../Store/DebugSlice';
import './debug-tile.scss';

export const DebugTile = () => {
  const { debugTilePosition } = useDebugSliceData();
  return (
    <div
      className="debug-tile"
      style={{
        left: `${debugTilePosition?.x}px`,
        top: `${debugTilePosition?.y}px`,
        width: `${debugTilePosition?.w}px`,
        height: `${debugTilePosition?.h}px`,
      }}
    />
  );
};
