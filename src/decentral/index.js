import Promise from 'bluebird';
import hash from 'object-hash';
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
  submitTask: (data) => {
    return Promise.delay(100)
    .then(() => ({
      ...data,
      submissionTime: Date.now(),
    }))
  }
  addTask: (data) => {
    return Promise.delay(100)
    .then(() => ({
      id: hash(data),
      ...data,
      creationTime: Date.now(),
    }));
  },
  fetchTasks: (data) => {
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
