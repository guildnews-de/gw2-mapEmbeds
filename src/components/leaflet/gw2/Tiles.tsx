import React from 'react';
import { TileLayer, useMap } from 'react-leaflet';
import { Bounds, LatLngBounds, PointExpression, PointTuple } from 'leaflet';

interface GW2LayerProps {
  bounds: PointTuple;
  rect: [[number, number], [number, number]][];
}

function GW2Layer(props: GW2LayerProps) {
  const map = useMap();
  const unproject = (LatLng: PointExpression) => {
    return map.unproject(LatLng, map.getMaxZoom());
  };

  // Get max bound of whole leaflet map
  const [Lat, Lng] = props.bounds;
  const maxBounds = new LatLngBounds(unproject([0, 0]), unproject([Lat, Lng]));
  map.setMaxBounds(maxBounds);

  // Get center of active GW2 Map
  const [pNW, pSE] = props.rect[0];
  const mapBounds = new Bounds(pNW, pSE);
  const center = unproject(mapBounds.getCenter());
  map.setView(center, 5);

  return (
    <TileLayer
      attribution={`Data and Imagery: &copy; <a href="https://www.arena.net/" target="_blank">ArenaNet</a></br> 
                    Additional imagery by: <a href="https://blog.thatshaman.com/" target="_blank">that_shaman</a>`}
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
