import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { screenActions, marketActions } from '../actions';
import { screens } from '../constants';
import Platform from '../components/platform';

class PlatformContainer extends Component {
  render() {
    return (
      <Platform
        tasks={this.props.market.tasks}
        screens={screens}
        switchTo={this.props.screenActions.switchTo}
        marketActions={this.props.marketActions}
      />
    );
  }
}

const mapStateToProps = state => ({
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
