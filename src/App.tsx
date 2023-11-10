import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import objectHash from 'object-hash';
import store from './redux/store';

import { OffcanvasPanel } from './components/OffcanvasPanel';
// import MarkerButton from './components/MarkerButton';
import { MarkerButton } from './components/MarkerButton';

import type { MarkerEmbed } from './common/interfaces';

import './App.scss';

export default function App() {
  renderButtons();
  renderOffcanvas();
}

function renderButtons() {
  const gw2mClass = 'gw2maps';
  const targets: MarkerEmbed[] = Array.from(
    document.querySelectorAll('.gw2mapMarker'),
  );
  targets.forEach((element) => {
    element.classList.remove('gw2mapMarker');
    const { dataset } = element;
    const keyHash = objectHash(JSON.stringify(dataset)).substring(0, 8);
    const bRoot = createRoot(element);
    bRoot.render(
      <React.StrictMode>
        <Provider store={store}>
          <MarkerButton
            hash={keyHash}
            dataset={dataset}
            className={gw2mClass}
          />
        </Provider>
      </React.StrictMode>,
    );
  });
}

function renderOffcanvas() {
  const gw2mClass = 'gw2maps';
  const rootDiv = document.getElementById('gw2mapRoot') as MarkerEmbed;
  if (!rootDiv) {
    throw new Error('Object with ID "gw2mapRoot" not found!');
  }
  const { dataset } = rootDiv;

  const root = createRoot(rootDiv);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <OffcanvasPanel dataset={dataset} className={gw2mClass} />
      </Provider>
    </React.StrictMode>,
  );
}
