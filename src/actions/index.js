import * as constants from '../constants';
import BaseUtil from './base';
const util = BaseUtil(window.web3);

export const screenActions = {
  switchTo: (screen, metadata) => ({
    type: constants.screenActions.SWITCH_TO,
    payload: { screen, metadata },
  }),
};

export const marketActions = {
  addPrediction: (data) => ({
    type: constants.marketActions.ADD_PREDICTION,
    promise: util.addPrediction(data),
  }),

  fetchPredictions: (data) => ({
    type: constants.marketActions.FETCH_PREDICTIONS,
    promise: util.addPrediction(data),
  }),

  submitTask: (contracts, data) => ({
    type: constants.marketActions.SUBMIT_TASK,
    promise: util.submitTask(contracts, data),
  }),

  addTask: (contracts, data) => ({
    type: constants.marketActions.ADD_TASK,
    promise: util.addTask(contracts, data),
  }),

  fetchTasks: (contracts) => ({
    type: constants.marketActions.FETCH_TASKS,
    promise: util.fetchTasks(contracts),
  }),

  fetchContracts: () => ({
    type: constants.decentralActions.FETCH_CONTRACTS,
    promise: util.fetchContracts(),
  }),
};
