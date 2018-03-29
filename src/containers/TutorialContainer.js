import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { screens } from '../constants';
import { screenActions, marketActions } from '../actions';
import Tutorial from '../components/tutorial';

class TutorialContainer extends Component {
  render() {
    return (
      <Tutorial
        screens={screens}
        switchTo={this.props.screenActions.switchTo}
        marketActions={this.props.marketActions}
      />
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
)(TutorialContainer);
