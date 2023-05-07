import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import type { RootState } from '../../redux/store';

import { MapContainer, Pane, LayerGroup, LayersControl } from 'react-leaflet';
import { CRS, LatLng } from 'leaflet';

import { GW2Tiles, GW2Marker, GW2Sectors } from './gw2';
import LocationMarker from './LocationMarker';
import { GW2ApiPoi } from '../../redux/apiMiddleware';

import 'leaflet/dist/leaflet.css';
import './LLContainer.scss';

const mapStateToProps = (state: RootState) => {
  const { bounds, activeMap } = state.map;
  const { active } = state.marker;

  const marker = active === 'none' ? undefined : state.marker.groups![active];
  const apiData = state.api.response[activeMap];

  return {
    gw2Bounds: bounds,
    marker: marker,
    apiData: apiData,
  };
};

const connector = connect(mapStateToProps);
type LLContainerReduxProps = ConnectedProps<typeof connector>;

class LLContainer extends Component<LLContainerReduxProps> {
  private sectors;
  private poi: GW2ApiPoi[] = [];

  constructor(props: LLContainerReduxProps) {
    super(props);

    const { sectors, poi } = props.apiData!;

    this.sectors = sectors;

    if (!poi) {
      return;
    }
    Object.entries(poi!).forEach((entry) => {
      this.poi.push(entry[1]);
    });
  }

  render() {
    const { gw2Bounds, marker, apiData } = this.props;
    const { Simple } = CRS;
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
        <GW2Tiles bounds={gw2Bounds} data={apiData} />
        <LocationMarker />
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
                <GW2Marker markers={this.poi} />
              </LayerGroup>
            </LayersControl.Overlay>
          )}
        </LayersControl>
      </MapContainer>
    );
  }
}

export default connector(LLContainer);
