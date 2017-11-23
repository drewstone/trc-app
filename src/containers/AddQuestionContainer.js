import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { screenActions, marketActions } from '../actions';
import AddQuestion from '../components/addquestion';

class AddQuestionContainer extends Component {
  render() {
    return (
      <AddQuestion
        switchTo={this.props.screenActions.switchTo}
        addQuestion={this.props.marketActions.addQuestion}
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
)(AddQuestionContainer);
