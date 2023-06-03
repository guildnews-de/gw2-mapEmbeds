import React, { Component } from 'react';
import { ConnectedProps } from 'react-redux';
import type { MarkerEmbed } from '../App';
import { GW2Point } from './leaflet/gw2';
declare const connector: import("react-redux").InferableComponentEnhancerWithProps<{
    activeMark: string | undefined;
} & {
    setMarker: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "marker/setMarker">;
    pushMarker: import("@reduxjs/toolkit").ActionCreatorWithPayload<[string, GW2Point[]], "marker/pushMarker">;
    openCanvas: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"map/openCanvas">;
    wipeCurrent: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"marker/wipeCurrent">;
}, {}>;
type ReduxMarkerProps = ConnectedProps<typeof connector>;
interface MarkerButtonProps extends ReduxMarkerProps {
    hash: string;
    dataset: MarkerEmbed['dataset'];
}
declare class MarkerButton extends Component<MarkerButtonProps> {
    static markParser(raw: MarkerEmbed['dataset']): GW2Point[];
    constructor(props: MarkerButtonProps);
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<typeof MarkerButton, {
    ref?: React.LegacyRef<MarkerButton> | undefined;
    hash: string;
    key?: React.Key | null | undefined;
    dataset: {
        gw2mapIds?: string | undefined;
        gw2mapMarker?: string | undefined;
        gw2mapColor?: string | undefined;
    };
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
}>;
export default _default;
