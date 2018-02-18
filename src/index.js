import ReactotronConfig from './config/ReactotronConfig';
import Reactotron from 'reactotron-react-js'

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
window.RTron = Reactotron;


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();
