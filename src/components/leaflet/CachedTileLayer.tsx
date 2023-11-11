import {
  createElementObject,
  createTileLayerComponent,
  updateGridLayer,
  withPane,
} from '@react-leaflet/core';
import { TileEvent, tileLayer, type TileLayer } from 'leaflet';
import { getBlobByKey, downloadTile, saveTile } from 'leaflet.offline';
import type { TileLayerProps } from 'react-leaflet';

type TileLayerOptions = ReturnType<typeof withPane>;

interface TileUrlEvent extends TileEvent {
  target: {
    _url: string;
  };
}

export function leafletOfflineLayer(
  urlTemplate: string,
  options: TileLayerOptions,
) {
  const loLayer = tileLayer(urlTemplate, options);

  loLayer.on('tileloadstart', (event: TileUrlEvent) => {
    const { tile } = event;
    const url = tile.src;
    // reset tile.src, to not start download yet
    tile.src = '';
    getBlobByKey(url)
      .then((blob) => {
        if (blob) {
          tile.src = URL.createObjectURL(blob);
          // console.debug(`Loaded ${url} from idb`);
          return;
        }
        tile.src = url;
        // create helper function for it?
        const { x, y, z } = event.coords;
        const { _url: urlTemplate } = event.target;
        const tileInfo = {
          key: url,
          url,
          x,
          y,
          z,
          urlTemplate,
          createdAt: Date.now() / 1000,
        };
        downloadTile(url)
          .then((dl) => saveTile(tileInfo, dl))
          .catch((err) => {
            console.error(err);
          });
        //.then(() => console.debug(`Saved ${url} in idb`));
      })
      .catch((err) => {
        console.error(err);
      });
  });

  return loLayer;
}

export const CachedTileLayer = createTileLayerComponent<
  TileLayer,
  TileLayerProps
>(
  function createTileLayer({ url, ...options }, context) {
    const layer = leafletOfflineLayer(url, withPane(options, context));
    return createElementObject(layer, context);
  },
  function updateTileLayer(layer, props, prevProps) {
    updateGridLayer(layer, props, prevProps);

    const { url } = props;
    if (url != null && url !== prevProps.url) {
      layer.setUrl(url);
    }
  },
);
