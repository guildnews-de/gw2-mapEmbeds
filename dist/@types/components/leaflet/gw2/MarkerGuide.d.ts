/// <reference types="react" />
import { GW2PointGroup } from './GW2Point';
import './tooltip.scss';
declare function MarkerGuide(props: {
    markers: GW2PointGroup;
    perm?: boolean;
}): JSX.Element;
export default MarkerGuide;
