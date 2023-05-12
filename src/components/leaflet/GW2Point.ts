import { Point, PointTuple } from 'leaflet';

export interface GW2PointProps {
  tupel: PointTuple;
  name: string;
  type: string;
}

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
