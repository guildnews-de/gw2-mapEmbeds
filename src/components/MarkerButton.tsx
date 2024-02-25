import React, { useEffect } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';

import { openCanvas } from '../redux/slice/appSlice';
import { pushMarker, setMarker } from '../redux/slice/markerSlice';
import { GW2Point, GW2PointGroup } from '../common/classes';

import type { MarkerEmbedData } from '../common/interfaces';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setDragged } from '../redux/slice/mapSlice';

interface MarkerButtonProps extends ButtonProps {
  hash: string;
  elementData: MarkerEmbedData;
  className: string;
}

export function MarkerButton(props: MarkerButtonProps) {
  const dispatch = useAppDispatch();
  const { active, groupNames } = useAppSelector((state) => state.marker);
  const { hash, elementData, className } = props;

  useEffect(() => {
    if (!groupNames || groupNames?.indexOf(hash) === -1) {
      const { marker, color, mode } = elementData;

      const points: GW2Point[] = [];
      marker.forEach((string) => {
        const childArray = string.split(',');
        if (childArray.length >= 3) {
          const [name = '', x = '2', y = '2'] = childArray;

          points.push(
            new GW2Point({
              tupel: [Number(x), Number(y)],
              name: name,
              type: color,
            }),
          );
        }
      });
      const group = new GW2PointGroup({
        points: points,
        mode: mode,
      });
      dispatch(pushMarker([hash, group]));
    }
  }, [dispatch, groupNames, elementData, hash]);

  const onText = 'Karte zeigen';
  const offText = 'jetzt sichtbar';

  return (
    <Button
      variant="primary"
      size="sm"
      active={!(hash === active)}
      onClick={() => {
        dispatch(setMarker(hash));
        dispatch(openCanvas());
        dispatch(setDragged(false));
      }}
      className={className}
    >
      {!(active === hash) ? onText : offText}
    </Button>
  );
}
