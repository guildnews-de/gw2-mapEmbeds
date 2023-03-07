import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import type NodeListOf from 'typescript';
import objectHash from 'object-hash';
import store from './store';

import BootstrapUI from './ui/BootstrapUI';
import MarkerButton from './ui/MarkerButton';

import 'bootstrap/dist/css/bootstrap.min.css';

export interface MarkerEmbed extends Omit<HTMLElement, 'dataset'> {
  dataset: {
    gw2Embed?: string;
    gw2Mark?: string;
  };
}

class App {
  static getHash(obj: Object) {
    return objectHash(JSON.stringify(obj)).substring(0, 8);
  }

  private targets: MarkerEmbed[];

  constructor() {
    this.targets = Array.from(
      document.querySelectorAll(
        'div[data-gw2-maps],span[data-gw2-maps]',
      ) as NodeListOf<MarkerEmbed>,
    );
    this.drawButtons();
    this.drawUI()
  }

  drawButtons() {
    this.targets.forEach((element) => {
      element.removeAttribute('data-gw2-map');
      const { dataset } = element;
      const keyHash = App.getHash(dataset);
      const bRoot = createRoot(element);
      bRoot.render(
        <React.StrictMode>
          <Provider store={store}>
            <MarkerButton hash={keyHash} dataset={dataset} />
          </Provider>
        </React.StrictMode>,
      );
    });
  }

  drawUI() {
    const uiRoot = createRoot(document.getElementById('root')!);
    uiRoot.render(
      <React.StrictMode>
        <Provider store={store}>
          <BootstrapUI />
        </Provider>
      </React.StrictMode>,
    );
  }
}

export default App;
