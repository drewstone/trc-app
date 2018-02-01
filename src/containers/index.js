import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { screenActions, decentralActions } from '../actions';
import { screens } from '../constants';
import LandingPageContainer from './LandingPageContainer';
import PlatformContainer from './PlatformContainer';

const screenContainerComponent = {
  [screens.LANDING_PAGE]: LandingPageContainer,
  [screens.PLATFORM]: PlatformContainer,
};

class App extends Component {
  componentDidMount() {
    return this.props.decentralActions.fetchContracts(window.web3);
  }

  render() {
    const { currentScreen } = this.props;
    const ScreenComponent = screenContainerComponent[currentScreen];

    return (
      <ScreenComponent />
    );
  }
}



const mapStateToProps = state => ({
  currentScreen: state.screen.currentScreen,
  contracts: state.decentral.contracts,
});

const mapDispatchToProps = dispatch => ({
  screenActions: bindActionCreators(screenActions, dispatch),
  decentralActions: bindActionCreators(decentralActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
