import React from 'react';
import { useAppSelector } from '../../hooks';

import { MapContainer } from 'react-leaflet';
import { CRS, LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import GW2Layer from './GW2Layer';
import GW2Marker from './GW2Marker';

import './GW2Container.css';
import { GW2ApiPoi } from '../../apiMiddleware';

function GW2Container() {
  const { bounds: stateBounds } = useAppSelector((state) => state.map);
  const { activeMap } = useAppSelector((state) => state.map);
  const apiData = useAppSelector((state) => state.api.response[activeMap]);
  const { active, groups } = useAppSelector((state) => state.marker);

  let { poi } = apiData;
  const poiArr: GW2ApiPoi[] = [];
  if (poi) {
    Object.entries(poi).forEach((entry) => {
      poiArr.push(entry[1]);
    });
  }
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
      {markerGroup && <GW2Marker markers={markerGroup!} perm={true} />}
      {poi && <GW2Marker markers={poiArr! as GW2ApiPoi[]} />}
    </MapContainer>
  );
}

export default GW2Container;
