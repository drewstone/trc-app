import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { screenActions, marketActions, userActions } from '../actions';
import Question from '../components/question';

class QuestionContainer extends Component {  
  render() {
    return (
      <Question
        question={this.props.questions.filter(q => q.id === this.props.screenMetaData)[0]}
        switchTo={this.props.screenActions.switchTo}
        selectedChoice={this.props.unsubmitted[this.props.screenMetaData]}
        selectChoice={this.props.userActions.selectChoice}
        addPrediction={this.props.marketActions.addPrediction}
      />
    );
  }
}

const mapStateToProps = state => ({
  screenMetaData: state.screen.metadata,
  questions: state.market.questions,
  unsubmitted: state.user.unsubmitted,
});

const mapDispatchToProps = dispatch => ({
  screenActions: bindActionCreators(screenActions, dispatch),
  marketActions: bindActionCreators(marketActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionContainer);
