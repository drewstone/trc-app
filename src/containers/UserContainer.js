import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { screenActions, marketActions } from '../actions';
import User from '../components/user';

class UserContainer extends Component {
  render() {
    return (
      <User
        screenActions={this.props.screenActions}
        marketActions={this.props.marketActions}
      />
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  screenActions: bindActionCreators(screenActions, dispatch),
  marketActions: bindActionCreators(marketActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserContainer);
