import { Bounds, PointTuple } from 'leaflet';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface RecenterProps {
  newCenter: PointTuple | [[number, number], [number, number]];
}

const Recenter = ({ newCenter }: RecenterProps) => {
  const map = useMap();
  const [val1, val2] = newCenter;

  useEffect(() => {
    const xy: PointTuple = [0, 0];
    if (Array.isArray(val1) && Array.isArray(val2)) {
      const bounds = new Bounds([val1, val2]);
      const c = bounds.getCenter();
      xy[0] = c.x;
      xy[1] = c.y;
    } else {
      xy[0] = Number(val1);
      xy[1] = Number(val2);
    }

    map.setView(map.unproject(xy, map.getMaxZoom()), 6);
  }, [val1, val2, map]);
  return <></>;
};

export default Recenter;
