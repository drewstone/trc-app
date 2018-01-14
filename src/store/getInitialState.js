import { screens } from '../constants';

const developmentFixtures = {
  market: {
    predictions: {
      1: [{
        user: 'Jim',
        prediction: 'up',
      }]
    },
    tasks: [{
      id: 1,
      creationTime: Date.now(),
      poster: 'John',
      mechanismType: 'Endogenous',
      text: 'Will APPL go up or down?',
      choices: ['up', 'down'],
      tags: ['Finance'],
    },
    {
      id: 2,
      creationTime: Date.now(),
      poster: 'John',
      mechanismType: 'Endogenous',
      text: 'Will GOOG go up or down?',
      choices: ['up', 'down'],
      tags: ['Finance'],
    },
    {
      id: 3,
      creationTime: Date.now(),
      poster: 'John',
      mechanismType: 'Endogenous',
      text: 'Will SBUX go up or down?',
      choices: ['up', 'down'],
      tags: ['Finance'],
    },
    {
      id: 4,
      creationTime: Date.now(),
      poster: 'John',
      mechanismType: 'Endogenous',
      text: 'Will TSLA go up or down?',
      choices: ['up', 'down'],
      tags: ['Finance'],
    },
    {
      id: 5,
      creationTime: Date.now(),
      poster: 'John',
      mechanismType: 'Endogenous',
      text: 'Will FB go up or down?',
      choices: ['up', 'down'],
      tags: ['Finance'],
    }],
  },
}

export default function (config) {
  const state = {
    screen: {
      currentScreen: screens.PLATFORM,
      metadata: null
    },
  };

  if (process.env.NODE_ENV === 'development') {
    return Object.assign({}, state, developmentFixtures);
  }

  return state;
}
