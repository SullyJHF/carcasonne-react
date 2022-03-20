import React from 'react';
import Draggable from 'react-draggable';

export const PlaceholderTile = () => {
  return (
    <Draggable>
      <div className="placeholder tile">
        <img src='/images/tile-back.png' alt='placeholder tile' draggable={false}/>
      </div>
    </Draggable>
  );
};
