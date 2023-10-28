import React from 'react';
import { Button } from 'react-bootstrap';
import { useAppDispatch } from '../../redux/hooks';
import { toggleModal } from '../../redux/slice/appSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import './OffcanvasDelete.scss';

function OffcanvasDelete() {
  const dispatch = useAppDispatch();

  return (
    <Button
      className={`offcanvas-delete`}
      variant="secondary"
      size="sm"
      onClick={() => dispatch(toggleModal())}
    >
      <FontAwesomeIcon icon={faTrashCan} />
    </Button>
  );
}

export default OffcanvasDelete;
