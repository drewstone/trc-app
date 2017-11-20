import Promise from 'bluebird';
import ethUtil from '../ethereum';
import ipfsUtil from '../ipfs';

export default {
  addPrediction: (data, value) => {
    return Promise.wait(100)
    .then(() => (data, value));
  },
  fetchPredictions: (data, value) => {
    return Promise.wait(100)
    .then(() => (data, value));
  },
  addQuestion: (data, value) => {
    return Promise.wait(100)
    .then(() => (data, value));
  },
  fetchQuestions: (data, value) => {
    return Promise.wait(100)
    .then(() => (data, value));
  },
  getProfile: (data, value) => {
    return Promise.wait(100)
    .then(() => (data, value));
  },
  editProfile: (data, value) => {
    return Promise.wait(100)
    .then(() => (data, value));
  },
}
