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
      return {
        ...state,
        questions: [
          ...state.questions, {
            id: payload.questionId,
            data: payload.questionContents
          },
        ],
      };
    default:
      return state;
  }
}

export default combineReducers({
  currentScreen: screenReducer,
  market: marketReducer,
});