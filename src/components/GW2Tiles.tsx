import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { LatLngBounds, type PointExpression, type PointTuple } from 'leaflet';
import { getStorageInfo, removeTile } from 'leaflet.offline';

import { CachedTileLayer } from './leaflet/CachedTileLayer';
import { useAppSelector } from '../redux/hooks';
import { tilesURL } from '../common/constants';

interface GW2TilesProps {
  bounds: PointTuple;
}

export function GW2Tiles(props: GW2TilesProps) {
  const map = useMap();
  const unproject = (point: PointExpression) => {
    return map.unproject(point, map.getMaxZoom() - 1);
  };

  // Get max bound of whole leaflet map
  const { bounds } = props;
  const [Lat, Lng] = bounds;
  const maxBounds = new LatLngBounds(unproject([0, 0]), unproject([Lat, Lng]));
  map.setMaxBounds(maxBounds);

  const apiDate = useAppSelector((state) => state.map.tileDate);
  const wide = useAppSelector((state) => state.app.canvas.wide);

  useEffect(() => {
    cleanTileCache(apiDate).catch((err) => {
      console.error(err);
    });
    map.invalidateSize();
  }, [apiDate, map, wide]);

  useEffect(() => {
    map.invalidateSize();
  }, [map, wide]);

  const cleanTileCache = async (apiDate: number) => {
    const tiles = await getStorageInfo(tilesURL);
    let count = 0;
    await Promise.all(
      tiles.map((tile) => {
        //console.debug(tile.createdAt + '  ' + apiDate);
        if (tile.createdAt < apiDate) {
          removeTile(tile.key).catch((err) => {
            console.error(err);
          });
          count++;
        } else {
          Promise.resolve().catch((err) => {
            console.error(err);
          });
        }
      }),
    );
    if (count > 0) {
      console.debug(count + ' old GW2 map tiles cleaned...');
    }
  };

  return (
    <CachedTileLayer
      attribution={`Data and Imagery: &copy; <a href="https://www.arena.net/" target="_blank">ArenaNet</a></br> 
                    Additional imagery by: <a href="https://blog.thatshaman.com/" target="_blank">that_shaman</a>`}
      url={tilesURL}
      minZoom={1}
      maxZoom={8}
      maxNativeZoom={7}
      noWrap={true}
      bounds={maxBounds}
      subdomains={['1', '2', '3', '4']}
    />
  );
}
