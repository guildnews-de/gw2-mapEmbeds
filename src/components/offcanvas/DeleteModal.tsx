import React from 'react';
import { Button, Modal, ModalProps } from 'react-bootstrap';
import { useAppDispatch } from '../../redux/hooks';
import { toggleModal } from '../../redux/slice/appSlice';
import { getStorageInfo, removeTile } from 'leaflet.offline';
import { tilesURL } from '../../constants';


function DeleteModal(props: ModalProps) {
  const dispatch = useAppDispatch();

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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Kartendaten löschen?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Die Guild Wars 2 Karten Bilder werden nach dem laden lokal gespeichert, um eure Ladezeiten zu verkürzen.
          Veraltete Karten werden automatisch aktualisiert. Willst du die gepeicherten Daten dennoch löschen?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {dispatch(toggleModal()) && clearTiles()}}>Löschen!</Button>
        <Button onClick={() => dispatch(toggleModal())}>Abbrechen</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
