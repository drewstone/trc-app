import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { screenActions, marketActions } from '../actions';
import { screens } from '../constants';
import Platform from '../components/platform';
import HomePage from '../components/platform/home';
import TaskPage from '../components/platform/task';

const PlatformScreenContainer = {
  HOME: HomePage,
  TASK: TaskPage,
}

class PlatformContainer extends Component {
  render() {
    const PlatformScreen = PlatformScreenContainer[this.props.metadata.component];
    return (
      <Platform
        currentTask={this.props.metadata.task}
        tasks={this.props.market.tasks}
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
