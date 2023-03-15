import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from 'react-bootstrap';
import type { MarkerEmbed } from '../App';
import type { RootState } from '../store';

import { pushMarker, setMarker } from '../slice/markerSlice';
import { openCanvas } from '../slice/appSlice';
import { GW2ApiPoi } from '../apiMiddleware';

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
    Object.entries(markObj).forEach((entry) => {
      const [key, val] = entry;
      markArr.push({
        name: key,
        coord: val,
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
        }}
      >
        {!(activeMark === hash) ? onText : offText}
      </Button>
    );
  }
}

export default connector(MarkerButton);
