/* These polyfills are required for IE11 support. */
import 'core-js';
import 'regenerator-runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.scss';

import Router from './Router';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
