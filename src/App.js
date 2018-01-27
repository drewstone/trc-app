import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './store';
import getInitialState from './store/getInitialState';
import App from './containers';
import DevTools from './containers/DevTools';
import { deploy } from './ethereum/deploy';
const store = configureStore(getInitialState());

export default class Root extends Component {
  componentDidMount() {
    deploy(window.web3).then(contracts => {
      window.contracts = contracts.reduce((prev, curr) => (
        Object.assign({}, prev, curr)), {});
    });
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <App />
          <DevTools />
        </div>
      </Provider>
    );
  }
}
