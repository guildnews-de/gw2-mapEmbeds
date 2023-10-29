import React, { useEffect } from 'react';
import { Bounds } from 'leaflet';
import { useMap } from 'react-leaflet';

import type { GW2Point } from '../../common/classes';

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
