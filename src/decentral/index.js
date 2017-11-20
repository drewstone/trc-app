import Promise from 'bluebird';
import ethUtil from '../ethereum';
import ipfsUtil from '../ipfs';

export default {
  addPrediction: (data) => {
    return Promise.delay(100)
    .then(() => (data));
  },
  fetchPredictions: (data) => {
    return Promise.delay(100)
    .then(() => (data));
  },
  addQuestion: (data) => {
    return Promise.delay(100)
    .then(() => (data));
  },
  fetchQuestions: (data) => {
    return Promise.delay(100)
    .then(() => (data));
  },
  getProfile: (data) => {
    return Promise.delay(100)
    .then(() => (data));
  },
  editProfile: (data) => {
    return Promise.delay(100)
    .then(() => (data));
  },
}
