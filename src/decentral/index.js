import Promise from 'bluebird';
import ethUtil from '../ethereum';
import ipfsUtil from '../ipfs';

export default {
  addPrediction: (data, value) => {
    return Promise.wait(100)
    .then(() => (data, value));
  },
  fetchPredictions: (data, value) => {
    return Promise.wait(100);
  },
  addQuestion: (data, value) => {
    return Promise.wait(100);
  },
  fetchQuestions: (data, value) => {
    return Promise.wait(100);
  },
  getProfile: (data, value) => {
    return Promise.wait(100);
  },
  editProfile: (data, value) => {
    return Promise.wait(100);
  },
}
