import React from 'react';
import { MapContainer, Pane, LayerGroup, LayersControl } from 'react-leaflet';
import { CRS, LatLng } from 'leaflet';

import { GW2ApiPoi, GW2ApiSector } from '../../redux/apiMiddleware';
import { useAppSelector } from '../../redux/hooks';

import { GW2Tiles, GuideMarker, PoiMarker, GW2Sectors } from './gw2';
import ClickedPosition from './LocationMarker';
import Recenter from './Recenter';

import './MapContainer.scss';

function LLContainer() {
  // Grab redux state info
  const { bounds, activeMaps } = useAppSelector((state) => state.map);
  const { active, groups } = useAppSelector((state) => state.marker);
  const apiData = useAppSelector((state) => state.api.response);

  // Collect conditional data
  const marker = active ? groups?.[active] : undefined;
  let mapPoi: Record<number, GW2ApiPoi> = {};
  let mapSectors: Record<number, GW2ApiSector> = {};
  activeMaps.forEach((id) => {
    if (apiData[id] != undefined) {
      const { poi, sectors } = apiData[id];
      mapPoi = {
        ...mapPoi,
        ...poi,
      };
      mapSectors = {
        ...mapSectors,
        ...sectors,
      };
    }
  });

  const poiArray: GW2ApiPoi[] = [];
  Object.entries(mapPoi).forEach((entry) => {
    poiArray.push(entry[1]);
  });

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
        {mapSectors && <GW2Sectors sectors={mapSectors} />}
        {poiArray.length > 0 && (
          <LayersControl.Overlay name="Land Marker" checked>
            <LayerGroup>
              <PoiMarker markers={poiArray} />
            </LayerGroup>
          </LayersControl.Overlay>
        )}
      </LayersControl>
      <ClickedPosition />
      {marker && <Recenter marker={marker.points} />}
    </MapContainer>
  );
}

export default LLContainer;
