import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { screens } from '../constants';
import { screenActions, marketActions } from '../actions';
import LandingPage from '../components/landingpage';

class LandingPageContainer extends Component {
  render() {
    return (
      <LandingPage
        screens={screens}
        switchTo={this.props.screenActions.switchTo}
      />
    );
  }
}

const mapStateToProps = state => ({
  predictions: state.predictions,
});

const mapDispatchToProps = dispatch => ({
  screenActions: bindActionCreators(screenActions, dispatch),
  marketActions: bindActionCreators(marketActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPageContainer);
