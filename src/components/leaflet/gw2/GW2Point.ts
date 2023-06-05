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

export class GW2Point extends Point {
  name: string;
  type: string;
  constructor(props: GW2PointProps) {
    const { tupel, name, type } = props;
    super(tupel[0], tupel[1]);

    this.name = name;
    this.type = type;
  }

  toString() {
    return `[${this.name},${this.type}]${super.toString()}`;
  }
}

export class GW2PointGroup {
  points: GW2Point[];
  mode: PointGroupMode;
  constructor(props: GW2PointGroupProps) {
    const { points, mode } = props;

    this.points = points
    this.mode = this.getMode( mode );
  }

  getMode( propMode = '' ) {
    switch (propMode) {
      case 'line':
        return 'line';
        break;
      default:
        return 'points';
        break;
    }
  }
}
