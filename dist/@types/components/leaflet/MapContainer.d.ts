import React, { Component } from 'react';
import { ConnectedProps } from 'react-redux';
import { PointTuple } from 'leaflet';
import { GW2ApiPoi, GW2ApiSector } from '../../redux/apiMiddleware';
import { GW2Point } from './gw2';
import './MapContainer.scss';
declare const connector: import("react-redux").InferableComponentEnhancerWithProps<{
    gw2Bounds: [number, number];
    marker: GW2Point[];
    poi: Record<number, GW2ApiPoi>;
    sectors: Record<number, GW2ApiSector>;
    center: PointTuple;
} & import("react-redux").DispatchProp<import("redux").AnyAction>, {}>;
type LLContainerReduxProps = ConnectedProps<typeof connector>;
declare class LLContainer extends Component<LLContainerReduxProps> {
    private sectors;
    private poi;
    constructor(props: LLContainerReduxProps);
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<typeof LLContainer, {
    ref?: React.LegacyRef<LLContainer> | undefined;
    key?: React.Key | null | undefined;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
}>;
export default _default;
