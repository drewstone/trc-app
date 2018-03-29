import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Web3Provider } from 'react-web3';

import {
  screenActions,
  marketActions,
} from '../actions';
import { screens } from '../constants';
import LandingPageContainer from './LandingPageContainer';
import PlatformContainer from './PlatformContainer';

const screenContainerComponent = {
  [screens.LANDING_PAGE]: LandingPageContainer,
  [screens.PLATFORM]: PlatformContainer,
};

class App extends Component {
  componentDidMount() {
    return this.props.marketActions.fetchContracts(window.web3)
    .then(() => this.props.marketActions.fetchTasks(this.props.contracts));
  }

  render() {
    const { currentScreen } = this.props;
    let ScreenComponent = screenContainerComponent[currentScreen];

    return (currentScreen === 'PLATFORM') 
      ? (<Web3Provider><ScreenComponent/></Web3Provider>)
      : (<ScreenComponent />);
  }
}



const mapStateToProps = state => ({
  currentScreen: state.screen.currentScreen,
  contracts: state.decentral.contracts,
});

const mapDispatchToProps = dispatch => ({
  screenActions: bindActionCreators(screenActions, dispatch),
  marketActions: bindActionCreators(marketActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
