import React from 'react';
import { useMapEvents } from 'react-leaflet';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setCurrent } from '../../redux/slice/markerSlice';

import type { LatLngExpression, LatLng } from 'leaflet';

export function LocationMarker() {
  const dispatch = useAppDispatch();
  const map = useMapEvents({
    click(e) {
      if (e.latlng) {
        dispatch(setCurrent(JSON.stringify(e.latlng)));
      }
    },
  });

  const project = (LatLng: LatLngExpression) => {
    return map.project(LatLng, map.getMaxZoom());
  };

  const posCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const statePos = useAppSelector((state) => state.marker.currentPos);
  const pos = statePos ? (JSON.parse(statePos) as LatLng) : undefined;
  const posProject = pos ? project(pos) : undefined;
  const posString = posProject
    ? `${Math.round(posProject.x)},${Math.round(posProject.y)}`
    : ',';

  if (statePos) {
    posCopy(posString).catch((err) => {
      console.error(err);
    });
  }

  return pos === null ? null : (
    // <Tooltip direction='top' offset={[12, 0]} permanent>{project(pos).toString()}</Tooltip>
    <div className="leaflet-bottom leaflet-left">
      <div className="leaflet-control-attribution leaflet-control">
        <div>{`Position copied: `}</div>
        <div>{`[${posString}]`}</div>
      </div>
    </div>
  );
}
