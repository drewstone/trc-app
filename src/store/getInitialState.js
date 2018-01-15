import { screens } from '../constants';

const developmentFixtures = {
  market: {
    predictions: {
      1: [{
        user: 'Jim',
        prediction: 'up',
      }]
    },
    topics: [{
      topic: 'Financial predictions',
      poster: 'John',
      description: 'The following tasks contain numerous stock market prediction questions. Complete the tasks by submitting your predictons over the available stocks in question.',
      creationTime: Date.now(),
      mechanismType: 'Endogenous',
      tags: ['Finance'],
      tasks: [
        { text: 'Will APPL go up or down?', choices: ['up', 'down'] },
        { text: 'Will GOOG go up or down?', choices: ['up', 'down'] },
        { text: 'Will SBUX go up or down?', choices: ['up', 'down'] },
        { text: 'Will TSLA go up or down?', choices: ['up', 'down'] },
        { text: 'Will FB go up or down?', choices: ['up', 'down'] }
      ],
    }]
  },
}

export default function (config) {
  const state = {
    screen: {
      currentScreen: screens.PLATFORM,
      metadata: {
        component: "HOME",
      }
    },
  };

  if (process.env.NODE_ENV === 'development') {
    return Object.assign({}, state, developmentFixtures);
  }

  return state;
}
