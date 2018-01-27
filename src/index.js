import ReactotronConfig from './config/ReactotronConfig';
import Reactotron from 'reactotron-react-js'

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Web3Provider } from 'react-web3';
window.RTron = Reactotron;


ReactDOM.render(
  <Web3Provider><App /></Web3Provider>,
  document.getElementById('root')
);
registerServiceWorker();
