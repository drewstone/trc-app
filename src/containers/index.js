import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { screenActions } from '../actions';
import { screens } from '../constants';
import LandingPageContainer from './LandingPageContainer';
import PlatformContainer from './PlatformContainer';


import EthUtil from '../ethereum';

const screenContainerComponent = {
  [screens.LANDING_PAGE]: LandingPageContainer,
  [screens.PLATFORM]: PlatformContainer,
};

class App extends Component {
  componentDidMount() {
    EthUtil();
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
});

const mapDispatchToProps = dispatch => ({
  screenActions: bindActionCreators(screenActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
