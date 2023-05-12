import { Bounds, Point, PointTuple } from 'leaflet';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface RecenterProps {
  //newCenter: PointTuple | [[number, number], [number, number]];
  mTupel: PointTuple[];
}

const Recenter = ({ mTupel }: RecenterProps) => {
  const map = useMap();
  //const [val1, val2] = newCenter;

  useEffect(() => {
    /*     const xy: PointTuple = [0, 0];
    if (Array.isArray(val1) && Array.isArray(val2)) {
      const bounds = new Bounds([val1, val2]);
      const c = bounds.getCenter();
      xy[0] = c.x;
      xy[1] = c.y;
    } else {
      xy[0] = Number(val1);
      xy[1] = Number(val2);
    } */
    const markPoints = mTupel.map((mT) => {
      return new Point(mT[0], mT[1]);
    });

    const bounds = new Bounds(markPoints);
    const center = bounds.getCenter();

    map.setView(map.unproject(center, map.getMaxZoom()), 6);
  }, [mTupel, map]);
  return <></>;
};

export default Recenter;
