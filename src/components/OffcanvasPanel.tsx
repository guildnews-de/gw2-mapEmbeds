import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Offcanvas, Button } from 'react-bootstrap';
import LLContainer from './leaflet/LLContainer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faMapLocationDot,
} from '@fortawesome/free-solid-svg-icons';

import { closeCanvas, toggleCanvas } from '../redux/slice/appSlice';
import { fetchMap } from '../redux/slice/apiSlice';
import { setActiveMap } from '../redux/slice/mapSlice';
import { MarkerEmbed } from '../App';
import type { RootState } from '../redux/store';

import './OffcanvasPanel.scss';

const mapStateToProps = (state: RootState) => {
  const { open } = state.app.canvas;
  return {
    open: open,
  };
};

const mapDispatchToProps = {
  closeCanvas,
  toggleCanvas,
  setActiveMap,
  fetchMap,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxOffcanvasProps = ConnectedProps<typeof connector>;

interface OffcanvasPanelProps extends ReduxOffcanvasProps {
  dataset: MarkerEmbed['dataset'];
}

class OffcanvasPanel extends Component<OffcanvasPanelProps> {
  constructor(props: OffcanvasPanelProps) {
    super(props);
    const { setActiveMap, fetchMap, dataset } = props;

    if (dataset.gw2Maps) {
      fetchMap({ id: Number(dataset.gw2Maps), lang: 'de' });
      setActiveMap(Number(dataset.gw2Maps));
    }
  }

  /*   componentDidMount(): void {
    console.log('mount action');
    this.fetchMap({ ids: [Number(this.mapID!)], lang: 'de' });
  } */

  render() {
    const { open, toggleCanvas, closeCanvas } = this.props;
    const slug = open ? 'open' : 'close';
    const arrow = !open ? faArrowLeft : faArrowRight;
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
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <LLContainer />
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }
}

export default connector(OffcanvasPanel);
