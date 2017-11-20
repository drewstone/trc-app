import * as constants from '../constants';
import decentral from '../decentral';

export const screenActions = {
  switchTo: screen => ({
    type: constants.screenActions.SWITCH_TO,
    payload: screen,
  }),
};

export const marketActions = {
  addPrediction: (data) => ({
    type: constants.marketActions.ADD_PREDICTION,
    promise: decentral.addPrediction(data),
  }),

  fetchPredictions: (data) => ({
    type: constants.marketActions.FETCH_PREDICTIONS,
    promise: decentral.addPrediction(data),
  }),

  addQuestion: (data) => ({
    type: constants.marketActions.ADD_QUESTION,
    promise: decentral.addQuestion(data),
  }),

  fetchQuestions: (data) => ({
    type: constants.marketActions.FETCH_QUESTIONS,
    promise: decentral.fetchQuestions(data),
  }),

  getProfile: (data) => ({
    type: constants.marketActions.GET_PROFILE,
    promise: decentral.getProfile(data),
  }),

  editProfile: (data) => ({
    type: constants.marketActions.EDIT_PROFILE,
    promise: decentral.editProfile(data),
  }),
};
