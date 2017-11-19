import { screens } from '../constants';

const developmentFixtures = {
  market: {
    questions: [{
      id: 1,
      text: 'Will AAPL go up or down?',
      mechanismType: 'Endogenous',
      choices: ['up', 'down'],
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
