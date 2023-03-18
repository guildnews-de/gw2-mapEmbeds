/* eslint-disable react-hooks/rules-of-hooks */
import { useMap } from 'react-leaflet';
import { Bounds, LatLngBounds } from 'leaflet';
import type { PointExpression } from 'leaflet';

function unproject(LatLng: PointExpression) {
  const map = useMap();
  return map.unproject(LatLng, map.getMaxZoom());
}

function getCenter(nw: PointExpression, se: PointExpression) {
  const bounds = new Bounds(nw, se);
  return unproject(bounds.getCenter());
}

function getMaxBounds(LatLng: PointExpression) {
  return new LatLngBounds(unproject([0, 0]), unproject(LatLng));
}

export function setMapConfig(
  bounds: PointExpression,
  rect: [PointExpression, PointExpression],
) {
  const map = useMap();

  const maxBounds = getMaxBounds(bounds);
  map.setMaxBounds(maxBounds);

  const center = getCenter(rect[0], rect[1])
  map.setView(center,5);

  return maxBounds;
}
