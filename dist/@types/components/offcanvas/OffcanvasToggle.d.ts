import React, { Component } from 'react';
import { ConnectedProps } from 'react-redux';
import './OffcanvasToggle.scss';
declare const connector: import("react-redux").InferableComponentEnhancerWithProps<{
    open: boolean;
} & {
    toggleCanvas: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"map/toggleCanvas">;
}, {}>;
type OffcanvasToggle_ConnectedProps = ConnectedProps<typeof connector>;
interface OffcanvasToggleProps extends OffcanvasToggle_ConnectedProps {
    className?: string;
}
declare class OffcanvasToggle extends Component<OffcanvasToggleProps> {
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<typeof OffcanvasToggle, {
    ref?: React.LegacyRef<OffcanvasToggle> | undefined;
    className?: string | undefined;
    key?: React.Key | null | undefined;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
}>;
export default _default;
