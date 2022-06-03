import React from 'react';
import { Meeple as IMeeple } from '../../../../server/sockets/models/PlayerManager';
import { useBoardData } from '../../../Store/BoardSlice';
import { useMeepleDims } from '../../../Store/MeepleSlice';
import { useTileData } from '../../../Store/TileSlice';
import { posToStyle } from '../../../utils/display';
import { meepleToScreenPos } from '../../../utils/maths';
import './meeple.scss';

export const Meeple = ({ meeple, meepleRef }: { meeple: IMeeple; meepleRef?: (node: HTMLDivElement) => void }) => {
  return (
    <div ref={meepleRef} className={`meeple ${meeple.placedOnTile ? 'used' : ''}`}>
      <svg fill="#000000" version="1.1" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M99.992,43.019c0.578-13.757-32.354-20.455-33.781-22.023  C65.5,20.216,67.861-0.015,50,0C32.139-0.015,34.499,20.216,33.788,20.996c-1.427,1.568-34.357,8.266-33.78,22.023  c0.576,13.758,18.051,6.692,21.778,10.741c3.26,3.544-15.279,26.229-17.353,40.634C3.757,99.089,5.077,100,9.64,100  c8.276,0,16.177-0.005,23.453-0.005c3.287,0,4.456-1.889,6.152-4.492C42.999,89.741,47.533,80.479,50,80.48  c2.466-0.001,7.001,9.261,10.755,15.022c1.696,2.604,2.864,4.492,6.151,4.492c7.275,0,15.177,0.005,23.453,0.005  c4.563,0,5.884-0.911,5.207-5.606c-2.073-14.405-20.611-37.09-17.353-40.634C81.94,49.711,99.417,56.777,99.992,43.019z"></path>
      </svg>
    </div>
  );
};

export const PlacedMeeple = ({ meeple }: { meeple: IMeeple }) => {
  const position = meeple.placedOnTile;
  const { dimensions: boardDims } = useBoardData();
  const { dimensions: tileDims } = useTileData();
  const meepleDims = useMeepleDims();
  const pos = meepleToScreenPos(position.boardX, position.boardY, meepleDims, tileDims, boardDims);
  const style = posToStyle(pos);
  return (
    <div className="meeple placed" style={style}>
      <svg fill="#000000" version="1.1" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M99.992,43.019c0.578-13.757-32.354-20.455-33.781-22.023  C65.5,20.216,67.861-0.015,50,0C32.139-0.015,34.499,20.216,33.788,20.996c-1.427,1.568-34.357,8.266-33.78,22.023  c0.576,13.758,18.051,6.692,21.778,10.741c3.26,3.544-15.279,26.229-17.353,40.634C3.757,99.089,5.077,100,9.64,100  c8.276,0,16.177-0.005,23.453-0.005c3.287,0,4.456-1.889,6.152-4.492C42.999,89.741,47.533,80.479,50,80.48  c2.466-0.001,7.001,9.261,10.755,15.022c1.696,2.604,2.864,4.492,6.151,4.492c7.275,0,15.177,0.005,23.453,0.005  c4.563,0,5.884-0.911,5.207-5.606c-2.073-14.405-20.611-37.09-17.353-40.634C81.94,49.711,99.417,56.777,99.992,43.019z"></path>
      </svg>
    </div>
  );
};
