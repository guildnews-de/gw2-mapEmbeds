import { Point } from 'leaflet';
import type { PointTuple } from 'leaflet';

export interface GW2PointProps {
  tupel: PointTuple;
  name?: string;
  type?: string;
}
export class GW2Point extends Point {
  name: string;
  type: string;
  constructor(props: GW2PointProps) {
    const { tupel, name, type } = props;
    super(tupel[0], tupel[1]);

    this.name = name ? name : '';
    this.type = type ? type : 'default';
  }

  toString() {
    return `[${this.name},${this.type}]${super.toString()}`;
  }
}

export interface GW2PointGroupProps {
  points: GW2Point[];
  mode?: string;
}
export class GW2PointGroup {
  points: GW2Point[];
  mode: ReturnType<typeof this.getMode>;
  constructor(props: GW2PointGroupProps) {
    const { points, mode } = props;

    this.points = points;
    this.mode = this.getMode(mode);
  }

  getMode(propMode = '') {
    switch (propMode) {
      case 'line':
        return 'line';
      default:
        return 'points';
    }
  }
}
