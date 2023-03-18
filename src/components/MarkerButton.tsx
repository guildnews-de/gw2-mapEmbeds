import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from 'react-bootstrap';
import type { MarkerEmbed } from '../App';
import type { RootState } from '../redux/store';

import { pushMarker, setMarker, wipeCurrent } from '../redux/slice/markerSlice';
import { openCanvas } from '../redux/slice/appSlice';
import { GW2ApiPoi } from '../redux/apiMiddleware';

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

class MarkerButton extends Component<MarkerButtonProps> {
  static markParser(raw: MarkerEmbed['dataset']) {
    const markArr: GW2ApiPoi[] = [];
    const markObj: Record<string, [number, number]> = JSON.parse(
      raw.gw2Marker!,
    );
    const type = raw.gw2Color ? raw.gw2Color : 'default'
    Object.entries(markObj).forEach((entry) => {
      const [key, val] = entry;
      markArr.push({
        name: key,
        coord: val,
        type: type,
      });
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
