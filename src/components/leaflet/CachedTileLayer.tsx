import {
  createElementObject,
  createTileLayerComponent,
  updateGridLayer,
  withPane,
} from '@react-leaflet/core';
import { tileLayer, type TileLayer } from 'leaflet';
import { getBlobByKey, downloadTile, saveTile } from 'leaflet.offline';
import { TileLayerProps } from 'react-leaflet';

type btrTileLayerOptions = ReturnType<typeof withPane>;

export function brtTileLayer(
  urlTemplate: string,
  options: btrTileLayerOptions,
) {
  const brtLayer = tileLayer(urlTemplate, options);

  brtLayer.on('tileloadstart', (event) => {
    const { tile } = event;
    const url = tile.src;
    // reset tile.src, to not start download yet
    tile.src = '';
    getBlobByKey(url).then((blob) => {
      if (blob) {
        tile.src = URL.createObjectURL(blob);
        console.debug(`Loaded ${url} from idb`);
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
        createdAt: Date.now(),
      };
      downloadTile(url)
        .then((dl) => saveTile(tileInfo, dl))
        .then(() => console.debug(`Saved ${url} in idb`));
    });
  });

  return brtLayer;
}

export const CachedTileLayer = createTileLayerComponent<
  TileLayer,
  TileLayerProps
>(
  function createTileLayer({ url, ...options }, context) {
    const layer = brtTileLayer(url, withPane(options, context));
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
