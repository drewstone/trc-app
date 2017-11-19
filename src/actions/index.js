import * as constants from '../constants';
import decentral from '../decentral';

export const screenActions = {
  switchTo: screen => ({
    type: constants.screenActions.SWITCH_TO,
    payload: screen,
  }),
};

export const marketActions = {
  addPrediction: (data, value) => ({
    type: constants.marketActions.ADD_PREDICTION,
    promise: decentral.addPrediction(data, value),
  }),

  fetchPredictions: (data, value) => ({
    type: constants.marketActions.FETCH_PREDICTIONS,
    promise: decentral.addPrediction(data, value),
  }),

  addQuestion: (data, value) => ({
    type: constants.marketActions.ADD_QUESTION,
    promise: decentral.addQuestion(data, value),
  }),

  fetchQuestions: (data, value) => ({
    type: constants.marketActions.FETCH_QUESTIONS,
    promise: decentral.fetchQuestions(data, value),
  }),

  getProfile: (data, value) => ({
    type: constants.marketActions.GET_PROFILE,
    promise: decentral.getProfile(data, value),
  }),

  editProfile: (data, value) => ({
    type: constants.marketActions.EDIT_PROFILE,
    promise: decentral.editProfile(data, value),
  }),
};