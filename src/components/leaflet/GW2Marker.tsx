import React from 'react';
import { Marker, Tooltip, useMap } from 'react-leaflet';
import { icon } from 'leaflet';

import { MarkerObject } from '../../slice/markerSlice';
//import blue from './assets/blue.png';
import blue2 from './assets/stern_blau_32.png'

function GW2Marker(props: { markers: MarkerObject[] }) {
  const map = useMap();
  const { markers } = props;
  const iBlue = icon({
    iconUrl: blue2,
    iconSize: [32,32],
    iconAnchor: [16,16],
    popupAnchor: [0,-16]
  });
  return (
    <>
      {markers.map((el, i) => (
        <Marker
          key={i}
          icon={iBlue}
          position={map.unproject([el.pos[0], el.pos[1]], map.getMaxZoom())}
        >
          <Tooltip direction='right' offset={[20,0]} permanent>{el.title}</Tooltip>
        </Marker>
      ))}
    </>
  );
}

export default GW2Marker;
