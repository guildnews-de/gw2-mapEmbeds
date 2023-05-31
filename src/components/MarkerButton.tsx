import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from 'react-bootstrap';
import type { MarkerEmbed } from '../App';
import type { RootState } from '../redux/store';

import { pushMarker, setMarker, wipeCurrent } from '../redux/slice/markerSlice';
import { openCanvas } from '../redux/slice/appSlice';
import { PointTuple } from 'leaflet';
import { GW2Point } from './leaflet/gw2/GW2Point';

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
}

// TODO: Change active map on button. "default map" fallback mechanic?

class MarkerButton extends Component<MarkerButtonProps> {
  static markParser(raw: MarkerEmbed['dataset']) {
    const markArr: GW2Point[] = [];
    const markObj: Record<string, PointTuple> = JSON.parse(raw.gw2mapMarker!);
    const type = raw.gw2mapColor ? raw.gw2mapColor : 'default';
    Object.entries(markObj).forEach((entry) => {
      const [name, tupel] = entry;
      markArr.push(new GW2Point({ tupel, name, type }));
    });

    return markArr;
  }

  constructor(props: MarkerButtonProps) {
    super(props);
    const { hash, dataset, pushMarker } = this.props;

    const group = MarkerButton.markParser(dataset);
    pushMarker([hash as string, group]);
  }

  render() {
    const { activeMark, hash, setMarker, openCanvas } = this.props;
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
      >
        {!(activeMark === hash) ? onText : offText}
      </Button>
    );
  }
}

export default connector(MarkerButton);
