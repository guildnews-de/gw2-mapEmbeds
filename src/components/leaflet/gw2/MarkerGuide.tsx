import React from 'react';
import { Marker, Polyline, Tooltip, useMap } from 'react-leaflet';
import {  LatLngExpression, PathOptions, icon } from 'leaflet';

import { GW2PointGroup } from './GW2Point';
import {
  star_blue,
  star_red,
  star_rose,
  star_green,
  star_yellow,
} from './assets';

import './tooltip.scss';

function MarkerGuide(props: { markers: GW2PointGroup; perm?: boolean }) {
  const map = useMap();
  const { markers } = props;
  const LatLngPoints: LatLngExpression[] = []

  if (markers) {
    markers.points.forEach( gw2Point => {
      LatLngPoints.push(
        map.unproject([gw2Point.x, gw2Point.y], map.getMaxZoom())
      )
    });
  }

  const pathProps: PathOptions = {
    color: 'DodgerBlue',
    weight: 8,
    opacity: 0.8,
    lineCap: 'round',
    lineJoin: 'round'
    
  }
  const iconSwitch = (key = '') => {
    let png: string;
    switch (key) {
      case 'red':
        png = star_red;
        pathProps.color = 'Crimson';
        break;

      case 'rose':
        png = star_rose;
        pathProps.color = 'MediumVioletRed';
        break;

      case 'green':
        png = star_green;
        pathProps.color = 'LimeGreen';
        break;

      case 'yellow':
        png = star_yellow;
        pathProps.color = 'Yellow';
        break;

      default:
        png = star_blue;
        pathProps.color = 'DodgerBlue'
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
      {markers.points.map((el, i) => (
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
      {markers.mode === 'line' && 
      <Polyline pathOptions={pathProps} positions={LatLngPoints} />

      }
    </>
  );
}

export default MarkerGuide;
