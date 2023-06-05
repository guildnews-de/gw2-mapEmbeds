import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from 'react-bootstrap';
import { PointTuple } from 'leaflet';

import type { MarkerEmbed } from '../App';
import type { RootState } from '../redux/store';
import { pushMarker, setMarker, wipeCurrent } from '../redux/slice/markerSlice';
import { openCanvas } from '../redux/slice/appSlice';
import { GW2Point } from './leaflet/gw2';
import { GW2PointGroup } from './leaflet/gw2/GW2Point';

const mapStateToProps = (state: RootState) => {
  const { active } = state.marker;
  return {
    activeMark: active,
  };
};

const mapDispatchToProps = {
  setMarker,
  pushMarker,
  openCanvas,
  wipeCurrent,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxMarkerProps = ConnectedProps<typeof connector>;

interface MarkerButtonProps extends ReduxMarkerProps {
  hash: string;
  dataset: MarkerEmbed['dataset'];
  className: string;
}

class MarkerButton extends Component<MarkerButtonProps> {
  constructor(props: MarkerButtonProps) {
    super(props);
    const { hash, dataset, pushMarker } = this.props;

    const group = new GW2PointGroup({
      points: this.markParser(dataset),
      mode: dataset.gw2mapMode});
    pushMarker([hash as string, group]);
  }

  markParser(raw: MarkerEmbed['dataset']) {
    const markArr: GW2Point[] = [];
    const markObj = raw.gw2mapMarker ? this.markJSONify(raw.gw2mapMarker) : {};
    const type = raw.gw2mapColor ? raw.gw2mapColor : 'default';

    Object.entries(markObj).forEach((entry) => {
      const [name, tupel] = entry;
      markArr.push(new GW2Point({ tupel, name, type }));
    });

    return markArr;
  }

  markJSONify(rawMarker: string) {
    const parentArray = rawMarker.split(';');
    const output: Record<string, PointTuple> = {};

    parentArray.forEach((string) => {
      const childArray = string.split(',');
      if (childArray.length >= 3) {
        const x = Number(childArray[1]);
        const y = Number(childArray[2]);
        if (Number.isNaN(x) || Number.isNaN(y)) {
          output[String(childArray[0])] = [0,0]
        } else {
          output[String(childArray[0])] = [x, y];
        }
      }
    });
    return output;
  }

  render() {
    const { activeMark, hash, setMarker, openCanvas, className } = this.props;
    const onText = 'Karte zeigen';
    const offText = 'jetzt sichtbar';
    return (
      <Button
        variant="primary"
        size="sm"
        active={!(hash === activeMark)}
        onClick={() => {
          setMarker(hash as string);
          openCanvas();
          wipeCurrent();
        }}
        className={className}
      >
        {!(activeMark === hash) ? onText : offText}
      </Button>
    );
  }
}

export default connector(MarkerButton);
