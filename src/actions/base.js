import Promise from 'bluebird';
import eth from './ethereum';

const REGEX = new RegExp('\u0000', 'g');

export default function(web3) {
  return {
    fetchContracts: async function() {
      return await eth.fetchContracts(web3);
    },
    fetchTasks: async function(contracts) {
      const { Mechanism, Protocol, RBTS } = contracts;

      let tasks = await Protocol.getTasks.call();
      let promises = tasks.map(addr => Mechanism.at(addr));

      tasks = await Promise.all(promises);
      promises = tasks.map(task => {
        return {
          id: task.keccak.call(),
          name: task.name.call(),
          protocol: task.protocol.call(),
          designer: task.designer.call(),
          description: task.description.call(),
          questions: task.getQuestions.call(),
          participants: task.getParticipants.call(),
          events: task.getEvents.call(),
          tags: task.getTags.call(),
          initiationTime: task.initiationTime.call(),
          terminationTime: task.terminationTime.call(),
          address: task.address,
          task: task,
          hasFinished: task.hasFinishedTask.call(web3.eth.coinbase),
          hasScored: Protocol.hasBeenScored.call(task.address),
          scoreFromTask: Protocol.getScore.call(web3.eth.coinbase, task.address),
        }
      });

      let result = await Promise.all(promises.map(Promise.props));
      let answers = [];
      tasks = result.map(elt => {
        answers.push( (elt.designer === web3.eth.coinbase)
          ? [...Array(elt.questions.length).keys()].map((x, inx) => { return elt.task.getAnswers(inx) })
          : []);
        return {
          id: elt.id,
          name: web3.toAscii(elt.name),
          protocol: elt.protocol,
          designer: elt.designer,
          description: web3.toAscii(elt.description).replace(REGEX, ''),
          questions: elt.questions.map(q => web3.toAscii(q).replace(REGEX, '')),
          participants: elt.participants,
          events: elt.events.map(e => web3.toAscii(e).replace(REGEX, '')),
          tags: elt.tags.map(tag => web3.toAscii(tag).replace(REGEX, '')),
          initiationTime: elt.initiationTime.toNumber(),
          terminationTime: elt.terminationTime.toNumber(),
          address: elt.address,
          hasFinished: elt.hasFinished,
          hasScored: elt.hasScored,
          scoreFromTask: elt.scoreFromTask.toNumber(),
        };
      });


      answers = await Promise.all(answers.map(Promise.all))
      return tasks.map((elt, inx) => {
        return {
          ...elt,
          answers: answers[inx],
        }
      });
    },

    addTask: async function(contracts, data) {
      const { Protocol } = contracts;
      console.log(data);
      const taskName = data.task;
      const designer = data.designer;
      const events = data.events;
      const timeLength = 1;
      const questions = data.questions;
      const description = data.description;
      const mechanism = data.mechanism;
      const tags = data.tags;
      const args = [taskName, events, questions, timeLength, description, tags];

      try {
        let result = await Protocol.createTask(...args, { from: designer });
        return Promise.resolve(Object.assign({}, {
          name: data.task,
          designer: data.designer,
          description: data.description,
          mechanism: data.mechanism,
          initiationTime: Date.now(),
          tags: data.tags,
          events: data.events,
          questions: data.questions,
        }));
      } catch (exception) {
        return Promise.reject(`Failed to create task: ${exception}`);
      }
    },

    submitTask: async function(contracts, data) {
      const { Protocol } = contracts;

      const questionIndices = data.clicked.map((d, inx) => {
        if (d !== undefined) {
          return inx;
        } else {
          return false;
        }
      }).filter(d => (!!d || d === 0));

      const taskName = data.name;
      const questions = data.questions.filter((q, inx) => questionIndices.indexOf(inx) !== -1);
      const designer = data.designer;
      const submitter = data.submitter;

      // sample data structure; [[0], [1], [0], [1], [0], [1], [0]]
      const metaPreds = data.sliderValues.map(pred => (pred * 1.0) / 100);
      const predictions = data.clicked
        .map((click, inx) => [click, Number(web3.toWei(metaPreds[inx], 'ether'))])
        .filter((binary, meta) => (!!binary));

      if (predictions.length === questions.length === questionIndices.length) {
        throw Error('Cannot submit uneven data amounts');
      }

      const args = [taskName, designer, questions, questionIndices, predictions];

      try {
        let result = await Protocol.submitBatch(...args, { from: submitter });
        return Promise.resolve(data)
      } catch (exception) {
        return Promise.reject(`Failed to submit batch predictions: ${exception}`);
      }
    },

    scoreTask: async function(contracts, data) {
      const { Protocol, RBTS } = contracts;
      console.log(data);
      const address = data.address;
      const taskName = data.name;
      const designer = data.designer;
      const submitter = web3.eth.coinbase;

      let result = await RBTS.protocol.call();
      result = await Protocol.hasBeenScored.call(address);
      console.log(result);
      result = await Protocol.isValidTask(taskName, designer);
      console.log(result);
      // return;

      try {
        let scoreResult = await RBTS.score(taskName, designer, {from: window.web3.eth.coinbase});
        console.log(scoreResult);
      } catch (exception) {
        console.log(exception);
        return Promise.reject(`Failed to score task: ${exception}`);
      }

      try {
        let mintResult = await Protocol.mintForTask("rbts", address, {from: window.web3.eth.coinbase});
        console.log(mintResult);
      } catch (e) {
        console.log(e);
        return Promise.reject(`Failed to mint tokens: ${e}`);
      }
      return Promise.resolve();
    },

    getBalance: async function(contracts) {
      const { Truecoin } = contracts;
      return await Truecoin.balanceOf(window.web3.eth.coinbase);
    }
  };
}