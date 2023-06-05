import { Point, PointTuple } from 'leaflet';
export interface GW2PointProps {
    tupel: PointTuple;
    name: string;
    type: string;
}
export interface GW2PointGroupProps {
    points: GW2Point[];
    mode?: string;
}
export type PointGroupMode = 'points' | 'line';
export declare class GW2Point extends Point {
    name: string;
    type: string;
    constructor(props: GW2PointProps);
    toString(): string;
}
export declare class GW2PointGroup {
    points: GW2Point[];
    mode: PointGroupMode;
    constructor(props: GW2PointGroupProps);
    getMode(propMode?: string): "points" | "line";
}
