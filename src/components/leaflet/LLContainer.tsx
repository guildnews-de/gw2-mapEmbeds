import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import type { RootState } from '../../redux/store';

import { MapContainer, Pane, LayerGroup, LayersControl } from 'react-leaflet';
import { CRS, LatLng, PointTuple } from 'leaflet';

import { GW2ApiPoi, GW2ApiSector } from '../../redux/apiMiddleware';
import { GW2Tiles, GW2Marker, GW2Poi, GW2Sectors } from './gw2';
import { GW2Point } from './GW2Point';
import ClickedPosition from './LLClickedPos';

import 'leaflet/dist/leaflet.css';
import './LLContainer.scss';
import Recenter from './LLRecenter';

const mapStateToProps = (state: RootState) => {
  const { bounds, activeMaps, center } = state.map;
  const { active } = state.marker;

  const marker = active === 'none' ? undefined : state.marker.groups![active];

  const apiData = {
    gw2Bounds: bounds,
    marker: marker,
    poi: {},
    sectors: {},
    center: center,
  } as {
    gw2Bounds: [number, number];
    marker: GW2Point[];
    poi: Record<number, GW2ApiPoi>;
    sectors: Record<number, GW2ApiSector>;
    center: PointTuple;
  };

  activeMaps.forEach((id) => {
    const { poi, sectors } = state.api.response[id];
    apiData.poi = {
      ...apiData.poi,
      ...poi,
    };
    apiData.sectors = {
      ...apiData.sectors,
      ...sectors,
    };
  });

  return apiData;
};

const connector = connect(mapStateToProps);
type LLContainerReduxProps = ConnectedProps<typeof connector>;

class LLContainer extends Component<LLContainerReduxProps> {
  private sectors;
  private poi: GW2ApiPoi[] = [];

  constructor(props: LLContainerReduxProps) {
    super(props);

    const { sectors, poi } = props;
    this.sectors = sectors;

    if (!poi) {
      return;
    }
    Object.entries(poi!).forEach((entry) => {
      this.poi.push(entry[1]);
    });
  }

  render() {
    const { gw2Bounds, marker } = this.props;
    const { Simple } = CRS;
    console.debug(this.sectors);
    return (
      <MapContainer
        crs={Simple}
        scrollWheelZoom={true}
        zoom={2}
        center={new LatLng(0, 0)}
        minZoom={1}
        maxZoom={7}
        doubleClickZoom={false}
      >
        <GW2Tiles bounds={gw2Bounds} />
        <LayersControl>
          <Pane
            name="guide-marker"
            style={{ zIndex: '700' }}
            className="leaflet-marker-pane"
          >
            {marker && (
              <LayersControl.Overlay name="Guide Marker" checked>
                <LayerGroup>
                  <GW2Marker markers={marker!} perm={true} />
                </LayerGroup>
              </LayersControl.Overlay>
            )}
          </Pane>
          {this.sectors && <GW2Sectors sectors={this.sectors} />}
          {this.poi && (
            <LayersControl.Overlay name="Land Marker" checked>
              <LayerGroup>
                <GW2Poi markers={this.poi} />
              </LayerGroup>
            </LayersControl.Overlay>
          )}
        </LayersControl>
        <ClickedPosition />
        {marker && <Recenter marker={marker} />}
      </MapContainer>
    );
  }
}

export default connector(LLContainer);
