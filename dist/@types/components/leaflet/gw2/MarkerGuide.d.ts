/// <reference types="react" />
import { default as GW2Point } from './GW2Point';
import './tooltip.scss';
declare function MarkerGuide(props: {
    markers: GW2Point[];
    perm?: boolean;
}): JSX.Element;
export default MarkerGuide;
