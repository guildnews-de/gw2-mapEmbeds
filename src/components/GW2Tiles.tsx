import React, { useCallback, useEffect } from 'react';
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

  const { debug } = useAppSelector((state) => state.app);
  const { tileDate } = useAppSelector((state) => state.map);
  const { wide } = useAppSelector((state) => state.app.canvas);

  const cleanTileCache = useCallback(
    async (tileDate: number) => {
      const tiles = await getStorageInfo(tilesURL);
      let count = 0;
      await Promise.all(
        tiles.map((tile) => {
          if (tile.createdAt < tileDate) {
            debug && console.debug(tile.createdAt + '  ' + tileDate);
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
        debug && console.debug(count + ' old GW2 map tiles cleaned...');
      }
    },
    [debug],
  );

  useEffect(() => {
    cleanTileCache(tileDate).catch((err) => {
      console.error(err);
    });
    map.invalidateSize();
  }, [tileDate, map, wide, cleanTileCache]);

  useEffect(() => {
    map.invalidateSize();
  }, [map, wide]);

  return (
    <CachedTileLayer
      attribution={`Data and Imagery: &copy; <a href="https://www.arena.net/" target="_blank">ArenaNet</a></br> 
                    Additional imagery by: <a href="https://thatshaman.com/" target="_blank">that_shaman</a>`}
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
