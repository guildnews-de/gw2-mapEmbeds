import { LatLngExpression, LatLng } from 'leaflet';
import React from 'react';
import { useMapEvents } from 'react-leaflet';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setCurrent } from '../../redux/slice/markerSlice';

function LocationMarker() {
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

  const posCopy = async ( text: string ) => {
    await navigator.clipboard.writeText(text);
  }

  const statePos = useAppSelector((state) => state.marker.currentPos);
  const pos: LatLng = statePos ? JSON.parse(statePos) : null;
  const posProject = pos ? project(pos) : null;
  const posString = posProject ? `[${Math.round(posProject!.x)},${Math.round(posProject!.y)}]` : '[,]';
  posCopy(posString)

  return pos === null ? null : (
    // <Tooltip direction='top' offset={[12, 0]} permanent>{project(pos).toString()}</Tooltip>
    <div className="leaflet-bottom leaflet-left">
      <div className="leaflet-control-attribution leaflet-control" >
        <div>{`Clickd Pos. copied: `}</div>
        <div>{posString}</div>
      </div>
    </div>
  );
}

export default LocationMarker;
