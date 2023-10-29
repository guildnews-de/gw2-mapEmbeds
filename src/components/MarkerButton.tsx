/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';

import { openCanvas } from '../redux/slice/appSlice';
import { pushMarker, setMarker, wipeCurrent } from '../redux/slice/markerSlice';
import { GW2Point, GW2PointGroup } from '../common/classes';

import type { MarkerEmbed } from '../common/interfaces';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

interface MarkerButtonProps extends ButtonProps {
  hash: string;
  dataset: MarkerEmbed['dataset'];
  className: string;
}

export function MarkerButton(props: MarkerButtonProps) {
  const dispatch = useAppDispatch();
  const { active, groupNames } = useAppSelector((state) => state.marker);
  const { hash, dataset, className } = props;

  useEffect(() => {
    if (!groupNames || groupNames?.indexOf(hash) != -1) {
      const { gw2mapMarker, gw2mapColor, gw2mapMode } = dataset;
      const type = gw2mapColor ? gw2mapColor : 'blue';

      const points: GW2Point[] = [];
      const rawArray = gw2mapMarker?.split(';');
      rawArray?.forEach((string) => {
        const childArray = string.split(',');
        if (childArray.length >= 3) {
          const x = Number(childArray[1]);
          const y = Number(childArray[2]);
          if (Number.isNaN(x) || Number.isNaN(y)) {
            points.push(
              new GW2Point({ tupel: [0, 0], name: childArray[0], type: type }),
            );
          } else {
            points.push(
              new GW2Point({ tupel: [x, y], name: childArray[0], type: type }),
            );
          }
        }
      });
      const group = new GW2PointGroup({
        points: points,
        mode: gw2mapMode,
      });
      dispatch(pushMarker([hash, group]));
    }
  }, [dispatch, groupNames, dataset, hash]);

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
        dispatch(wipeCurrent());
      }}
      className={className}
    >
      {!(active === hash) ? onText : offText}
    </Button>
  );
}
