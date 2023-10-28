import React from 'react';
import { Button } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { toggleWide } from '../../redux/slice/appSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMaximize, faMinimize } from '@fortawesome/free-solid-svg-icons';

import './OffcanvasDelete.scss';

function OffcanvasWide() {
  const dispatch = useAppDispatch();
  const wide = useAppSelector((state) => state.app.canvas.wide);

  return (
    <Button
      className={`offcanvas-delete`}
      variant="secondary"
      size="sm"
      onClick={() => dispatch(toggleWide())}
    >
      <FontAwesomeIcon icon={wide ? faMinimize : faMaximize} />
    </Button>
  );
}

export default OffcanvasWide;
