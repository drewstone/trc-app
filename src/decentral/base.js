import Promise from 'bluebird';
import Eth from './ethereum';

export default function(web3) {
  return {
    fetchContracts: async function() {
      return await Eth.fetchContracts(web3);
    },
    fetchTasks: async function(protocol) {
      const designers = await protocol.getDesigners.call();
      return designers;
    },
    
    addTask: async function(protocol, data) {
      const taskName = data.task;
      const designer = data.poster;
      const events = [0, 1];
      const timeLength = 1;
      const questions = data.questions.map(q => q.text);
      const args = [taskName, events, questions, timeLength];

      let result = await protocol.createTask.call(...args, { from: web3.eth.coinbase });
      console.log(result);
    },

    addPrediction: (data) => {
      return Promise.delay(100)
      .then(() => (data));
    },

    fetchPredictions: (data) => {
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
  };
}