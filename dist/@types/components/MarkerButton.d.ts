import React, { Component } from 'react';
import { ConnectedProps } from 'react-redux';
import { PointTuple } from 'leaflet';
import type { MarkerEmbed } from '../App';
import { GW2Point } from './leaflet/gw2';
import { GW2PointGroup } from './leaflet/gw2/GW2Point';
declare const connector: import("react-redux").InferableComponentEnhancerWithProps<{
    activeMark: string | undefined;
} & {
    setMarker: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "marker/setMarker">;
    pushMarker: import("@reduxjs/toolkit").ActionCreatorWithPayload<[string, GW2PointGroup], "marker/pushMarker">;
    openCanvas: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"map/openCanvas">;
    wipeCurrent: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"marker/wipeCurrent">;
}, {}>;
type ReduxMarkerProps = ConnectedProps<typeof connector>;
interface MarkerButtonProps extends ReduxMarkerProps {
    hash: string;
    dataset: MarkerEmbed['dataset'];
    className: string;
}
declare class MarkerButton extends Component<MarkerButtonProps> {
    constructor(props: MarkerButtonProps);
    markParser(raw: MarkerEmbed['dataset']): GW2Point[];
    markJSONify(rawMarker: string): [string, PointTuple][];
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<typeof MarkerButton, {
    hash: string;
    ref?: React.LegacyRef<MarkerButton> | undefined;
    className: string;
    key?: React.Key | null | undefined;
    dataset: {
        gw2mapIds?: string | undefined;
        gw2mapMarker?: string | undefined;
        gw2mapColor?: string | undefined;
        gw2mapMode?: string | undefined;
    };
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
}>;
export default _default;
