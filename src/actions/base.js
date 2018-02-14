import Promise from 'bluebird';
import eth from './ethereum';

export default function(web3) {
  return {
    fetchContracts: async function() {
      const contracts = await eth.fetchContracts(web3);
      return contracts;
    },
    fetchTasks: async function(contracts) {
      const { Mechanism, Protocol } = contracts;

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
          answers: task.getAnswers.call(),
          participants: task.getParticipants.call(),
          events: task.getEvents.call(),
          initiationTime: task.initiationTime.call(),
          terminationTime: task.terminationTime.call(),
        }
      });

      let result = await Promise.all(promises.map(Promise.props))
      tasks = result.map(elt => ({
        id: elt.id,
        name: web3.toAscii(elt.name),
        protocol: elt.protocol,
        designer: elt.designer,
        description: elt.description,
        questions: elt.questions,
        answers: elt.answers,
        participants: elt.participants,
        events: elt.events,
        initiationTime: elt.initiationTime.toNumber(),
        terminationTime: elt.terminationTime.toNumber(),
      }));

      return Promise.resolve(tasks);
    },
    
    addTask: async function(contracts, data) {
      const { Protocol } = contracts;
      const taskName = data.task;
      const designer = data.designer;
      const events = data.choices;
      const timeLength = 1;
      const questions = data.questions.map(q => q.text);
      const description = data.description;
      const tags = data.tags;
      const args = [taskName, events, questions, timeLength, description, tags];

      try {
        let result = await Protocol.createTask(...args, { from: designer });  
        return Promise.resolve(data);
      } catch (exception) {
        return Promise.reject(`Failed to create task: ${exception}`);
      }
    },

    submitTask: async function(contracts, data) {
      const { Protocol } = contracts;

      const questionIndices = data.clicked.map((d, inx) => {
        if (d != undefined) {
          return inx;
        } else {
          return false;
        }
      }).filter(d => (!!d || d == 0));

      const taskName = data.task;
      const questions = data.questions
        .filter((q, inx) => questionIndices.indexOf(inx) !== -1);
      const designer = data.poster;
      const submitter = data.submitter;

      // sample data structure; [[0], [1], [0], [1], [0], [1], [0]]
      const metaPreds = data.sliderValues.map(pred => (pred * 1.0) / 100);
      const predictions = data.clicked
        .map((click, inx) => [click, Number(web3.toWei(metaPreds[inx], 'ether'))])
        .filter((binary, meta) => (!!binary));

      if (predictions.length == questions.length == questionIndices.length) {
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
      const { Protocol } = contracts;

      const taskName = data.task;
      const designer = data.poster;
      const submitter = data.submitter;

      try {
        let result = await Protocol.scoreTaskRBTS(taskName, designer, { from: submitter });
        return Promise.resolve(result);
      } catch (exception) {
        return Promise.reject(`Failed to score task: ${exception}`);
      }
    },
  };
}