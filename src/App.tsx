import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import type NodeListOf from 'typescript';
import objectHash from 'object-hash';
import store from './redux/store';

import OffcanvasPanel from './components/OffcanvasPanel';
import MarkerButton from './components/MarkerButton';

import './App.scss';

export interface MarkerEmbed extends Omit<HTMLElement, 'dataset'> {
  dataset: {
    gw2mapIds?: string;
    gw2mapMarker?: string;
    gw2mapColor?: string;
  };
}

class App {
  static getHash(obj: unknown) {
    return objectHash(JSON.stringify(obj)).substring(0, 8);
  }

  private targets: MarkerEmbed[];

  private gw2mClass = 'gw2maps';

  constructor() {
    this.targets = Array.from(
      document.querySelectorAll('.gw2mapMarker') as NodeListOf<MarkerEmbed>,
    );
    this.renderButtons();
    this.renderOffcanvas();
  }

  renderButtons() {
    if (!this.targets) {
      return;
    }
    this.targets.forEach((element) => {
      // element.removeAttribute('data-gw2-maps');
      const { dataset } = element;
      const keyHash = App.getHash(dataset);
      const bRoot = createRoot(element);
      bRoot.render(
        <React.StrictMode>
          <Provider store={store}>
            <MarkerButton
              hash={keyHash}
              dataset={dataset}
              className={this.gw2mClass}
            />
          </Provider>
        </React.StrictMode>,
      );
    });
  }
  renderOffcanvas() {
    const rootDiv = document.getElementById('gw2mapRoot') as MarkerEmbed;
    if (!rootDiv) {
      throw new Error('Object with ID "gw2mapRoot" not found!');
    }
    const { dataset } = rootDiv;

    const root = createRoot(rootDiv);
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <OffcanvasPanel dataset={dataset} className={this.gw2mClass} />
        </Provider>
      </React.StrictMode>,
    );
  }
}

export default App;
