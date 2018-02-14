import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { screenActions, marketActions } from '../actions';
import { screens } from '../constants';
import Contact from '../components/contact';

class ContactContainer extends Component {
  render() {
    return (
      <Contact
        screens={screens}
        switchTo={this.props.screenActions.switchTo}
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactContainer);
