import { Bounds } from 'leaflet';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { GW2Point } from './gw2';

interface RecenterProps {
  //newCenter: PointTuple | [[number, number], [number, number]];
  marker: GW2Point[];
}

const Recenter = ({ marker }: RecenterProps) => {
  const map = useMap();
  //const [val1, val2] = newCenter;

  useEffect(() => {
    const bounds = new Bounds(marker);
    const center = bounds.getCenter();

    map.setView(map.unproject(center, map.getMaxZoom()), 6);
  }, [marker, map]);
  return <></>;
};

export default Recenter;
