import { combineReducers } from 'redux';
import { screens, screenActions, marketActions } from '../constants';
import { handle } from 'redux-pack';

const screenReducer = (state = screens.NEWUSER, action) => {
  const { type, payload } = action;

  switch (type) {
    case screenActions.SWITCH_TO:
      return payload;
    default:
      return state;
  }
};

const marketInitialState = {
  predictions: [],
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
          questions: [ ...prevState.questions, payload.question ],
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
        success: prevState => ({
          ...prevState,
          predictions: {
            ...prevState.predictions,
            [payload.question.id]: [
              ...prevState.predictions[payload.question.id],
              {
                user: 'Jim',
                prediction: payload.prediction,
              }
            ],
          }
        }),
      });
    default:
      return state;
  }
}

export default combineReducers({
  currentScreen: screenReducer,
  market: marketReducer,
});
