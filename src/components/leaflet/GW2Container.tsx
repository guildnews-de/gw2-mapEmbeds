import React from 'react';
import { useAppSelector } from '../../hooks';

import { MapContainer } from 'react-leaflet';
import { CRS, LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import GW2Layer from './GW2Layer';
import GW2Marker from './GW2Marker';

import './GW2Container.css';

function GW2Container() {
  const { bounds: stateBounds } = useAppSelector((state) => state.map);
  const { active, groups } = useAppSelector((state) => state.marker);
  const markerGroup = active === 'none' ? undefined : groups![active];
  
  const { Simple } = CRS;

  return (
    <MapContainer
      crs={Simple}
      scrollWheelZoom={true}
      zoom={2}
      center={new LatLng(0, 0)}
      minZoom={1}
      maxZoom={7}
    >
      <GW2Layer bounds={stateBounds} />
      {markerGroup && <GW2Marker markers={markerGroup!} />}
    </MapContainer>
  );
}

export default GW2Container;
