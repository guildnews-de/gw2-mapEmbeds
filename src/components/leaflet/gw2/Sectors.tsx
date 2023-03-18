import { LatLng } from 'leaflet';
import React from 'react';
import { LayerGroup, LayersControl, Polyline, useMap } from 'react-leaflet';
import { GW2ApiSector } from '../../../redux/apiMiddleware';
import SectorText from './SectorText';

interface GW2SectorsProps {
  sectors: Record<number, GW2ApiSector>;
}

function GW2Sectors(props: GW2SectorsProps) {
  const map = useMap();
  const unproject = (pos: [number, number]) => {
    return map.unproject(pos, map.getMaxZoom());
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
            <SectorText text={el[0]} coord={el[1]} key={i} />
          ))}
        </LayerGroup>
      </LayersControl.Overlay>
    </>
  );
}

export default GW2Sectors;
