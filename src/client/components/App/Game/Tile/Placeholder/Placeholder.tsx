import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../../../Store/hooks';
import { setTileDimensions } from '../../../../../Store/TileSlice';
import useDimensions from '../../../../../utils/hooks';
import { Tile } from '../Tile';
import './placeholder.scss';

export const Placeholder = () => {
  const dispatch = useAppDispatch();
  const [ref, dims] = useDimensions({ liveMeasure:false });
  useEffect(() => {
    dispatch(setTileDimensions({
      width: dims.width,
      height: dims.height,
    }));
  }, [dims]);
  return (
    <div id="placeholder" ref={ref}>
      <Tile imageSrc='tile-back'/>
      <Tile imageSrc='1' draggable/>
    </div>
  );
};
