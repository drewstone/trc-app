import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { screenActions, marketActions } from '../actions';
import { screens } from '../constants';
import Platform from '../components/platform';
import HomePage from '../components/platform/home';
import TopicPage from '../components/platform/topic';

const PlatformScreenContainer = {
  HOME: HomePage,
  TOPIC: TopicPage,
}

class PlatformContainer extends Component {
  render() {
    const PlatformScreen = PlatformScreenContainer[this.props.metadata.component];

    return (
      <Platform
        currentTopic={this.props.metadata.topic}
        topics={this.props.market.topics}
        screens={screens}
        switchTo={this.props.screenActions.switchTo}
        marketActions={this.props.marketActions}>
        <PlatformScreen />
      </Platform>
    );
  }
}

const mapStateToProps = state => ({
  metadata: state.screen.metadata,
  market: state.market,
});

const mapDispatchToProps = dispatch => ({
  screenActions: bindActionCreators(screenActions, dispatch),
  marketActions: bindActionCreators(marketActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlatformContainer);
