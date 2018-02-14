import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { screenActions, marketActions } from '../actions';
import { screens } from '../constants';
import Platform from '../components/platform';
import HomePage from '../components/platform/home';
import TaskPage from '../components/platform/task';
import AdminPage from '../components/platform/admin';
import AdminTaskPage from '../components/platform/admintask';

const PlatformScreenContainer = {
  HOME: HomePage,
  TASK: TaskPage,
  ADMIN: AdminPage,
  ADMINTASK: AdminTaskPage,
}

class PlatformContainer extends Component {
  render() {
    const PlatformScreen = PlatformScreenContainer[this.props.metadata.component];

    let tasks = this.props.market.tasks;
    if (this.props.metadata.component == 'ADMIN') {
      // tasks = this.props.user.tasks;
    }

    return (
      <Platform
        contracts={this.props.contracts}
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
  contracts: state.decentral.contracts,
});

const mapDispatchToProps = dispatch => ({
  screenActions: bindActionCreators(screenActions, dispatch),
  marketActions: bindActionCreators(marketActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlatformContainer);
