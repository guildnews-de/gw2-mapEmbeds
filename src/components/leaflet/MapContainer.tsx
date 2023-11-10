import React, { useMemo } from 'react';
import { MapContainer, Pane, LayerGroup, LayersControl } from 'react-leaflet';
import { CRS, LatLng } from 'leaflet';

import { useAppSelector } from '../../redux/hooks';
import { GW2Tiles } from '../GW2Tiles';
import { GW2Sectors } from '../gw2/Sectors';
import { GuideMarker, PoiMarker } from '../gw2/Marker';
import { LocationMarker } from './LocationMarker';
import { MapCenter, MarkerBounds } from './MapCenter';

import type { GW2ApiPoi, GW2ApiSector } from '../../common/interfaces';

import './MapContainer.scss';

export function GW2MapContainer() {
  // Grab redux state info
  const { bounds, activeMaps } = useAppSelector((state) => state.map);
  const { active, groups } = useAppSelector((state) => state.marker);
  const apiData = useAppSelector((state) => state.api.response);

  // Collect conditional data
  const marker =
    groups && active && groups[active] ? groups[active] : undefined;

  const mapData = useMemo(() => {
    const stack = {
      poi: {} as Record<number, GW2ApiPoi>,
      sectors: {} as Record<number, GW2ApiSector>,
    };
    activeMaps.forEach((id) => {
      if (apiData[id] != undefined) {
        const { poi, sectors } = apiData[id];
        stack.poi = {
          ...stack.poi,
          ...poi,
        };
        stack.sectors = {
          ...stack.sectors,
          ...sectors,
        };
      }
    });
    return stack;
  }, [activeMaps, apiData]);

  return (
    <MapContainer
      crs={CRS.Simple}
      scrollWheelZoom={true}
      zoom={2}
      center={new LatLng(0, 0)}
      minZoom={1}
      maxZoom={7}
      doubleClickZoom={false}
    >
      <GW2Tiles bounds={bounds} />
      <LayersControl>
        <Pane
          name="guide-marker"
          style={{ zIndex: '700' }}
          className="leaflet-marker-pane"
        >
          {marker && (
            <LayersControl.Overlay name="Guide Marker" checked>
              <LayerGroup>
                <GuideMarker markers={marker} perm={true} />
              </LayerGroup>
            </LayersControl.Overlay>
          )}
        </Pane>
        {mapData.sectors && <GW2Sectors sectors={mapData.sectors} />}
        {Object.keys(mapData.poi).length > 0 && (
          <LayersControl.Overlay name="Land Marker" checked>
            <LayerGroup>
              <PoiMarker markers={mapData.poi} />
            </LayerGroup>
          </LayersControl.Overlay>
        )}
      </LayersControl>
      <LocationMarker />
      {marker && <MarkerBounds marker={marker.points} />}
      {<MapCenter />}
    </MapContainer>
  );
}
