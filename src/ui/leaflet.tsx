import React from 'react';
import { useAppSelector } from '../hooks';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { CRS, icon, LatLng, LatLngBounds } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import './map.css';
import { MarkerObject } from '../slice/markerSlice';

import blue from './assets/blue.png';

function GW2Layer(props: { bounds: [number, number] }) {
  const map = useMap();
  const [Lat, Lan] = props.bounds;

  const mapBounds = new LatLngBounds(
    map.unproject([0, 0], map.getMaxZoom()),
    map.unproject([Lat, Lan], map.getMaxZoom()),
  );
  map.setMaxBounds(mapBounds);
  return (
    <TileLayer
      attribution='&copy; Map data and imagery © <a href="https://www.arena.net/" target="_blank">ArenaNet</a>'
      url="https://tiles.guildwars2.com/1/1/{z}/{x}/{y}.jpg"
      //url="tiles/1/1/{z}/{x}/{y}.jpg"
      minZoom={2}
      maxZoom={7}
      noWrap={true}
      bounds={mapBounds}
      subdomains={['1', '2', '3', '4']}
    />
  );
}

function GW2Marker(props: { markers: MarkerObject[] }) {
  const map = useMap();
  const { markers } = props;
  console.log(JSON.stringify(markers[0]));
  const iBlue = icon({
    iconUrl: blue,
    iconSize: [32,32],
    iconAnchor: [16,16],
    popupAnchor: [0,-16]
  });
  const pos = map.unproject([markers[0].pos[0], markers[0].pos[1]], map.getMaxZoom())
  console.log(JSON.stringify(pos));
  return (
    <>
      {markers.map((el, i) => (
        <Marker
          key={i}
          icon={iBlue}
          position={map.unproject([el.pos[0], el.pos[1]], map.getMaxZoom())}
        >
          <Popup>{el.title}</Popup>
        </Marker>
      ))}
    </>
  );
}

function Leaflet() {
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
      minZoom={2}
      maxZoom={7}
    >
      <GW2Layer bounds={stateBounds} />
      {markerGroup && <GW2Marker markers={markerGroup!} />}
    </MapContainer>
  );
}

export default Leaflet;
