import React from 'react';
import { divIcon, LatLng } from 'leaflet';
import { Marker } from 'react-leaflet';

import './MapTextMark.css';

interface MapTextMarkProps {
  text: string;
  coord: LatLng;
}

function MapTextMark(props: MapTextMarkProps) {
  const { text, coord } = props;

  const name = divIcon({
    html: `<span>${text}</span>`,
    className: 'gw2sector',
  })

  return (
    <Marker position={coord} icon={name} zIndexOffset={-100} />
  );
}

export default MapTextMark;
