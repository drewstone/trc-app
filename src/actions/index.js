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

  getProfile: (data) => ({
    type: constants.marketActions.GET_PROFILE,
    promise: util.getProfile(data),
  }),

  editProfile: (data) => ({
    type: constants.marketActions.EDIT_PROFILE,
    promise: util.editProfile(data),
  }),
};

export const userActions = {
  selectChoice: (id, choice) => ({
    type: constants.userActions.SELECT_CHOICE,
    payload: { id, choice },
  }),

  fetchMyTasks: (contracts) => ({
    type: constants.userActions.FETCH_MY_TASKS,
    promise: new Promise((resolve, reject) => {

    }),
  })
}

export const decentralActions = {
  fetchContracts: () => ({
    type: constants.decentralActions.FETCH_CONTRACTS,
    promise: util.fetchContracts(),
  }),
};
