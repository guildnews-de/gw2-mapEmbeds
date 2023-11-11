import React, { useMemo } from 'react';
import { Button, Modal, type ModalProps } from 'react-bootstrap';
import { getStorageInfo, removeTile } from 'leaflet.offline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashCan,
  faMaximize,
  faMinimize,
  faArrowLeft,
  faArrowRight,
  faMapLocationDot,
} from '@fortawesome/free-solid-svg-icons';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {
  toggleModal,
  toggleWide,
  toggleCanvas,
  setDelayed,
} from '../redux/slice/appSlice';
import { tilesURL } from '../common/constants';

import './OffcanvasElements.scss';
import { setRecenter } from '../redux/slice/mapSlice';

export function DeleteModal(props: ModalProps) {
  const dispatch = useAppDispatch();
  const { debug } = useAppSelector((state) => state.app);

  async function clearTiles() {
    const tiles = await getStorageInfo(tilesURL);
    const minCreatedAt = Date.now();
    let count = 0;
    await Promise.all(
      tiles.map((tile) => {
        tile.createdAt < minCreatedAt
          ? removeTile(tile.key).catch((err) => {
              console.error(err);
            })
          : Promise.resolve().catch((err) => {
              console.error(err);
            });
        count++;
      }),
    );
    if (count > 0) {
      debug && console.debug(count + ' GW2 tiles manually cleaned...');
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
          Die Guild Wars 2 Karten Bilder werden nach dem laden lokal
          gespeichert, um eure Ladezeiten zu verkürzen. Veraltete Karten werden
          automatisch aktualisiert. Willst du die gepeicherten Daten dennoch
          löschen?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            dispatch(toggleModal()) &&
              clearTiles().catch((err) => {
                console.error(err);
              });
          }}
        >
          Löschen!
        </Button>
        <Button onClick={() => dispatch(toggleModal())}>Abbrechen</Button>
      </Modal.Footer>
    </Modal>
  );
}

export function DeleteButton() {
  const dispatch = useAppDispatch();

  return (
    <Button
      className={`offcanvas-secondary`}
      variant="secondary"
      size="sm"
      onClick={() => dispatch(toggleModal())}
    >
      <FontAwesomeIcon icon={faTrashCan} />
    </Button>
  );
}

interface OffcanvasToggleProps {
  className?: string;
}

export function OffcanvasToggle(props: OffcanvasToggleProps) {
  const { open, delayed } = useAppSelector((state) => state.app.canvas);
  const { debug } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const { className } = props;
  const arrow = !open ? faArrowLeft : faArrowRight;

  useMemo(() => {
    if (open && delayed) {
      dispatch(setDelayed(false));
      const timeout = setTimeout(() => {
        dispatch(setRecenter(true));
        debug && console.debug('Delayed "setRecenter" done...');
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [dispatch, open, delayed, debug]);

  return (
    <Button
      className={`offcanvas-toggle ${className}`}
      variant="secondary"
      size="sm"
      onClick={() => {
        dispatch(toggleCanvas());
        // if (open) {
        // dispatch(setWait(true));
        // }
      }}
    >
      <FontAwesomeIcon icon={arrow} />
      <br />
      <br />
      <FontAwesomeIcon icon={faMapLocationDot} />
      <br />
      <br />
      <FontAwesomeIcon icon={arrow} />
    </Button>
  );
}

export function OffcanvasWide() {
  const dispatch = useAppDispatch();
  const wide = useAppSelector((state) => state.app.canvas.wide);

  return (
    <Button
      className={`offcanvas-secondary`}
      variant="secondary"
      size="sm"
      onClick={() => dispatch(toggleWide())}
    >
      <FontAwesomeIcon icon={wide ? faMinimize : faMaximize} />
    </Button>
  );
}
