import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { screenActions } from '../actions';
import { screens } from '../constants';
import NavbarContainer from './NavbarContainer';
import NewUserContainer from './NewUserContainer';
import UserContainer from './UserContainer';
import PredictionListContainer from './PredictionListContainer';
import PredictionContainer from './PredictionContainer';
import QuestionListContainer from './QuestionListContainer';
import QuestionContainer from './QuestionContainer';

import EthUtil from '../ethereum';

const screenContainerComponent = {
  [screens.NEWUSER]: NewUserContainer,
  [screens.USER]: UserContainer,
  [screens.PREDICTIONLIST]: PredictionListContainer,
  [screens.PREDICTION]: PredictionContainer,
  [screens.QUESTIONLIST]: QuestionListContainer,
  [screens.QUESTION]: QuestionContainer,
};

class App extends Component {
  componentDidMount() {
    EthUtil();
  }

  render() {
    const { currentScreen } = this.props;
    const ScreenComponent = screenContainerComponent[currentScreen];

    return (
      <NavbarContainer>
        <ScreenComponent />
      </NavbarContainer>
    );
  }
}



const mapStateToProps = state => ({
  currentScreen: state.currentScreen,
});

const mapDispatchToProps = dispatch => ({
  screenActions: bindActionCreators(screenActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
