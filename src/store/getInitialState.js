import { screens } from '../constants';

const developmentFixtures = {
  market: {
    questions: [{
      id: 1,
      mechanismType: 'Endogenous',
      text: 'Will APPL go up or down?',
      choices: ['up', 'down']
    },
    {
      id: 2,
      mechanismType: 'Endogenous',
      text: 'Will GOOG go up or down?',
      choices: ['up', 'down']
    },
    {
      id: 3,
      mechanismType: 'Endogenous',
      text: 'Will SBUX go up or down?',
      choices: ['up', 'down']
    },
    {
      id: 4,
      mechanismType: 'Endogenous',
      text: 'Will TSLA go up or down?',
      choices: ['up', 'down']
    },
    {
      id: 5,
      mechanismType: 'Endogenous',
      text: 'Will FB go up or down?',
      choices: ['up', 'down']
    }],
  }
}

export default function (config) {
  const state = { currentScreen: screens.NEWUSER };

  if (process.env.NODE_ENV === 'development') {
    return Object.assign({}, state, developmentFixtures);
  }

  return state;
}
