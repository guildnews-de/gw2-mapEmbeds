import React, { CSSProperties, useEffect } from 'react';
import axios from 'axios';
import { Offcanvas, OffcanvasProps, Spinner } from 'react-bootstrap';

import {
  closeCanvas,
  setMapsLoaded,
  activateLL,
  setDebug,
} from '../redux/slice/appSlice';
import { fetchMap } from '../redux/slice/apiSlice';
import {
  tileApiData,
  setTileDate,
  addActiveMap,
} from '../redux/slice/mapSlice';
import { GW2MapContainer } from './leaflet/MapContainer';
import {
  DeleteModal,
  DeleteButton,
  OffcanvasWide,
  OffcanvasToggle,
} from './OffcanvasElements';
import { tilesURLDate } from '../common/constants';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

import type { MapsInitEmbedData } from '../common/interfaces';

import './OffcanvasPanel.scss';

interface OffcanvasPanelProps extends OffcanvasProps {
  elementData: MapsInitEmbedData;
  className: string;
}

export function OffcanvasPanel(props: OffcanvasPanelProps) {
  const dispatch = useAppDispatch();

  const { elementData, className } = props;
  const { mapsLoaded, modal, debug } = useAppSelector((state) => state.app);

  if (elementData.debug && debug === false) {
    dispatch(setDebug(true));
  }

  const { open, wide, loadLL } = useAppSelector((state) => state.app.canvas);
  const { tileDate } = useAppSelector((state) => state.map);

  const cls = wide ? `${className} wide` : className;
  const style: CSSProperties = {
    flexDirection: 'column',
    justifyContent: 'center',
  };

  useEffect(() => {
    if (!tileDate) {
      axios
        .get(tilesURLDate)
        .then(({ data }: { data: tileApiData }) => {
          dispatch(setTileDate(data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [dispatch, tileDate]);

  useEffect(() => {
    const { ids } = elementData;
    if (ids.length > 0 && !mapsLoaded) {
      ids.forEach((id) => {
        const numID = Number(id);
        dispatch(fetchMap({ id: numID, lang: 'de' }));
        dispatch(addActiveMap(numID));
      });
      dispatch(setMapsLoaded());
    }
  }, [dispatch, mapsLoaded, elementData]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(activateLL());
    }, 3000);

    return () => clearTimeout(timeout);
  }, [dispatch]);

  return (
    <>
      <DeleteModal show={modal} className={className} />
      <OffcanvasToggle className={className + ' toggle-closed'} />
      <Offcanvas
        show={open}
        scroll={true}
        backdrop={false}
        onHide={() => dispatch(closeCanvas())}
        placement="end"
        className={cls}
      >
        <Offcanvas.Header style={style}>
          <OffcanvasWide />
          <OffcanvasToggle className="toggle-opened" />
          <DeleteButton />
        </Offcanvas.Header>
        <Offcanvas.Body>
          {loadLL ? (
            <GW2MapContainer />
          ) : (
            <div className="offcanvas-spinner">
              <Spinner animation="border" role="status">
                <span className="visually-hidden"></span>
              </Spinner>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
