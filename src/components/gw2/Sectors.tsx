import React from 'react';
import {
  LayerGroup,
  LayersControl,
  Polyline,
  useMap,
  Marker,
} from 'react-leaflet';
import { divIcon, type LatLng } from 'leaflet';
import type { GW2ApiSector } from '../../common/interfaces';

import './Sectors.scss';

interface GW2SectorsProps {
  sectors: Record<number, GW2ApiSector>;
}

export function GW2Sectors(props: GW2SectorsProps) {
  const map = useMap();
  const unproject = (pos: [number, number]) => {
    return map.unproject(pos, map.getMaxZoom() - 1);
  };
  const lines: LatLng[][] = [];
  const names: [string, LatLng][] = [];
  Object.entries(props.sectors).forEach(([, sect]) => {
    const bounds: LatLng[] = [];
    sect.bounds.forEach((val) => bounds.push(unproject(val)));
    lines.push(bounds);
    names.push([sect.name, unproject(sect.coord)]);
  });

  return (
    <>
      <LayersControl.Overlay name="Sektor Grenzen" checked>
        <LayerGroup>
          {lines.map((el, i) => (
            <Polyline color="white" positions={el} key={i} />
          ))}
        </LayerGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Sektor Namen" checked>
        <LayerGroup>
          {names.map((el, i) => (
            <GW2MapText text={el[0]} coord={el[1]} key={i} />
          ))}
        </LayerGroup>
      </LayersControl.Overlay>
    </>
  );
}

interface GW2MapTextProps {
  text: string;
  coord: LatLng;
}

export function GW2MapText(props: GW2MapTextProps) {
  const { text, coord } = props;

  const name = divIcon({
    html: `<span>${text}</span>`,
    className: 'gw2-map-text',
  });

  return <Marker position={coord} icon={name} zIndexOffset={-100} />;
}
