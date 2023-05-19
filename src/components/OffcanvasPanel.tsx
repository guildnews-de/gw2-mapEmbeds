import React, { Component, CSSProperties } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Offcanvas, Button, Spinner } from 'react-bootstrap';
import LLContainer from './leaflet/LLContainer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faMapLocationDot,
} from '@fortawesome/free-solid-svg-icons';

import {
  closeCanvas,
  toggleCanvas,
  setMapsLoaded,
  activateLL,
} from '../redux/slice/appSlice';
import { fetchMap } from '../redux/slice/apiSlice';
import { addActiveMap } from '../redux/slice/mapSlice';
import { MarkerEmbed } from '../App';
import type { RootState } from '../redux/store';

import './OffcanvasPanel.scss';

const mapStateToProps = (state: RootState) => {
  const { open, loadLL } = state.app.canvas;
  const { mapsLoaded } = state.app;
  const { loading } = state.api;
  const ready = loading === false ? true : false;
  return {
    open: open,
    ready: ready,
    mapsLoaded: mapsLoaded,
    loadLL: loadLL,
  };
};

const mapDispatchToProps = {
  closeCanvas,
  toggleCanvas,
  addActiveMap,
  fetchMap,
  setMapsLoaded,
  activateLL,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxOffcanvasProps = ConnectedProps<typeof connector>;

interface OffcanvasPanelProps extends ReduxOffcanvasProps {
  dataset: MarkerEmbed['dataset'];
}

class OffcanvasPanel extends Component<OffcanvasPanelProps> {
  // Workround to prevent double mapID query
  // I don't know why it redraws the offcanvas
  //static loadMaps = true;

  constructor(props: OffcanvasPanelProps) {
    super(props);
    const { mapsLoaded, dataset } = props; // Props
    const { fetchMap, addActiveMap, setMapsLoaded } = props; //Actions

    if (!mapsLoaded && dataset.gw2mapIds) {
      const ids = dataset.gw2mapIds.split(',');
      ids.forEach((id) => {
        const numID = Number(id);
        fetchMap({ id: numID, lang: 'de' });
        addActiveMap(numID);
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
    const { open, loadLL, toggleCanvas, closeCanvas } = this.props;
    const slug = open ? 'open' : 'close';
    const arrow = !open ? faArrowLeft : faArrowRight;
    const spinnerBox: CSSProperties = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    };
    return (
      <>
        <Button
          className={`offcanvas-toggle toggle-${slug}`}
          variant="secondary"
          size="sm"
          onClick={() => toggleCanvas()}
        >
          <FontAwesomeIcon icon={arrow} />
          <br />
          <br />
          <FontAwesomeIcon icon={faMapLocationDot} />
          <br />
          <br />
          <FontAwesomeIcon icon={arrow} />
        </Button>
        <Offcanvas
          show={open}
          scroll={true}
          backdrop={false}
          onHide={() => closeCanvas()}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Guild Wars 2 Map-Tool</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {loadLL ? (
              <LLContainer />
            ) : (
              <div style={spinnerBox}>
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
