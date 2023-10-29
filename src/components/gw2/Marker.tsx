import React from 'react';
import { Marker, Polyline, Tooltip, useMap } from 'react-leaflet';
import { icon, type LatLngExpression, type PathOptions } from 'leaflet';

import {
  heart,
  heropoint,
  landmark,
  vista,
  waypoint,
  star_blue,
  star_red,
  star_rose,
  star_green,
  star_yellow,
} from './assets';
import { GW2Point, GW2PointGroup } from '../../common/classes';
import type { GW2ApiPoi } from '../../common/interfaces';

import defaultIcon from 'leaflet/dist/images/marker-icon.png';
import './tooltip.scss';

export function GuideMarker(props: { markers: GW2PointGroup; perm?: boolean }) {
  const map = useMap();
  const { markers, perm } = props;
  const { points, mode } = markers;
  const LatLngPoints: LatLngExpression[] = [];

  if (points) {
    points.forEach((gw2Point) => {
      LatLngPoints.push(
        map.unproject([gw2Point.x, gw2Point.y], map.getMaxZoom()),
      );
    });
  }

  const pathPropsMod = (key = '') => {
    const pathProps: PathOptions = {
      color: 'DodgerBlue',
      weight: 8,
      opacity: 0.8,
      lineCap: 'round',
      lineJoin: 'round',
    };
    switch (key) {
      case 'red':
        pathProps.color = 'Crimson';
        break;
      case 'rose':
        pathProps.color = 'MediumVioletRed';
        break;
      case 'green':
        pathProps.color = 'LimeGreen';
        break;
      case 'yellow':
        pathProps.color = 'Yellow';
        break;
      default:
        pathProps.color = 'DodgerBlue';
        break;
    }
    return pathProps;
  };

  return (
    <>
      {mode === 'line' && (
        <Polyline
          pathOptions={pathPropsMod(points[0].type)}
          positions={LatLngPoints}
          className="gw2Path"
        />
      )}
      {points.map((el, i) => (
        <DefaultMark gw2poi={el} perm={perm} key={i} />
      ))}
    </>
  );
}

export function PoiMarker(props: { markers: GW2ApiPoi[]; perm?: boolean }) {
  const { markers, perm } = props;

  return (
    <>
      {markers.map((el, i) => (
        <DefaultMark
          gw2poi={
            new GW2Point({ tupel: el.coord, name: el.name, type: el.type })
          }
          perm={perm}
          key={i}
        />
      ))}
    </>
  );
}

interface DefaultMarkProps {
  gw2poi: GW2Point;
  perm: boolean | undefined;
}

function DefaultMark(props: DefaultMarkProps) {
  const map = useMap();
  const { gw2poi } = props;

  return (
    <Marker
      icon={LeafletIcon(gw2poi.type)}
      position={map.unproject([gw2poi.x, gw2poi.y], map.getMaxZoom())}
    >
      {gw2poi.name && (
        <Tooltip
          direction="right"
          offset={[-8, 0]}
          permanent={props.perm ? true : false}
        >
          {gw2poi.name}
        </Tooltip>
      )}
    </Marker>
  );
}

function LeafletIcon(name = '') {
  let png: string;

  switch (name) {
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
    case 'blue':
      png = star_blue;
      break;
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
      png = defaultIcon;
      break;
  }

  return icon({
    iconUrl: png,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}
