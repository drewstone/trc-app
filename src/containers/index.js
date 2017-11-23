import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { screenActions } from '../actions';
import { screens } from '../constants';
import NavbarContainer from './NavbarContainer';
import NewUserContainer from './NewUserContainer';
import UserContainer from './UserContainer';
import PredictionListContainer from './PredictionListContainer';
import QuestionContainer from './QuestionContainer';
import QuestionListContainer from './QuestionListContainer';
import AddQuestionContainer from './AddQuestionContainer';

import EthUtil from '../ethereum';

const screenContainerComponent = {
  [screens.NEWUSER]: NewUserContainer,
  [screens.USER]: UserContainer,
  [screens.PREDICTION_LIST]: PredictionListContainer,
  [screens.QUESTION]: QuestionContainer,
  [screens.QUESTION_LIST]: QuestionListContainer,
  [screens.ADD_QUESTION]: AddQuestionContainer,
};

class App extends Component {
  componentDidMount() {
    EthUtil();
  }

  render() {
    const { currentScreen } = this.props;
    const ScreenComponent = screenContainerComponent[currentScreen];
    console.log(this.props);
    return (
      <NavbarContainer>
        <ScreenComponent />
      </NavbarContainer>
    );
  }
}



const mapStateToProps = state => ({
  currentScreen: state.screen.currentScreen,
});

const mapDispatchToProps = dispatch => ({
  screenActions: bindActionCreators(screenActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
