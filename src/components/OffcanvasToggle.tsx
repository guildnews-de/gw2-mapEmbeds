import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faMapLocationDot,
} from '@fortawesome/free-solid-svg-icons';

import { toggleCanvas } from '../redux/slice/appSlice';
import type { RootState } from '../redux/store';

import './OffcanvasToggle.scss';

const mapStateToProps = (state: RootState) => {
  const { open } = state.app.canvas;
  return {
    open: open,
  };
};

const mapDispatchToProps = {
  toggleCanvas,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type OffcanvasToggle_ConnectedProps = ConnectedProps<typeof connector>;

interface OffcanvasToggleProps extends OffcanvasToggle_ConnectedProps {
  className?: string;
}

class OffcanvasToggle extends Component<OffcanvasToggleProps> {
  render() {
    const { className, open, toggleCanvas } = this.props;
    const arrow = !open ? faArrowLeft : faArrowRight;
    return (
      <Button
        className={`offcanvas-toggle ${className}`}
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
    );
  }
}

export default connector(OffcanvasToggle);
