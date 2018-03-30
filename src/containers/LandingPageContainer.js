import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { screens } from '../constants';
import { screenActions, marketActions } from '../actions';
import LandingPage from '../components/landingpage';
import Home from '../components/landingpage/home';
import About from '../components/landingpage/about';
import FAQ from '../components/landingpage/faq';
import Tutorial from '../components/landingpage/tutorial';

const LandingScreenContainer = {
  HOME: Home,
  ABOUT: About,
  FAQ: FAQ,
  TUTORIAL: Tutorial,
}

class LandingPageContainer extends Component {
  render() {
    const LandingScreen = LandingScreenContainer[this.props.metadata.component];

    return (
      <LandingPage screens={screens} switchTo={this.props.screenActions.switchTo}>
        <LandingScreen />
      </LandingPage>
    );
  }
}

const mapStateToProps = state => ({
  metadata: state.screen.metadata,
});

const mapDispatchToProps = dispatch => ({
  screenActions: bindActionCreators(screenActions, dispatch),
  marketActions: bindActionCreators(marketActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPageContainer);
