import React from 'react';
import { Marker, Tooltip, useMap } from 'react-leaflet';
import { icon } from 'leaflet';

import { GW2ApiPoi } from '../../../redux/apiMiddleware';
import {
  star_blue,
  heart,
  heropoint,
  landmark,
  vista,
  waypoint,
} from './assets';

function GW2Marker(props: { markers: GW2ApiPoi[], perm?: boolean }) {
  const map = useMap();
  const { markers } = props;

  const iconSwitch = (key: string = '') => {
    let png: string;
    switch (key) {
      case 'heart':
        png = heart;
        break;

      case 'heropoint':
        png = heropoint;
        break;

      case 'landmark':
        png = landmark;
        break;

      case 'vista':
        png = vista;
        break;

      case 'waypoint':
        png = waypoint;
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
          position={map.unproject([el.coord[0], el.coord[1]], map.getMaxZoom())}
        >
          {el.name &&
          <Tooltip direction="top" offset={[0, -10]} permanent={props.perm ? true : false}>
            {el.name}
          </Tooltip>
          }
        </Marker>
      ))}
    </>
  );
}

export default GW2Marker;
