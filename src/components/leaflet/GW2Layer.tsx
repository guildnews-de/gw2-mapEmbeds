import React from 'react';
import { TileLayer, useMap } from 'react-leaflet';
import { Bounds, LatLngBounds } from 'leaflet';
import { useAppSelector } from '../../hooks';

function GW2Layer(props: { bounds: [number, number] }) {
  const map = useMap();

  // Get center of whole leaflet map
  const [boundLat, boundLan] = props.bounds;
  const maxZoom = map.getMaxZoom();
  const maxBounds = new LatLngBounds(
    map.unproject([0, 0], maxZoom),
    map.unproject([boundLat, boundLan], maxZoom),
  );

  // Get center of active GW2 Map
  const { activeMap } = useAppSelector((state) => state.map);
  const apiData = useAppSelector((state) => state.api.response[activeMap]);
  const pointNW = apiData.continent_rect![0];
  const pointSE = apiData.continent_rect![1];
  const mapBounds = new Bounds(pointNW, pointSE);
  const center = map.unproject(mapBounds.getCenter(), maxZoom);

  map.setMaxBounds(maxBounds);
  map.setView(center, 5);
  return (
    <TileLayer
      attribution='&copy; Map data and imagery © <a href="https://www.arena.net/" target="_blank">ArenaNet</a>'
      //url="https://tiles.guildwars2.com/1/1/{z}/{x}/{y}.jpg"
      url="https://assets.guildnews.de/tiles/1/1/{z}/{x}/{y}.jpg"
      minZoom={1}
      maxZoom={7}
      noWrap={true}
      bounds={maxBounds}
      subdomains={['1', '2', '3', '4']}
    />
  );
}

export default GW2Layer;
