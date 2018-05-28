import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';

import { configureStore } from './store/configurestore';
import { Root } from './containers/root';

const store = configureStore({
    api: {
      endpoints: null,
      health: "unknown",
      blockNumber: -1,
    },
    infura: {
        blockNumber: -1,
    },
    docs: {
        expand: {}
    }
});

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);