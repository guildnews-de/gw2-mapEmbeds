import React, { Component, CSSProperties } from 'react';
import axios from 'axios';
import { connect, ConnectedProps } from 'react-redux';
import { Offcanvas, Spinner } from 'react-bootstrap';
import LLContainer from './leaflet/MapContainer';
//import { getStorageInfo, removeTile } from 'leaflet.offline';

import {
  closeCanvas,
  setMapsLoaded,
  activateLL,
} from '../redux/slice/appSlice';
import { fetchMap } from '../redux/slice/apiSlice';
import {
  tileApiData,
  setTileDate,
  addActiveMap,
} from '../redux/slice/mapSlice';
import { MarkerEmbed } from '../App';
import type { RootState } from '../redux/store';
import OffcanvasToggle from './offcanvas/OffcanvasToggle';
import OffcanvasDelete from './offcanvas/OffcanvasDelete';
import DeleteModal from './offcanvas/DeleteModal';
import { tilesURLDate } from '../constants';

import './OffcanvasPanel.scss';
import OffcanvasWide from './offcanvas/OffcanvasWide';

const mapStateToProps = (state: RootState) => {
  const { open, wide, loadLL } = state.app.canvas;
  const { mapsLoaded, modal } = state.app;
  const { loading } = state.api;
  const ready = loading === false ? true : false;
  return {
    open: open,
    wide: wide,
    ready: ready,
    mapsLoaded: mapsLoaded,
    loadLL: loadLL,
    modal: modal,
  };
};

const mapDispatchToProps = {
  setTileDate,
  closeCanvas,
  addActiveMap,
  fetchMap,
  setMapsLoaded,
  activateLL,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxOffcanvasProps = ConnectedProps<typeof connector>;

interface OffcanvasPanelProps extends ReduxOffcanvasProps {
  dataset: MarkerEmbed['dataset'];
  className: string;
}

class OffcanvasPanel extends Component<OffcanvasPanelProps> {
  constructor(props: OffcanvasPanelProps) {
    super(props);
    const { mapsLoaded, setTileDate, dataset } = props; // Props
    const { fetchMap, addActiveMap, setMapsLoaded } = props; //Actions

    if (!mapsLoaded && dataset.gw2mapIds) {
      const ids = dataset.gw2mapIds.split(',');
      ids.forEach((id) => {
        const numID = Number(id);
        fetchMap({ id: numID, lang: 'de' });
        addActiveMap(numID);
      });

      axios.get(tilesURLDate).then(({ data }: { data: tileApiData }) => {
        setTileDate(data);
      });
      setMapsLoaded();
    }
  }

  componentDidMount(): () => void {
    const timeout = setTimeout(() => {
      this.props.activateLL();
    }, 3000);

    return () => clearTimeout(timeout);
  }

  render() {
    const { open, wide, loadLL, closeCanvas, modal, className } = this.props;
    const style: CSSProperties = {
      flexDirection: 'column',
      justifyContent: 'center',
    };
    const cls = wide ? `${className} wide` : className;
    return (
      <>
        <DeleteModal show={modal} className={className} />
        <OffcanvasToggle className={className+" toggle-closed"} />
        <Offcanvas
          show={open}
          scroll={true}
          backdrop={false}
          onHide={() => closeCanvas()}
          placement="end"
          className={cls}
        >
          <Offcanvas.Header style={style}>
            <OffcanvasWide/>
            <OffcanvasToggle className="toggle-opened" />
            <OffcanvasDelete />
          </Offcanvas.Header>
          <Offcanvas.Body>
            {loadLL ? (
              <LLContainer />
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
}

export default connector(OffcanvasPanel);
