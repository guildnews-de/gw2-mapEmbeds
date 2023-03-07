/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Offcanvas, Button } from 'react-bootstrap';
import LeafletComp from './leaflet';

import { faArrowsLeftRight, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { closeCanvas, toggleCanvas } from '../slice/appSlice';
import type { RootState } from '../store';

import './CanvasToggle.css';

const mapStateToProps = (state: RootState) => {
  const { open } = state.app.canvas;
  const { active, groups } = state.marker;
  const marks = active && groups![active] ? groups![active] : 'none';
  return {
    open: open,
    activeMark: marks,
  };
};

const mapDispatchToProps = {
  closeCanvas,
  toggleCanvas,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxUIProps = ConnectedProps<typeof connector>;

/* interface UIProps extends ReduxUIProps {
  open: boolean;
} */

class BootstrapUI extends Component<ReduxUIProps> {
  render() {
    // eslint-disable-next-line no-unused-vars
    const { open, activeMark, toggleCanvas, closeCanvas } = this.props;
    const slug = open ? 'open' : 'close';
    return (
      <>
        <Button
          className={`canvas-toggle toggle-${slug}`}
          variant="secondary"
          size="sm"
          onClick={() => toggleCanvas()}
        >
          <FontAwesomeIcon icon={faArrowsLeftRight} />
          <br />
          <br />
          <FontAwesomeIcon icon={faMapLocationDot} />
          <br />
          <br />
          <FontAwesomeIcon icon={faArrowsLeftRight} />
        </Button>
        <Offcanvas
          show={open}
          scroll={true}
          backdrop={false}
          onHide={() => closeCanvas()}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <LeafletComp />
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }
}

export default connector(BootstrapUI);
