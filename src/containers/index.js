import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { screenActions } from '../actions';
import { screens } from '../constants';
import NewUserContainer from './NewUserContainer';
import UserContainer from './UserContainer';
import PredictionListContainer from './PredictionListContainer';
import QuestionContainer from './QuestionContainer';
import QuestionListContainer from './QuestionListContainer';
import AddQuestionContainer from './AddQuestionContainer';
import LandingPageContainer from './LandingPageContainer';
import PlatformContainer from './PlatformContainer';
import AboutContainer from './AboutContainer';
import ContactContainer from './ContactContainer';


import EthUtil from '../ethereum';

const screenContainerComponent = {
  [screens.NEWUSER]: NewUserContainer,
  [screens.USER]: UserContainer,
  [screens.PREDICTION_LIST]: PredictionListContainer,
  [screens.QUESTION]: QuestionContainer,
  [screens.QUESTION_LIST]: QuestionListContainer,
  [screens.ADD_QUESTION]: AddQuestionContainer,
  [screens.LANDING_PAGE]: LandingPageContainer,
  [screens.PLATFORM]: PlatformContainer,
  [screens.ABOUT]: AboutContainer,
  [screens.CONTACT]: ContactContainer,
};

class App extends Component {
  componentDidMount() {
    EthUtil();
  }

  render() {
    const { currentScreen } = this.props;
    const ScreenComponent = screenContainerComponent[currentScreen];

    return (
      <ScreenComponent />
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
