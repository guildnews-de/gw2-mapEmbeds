import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { MD5 } from 'object-hash';
import store from './redux/store';

import { OffcanvasPanel } from './components/OffcanvasPanel';
// import MarkerButton from './components/MarkerButton';
import { MarkerButton } from './components/MarkerButton';

import { MarkerEmbedData } from './common/interfaces';
import type { MapsInitEmbed, MarkerEmbed } from './common/interfaces';

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
    // const { dataset } = element;
    const elementData = new MarkerEmbedData(element.dataset);
    const keyHash = MD5(elementData);
    const btnRoot = createRoot(element);
    btnRoot.render(
      <React.StrictMode>
        <Provider store={store}>
          <MarkerButton
            hash={keyHash}
            elementData={elementData}
            className={gw2mClass}
          />
        </Provider>
      </React.StrictMode>,
    );
  });
}

function renderOffcanvas() {
  const gw2mClass = 'gw2maps';
  const rootDiv = document.getElementById('gw2mapRoot') as MapsInitEmbed;
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
