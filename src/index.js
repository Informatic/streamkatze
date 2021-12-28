import 'whatwg-fetch';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './domrect-polyfill';
import './spatial-navigation-polyfill.js';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(<App />, document.querySelector('#app'));

module.hot.accept();
