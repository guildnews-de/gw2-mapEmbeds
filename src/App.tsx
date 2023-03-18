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
    gw2Embed?: string;
    gw2Maps?: string;
    gw2Marker?: string;
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
        'div[data-gw2-marker],span[data-gw2-marker]',
      ) as NodeListOf<MarkerEmbed>,
    );
    this.renderButtons();
    this.renderOffcanvas();
  }

  renderButtons() {
    this.targets.forEach((element) => {
      // element.removeAttribute('data-gw2-maps');
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
  renderOffcanvas() {
    const rootDiv: MarkerEmbed = document.getElementById('root')!;
    const { dataset } = rootDiv;

    const root = createRoot(rootDiv);
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <OffcanvasPanel dataset={dataset} />
        </Provider>
      </React.StrictMode>,
    );
  }
}

export default App;
