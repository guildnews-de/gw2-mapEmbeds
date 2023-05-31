import React from 'react';
import { Marker, Tooltip, useMap } from 'react-leaflet';
import { icon } from 'leaflet';

import { GW2Point } from './GW2Point';
import {
  star_blue,
  star_red,
  star_rose,
  star_green,
  star_yellow,
} from './assets';

import './tooltip.scss';

function MarkerGuide(props: { markers: GW2Point[]; perm?: boolean }) {
  const map = useMap();
  const { markers } = props;

  const iconSwitch = (key: string = '') => {
    let png: string;
    switch (key) {
      case 'red':
        png = star_red;
        break;

      case 'rose':
        png = star_rose;
        break;

      case 'green':
        png = star_green;
        break;

      case 'yellow':
        png = star_yellow;
        break;

      default:
        png = star_blue;
        break;
    }
    return icon({
      iconUrl: png,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  };

  return (
    <>
      {markers.map((el, i) => (
        <Marker
          key={i}
          icon={iconSwitch(el.type)}
          position={map.unproject([el.x, el.y], map.getMaxZoom())}
        >
          {el.name && (
            <Tooltip
              direction="right"
              offset={[-8, 0]}
              permanent={props.perm ? true : false}
            >
              {el.name}
            </Tooltip>
          )}
        </Marker>
      ))}
    </>
  );
}

export default MarkerGuide;
