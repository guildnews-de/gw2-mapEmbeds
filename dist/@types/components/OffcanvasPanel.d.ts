import React, { Component } from 'react';
import { ConnectedProps } from 'react-redux';
import { tileApiData } from '../redux/slice/mapSlice';
import { MarkerEmbed } from '../App';
import './OffcanvasPanel.scss';
declare const connector: import("react-redux").InferableComponentEnhancerWithProps<{
    open: boolean;
    ready: boolean;
    mapsLoaded: boolean;
    loadLL: boolean;
    modal: boolean;
} & {
    setTileDate: import("@reduxjs/toolkit").ActionCreatorWithPayload<tileApiData, "map/setTileDate">;
    closeCanvas: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"map/closeCanvas">;
    addActiveMap: import("@reduxjs/toolkit").ActionCreatorWithPayload<number, "map/addActiveMap">;
    fetchMap: import("@reduxjs/toolkit").ActionCreatorWithPayload<import("../redux/slice/apiSlice").GW2ApiRequestParams, "api/fetchMap">;
    setMapsLoaded: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"map/setMapsLoaded">;
    activateLL: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"map/activateLL">;
}, {}>;
type ReduxOffcanvasProps = ConnectedProps<typeof connector>;
interface OffcanvasPanelProps extends ReduxOffcanvasProps {
    dataset: MarkerEmbed['dataset'];
    className: string;
}
declare class OffcanvasPanel extends Component<OffcanvasPanelProps> {
    constructor(props: OffcanvasPanelProps);
    componentDidMount(): () => void;
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<typeof OffcanvasPanel, {
    ref?: React.LegacyRef<OffcanvasPanel> | undefined;
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
