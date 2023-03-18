import { LatLngExpression, LatLng } from 'leaflet';
import React, { CSSProperties } from 'react';
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

  const statePos = useAppSelector((state) => state.marker.currentPos);
  const pos: LatLng = statePos ? JSON.parse(statePos) : null;
  const projectPos = pos ? project(pos) : null;

  const style = {
    userSelect: 'all',
    WebkitUserSelect: 'all',
    width: '96px',
  } as CSSProperties;

  return pos === null ? null : (
    // <Tooltip direction='top' offset={[12, 0]} permanent>{project(pos).toString()}</Tooltip>
    <div className="leaflet-bottom leaflet-left">
      <div
        className="leaflet-control-attribution leaflet-control"
        style={style}
      >
        {`Clicked: [${Math.round(projectPos!.x)},${Math.round(projectPos!.y)}]`}
      </div>
    </div>
  );
}

export default LocationMarker;
