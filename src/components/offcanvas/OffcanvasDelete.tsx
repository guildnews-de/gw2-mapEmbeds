import React from 'react';
import { Button } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { getStorageInfo, removeTile } from 'leaflet.offline';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import './OffcanvasDelete.scss';
import { tilesURL } from '../../constants';

function OffcanvasDelete() {
  async function clearTiles() {
    const tiles = await getStorageInfo(tilesURL);
    const minCreatedAt = Date.now();
    let count = 0;
    await Promise.all(
      tiles.map((tile) => {
        tile.createdAt < minCreatedAt
          ? removeTile(tile.key)
          : Promise.resolve();
        count++;
      }),
    );
    if (count > 0) {
      console.debug(count + ' GW2 tiles manually cleaned...');
    }
  }

  return (
    <Button
      className={`offcanvas-delete`}
      variant="secondary"
      size="sm"
      onClick={clearTiles}
    >
      <FontAwesomeIcon icon={faTrashCan} />
    </Button>
  );
}

export default OffcanvasDelete;
