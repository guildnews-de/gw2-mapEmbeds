import { Point, PointTuple } from 'leaflet';
export interface GW2PointProps {
    tupel: PointTuple;
    name: string;
    type: string;
}
export default class GW2Point extends Point {
    name: string;
    type: string;
    constructor(props: GW2PointProps);
    toString(): string;
}
