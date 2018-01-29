import * as constants from '../constants';
import Decentral from '../decentral/base';
const decentral = Decentral(window.web3);

export const screenActions = {
  switchTo: (screen, metadata) => ({
    type: constants.screenActions.SWITCH_TO,
    payload: { screen, metadata },
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

  submitTask: (data) => ({
    type: constants.marketActions.SUBMIT_TASK,
    promise: decentral.submitTask(data),
  }),

  addTask: (protocol, data) => ({
    type: constants.marketActions.ADD_TASK,
    promise: decentral.addTask(protocol, data),
  }),

  fetchTasks: (data) => ({
    type: constants.marketActions.FETCH_TASKS,
    promise: decentral.fetchTask(data),
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

export const userActions = {
  selectChoice: (id, choice) => ({
    type: constants.userActions.SELECT_CHOICE,
    payload: { id, choice },
  }),
}

export const decentralActions = {
  fetchContracts: () => ({
    type: constants.decentralActions.FETCH_CONTRACTS,
    promise: decentral.fetchContracts(),
  }),

  fetchTasks: (protocol) => ({
    type: constants.decentralActions.FETCH_TASKS,
    promise: decentral.fetchTasks(protocol),
  }),
};
