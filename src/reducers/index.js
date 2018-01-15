import { combineReducers } from 'redux';
import { screens, screenActions, marketActions, userActions } from '../constants';
import { handle } from 'redux-pack';

const screenInitialState = {
  currentScreen: screens.PLATFORM,
  metadata: null,
};

const screenReducer = (state = screenInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case screenActions.SWITCH_TO:
      return { ...state, currentScreen: payload.screen, metadata: payload.metadata };
    default:
      return state;
  }
};

const marketInitialState = {
  predictions: {},
  questions: [],
};

const marketReducer = (state = marketInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case marketActions.ADD_QUESTION:
      return handle(state, action, {
        start: prevState => ({ ...prevState, isLoading: true, fooError: null }),
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({ ...prevState, fooError: payload }),
        success: prevState => ({
          ...prevState,
          questions: [ ...prevState.questions, { id: prevState.questions.length+1, ...payload.question } ],
        }),
      });
    case marketActions.FETCH_QUESTIONS:
      return handle(state, action, {
        start: prevState => ({ ...prevState, isLoading: true, fooError: null }),
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({ ...prevState, fooError: payload }),
        success: prevState => ({ ...prevState, questions: payload.questions }),
      });
    case marketActions.ADD_PREDICTION:
      return handle(state, action, {
        start: prevState => ({ ...prevState, isLoading: true, fooError: null }),
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({ ...prevState, fooError: payload }),
        success: prevState => {
          const newState = Object.assign({}, prevState);
          newState.predictions[payload.question.id].push({
            name: 'Jim', prediction: payload.prediction
          });

          return newState;
        },
      });
    default:
      return state;
  }
}

const userInitialState = {
  unsubmitted: {},
}

const userReducer = (state = userInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case userActions.SELECT_CHOICE:
      return {
        ...state,
        unsubmitted: {
          ...state.unsubmitted,
          [payload.id]: {
            choice: payload.choice,
          }
        },
      };
    default:
      return state;
  }
}

export default combineReducers({
  screen: screenReducer,
  market: marketReducer,
  user: userReducer,
});
