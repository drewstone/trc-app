import { screens } from '../constants';

const developmentFixtures = {
  market: {
    tasks: [{
      task: 'Financial predictions',
      designer: 'John',
      description: 'The following tasks contain numerous stock market prediction questions. Complete the tasks by submitting your predictons over the available stocks in question.',
      initiationTime: Date.now(),
      tags: ['Finance'],
      choices: ['up', 'down'],
      questions: [
        'Will APPL go up or down?',
        'Will GOOG go up or down?',
        'Will SBUX go up or down?',
        'Will TSLA go up or down?',
        'Will FB go up or down?'
      ],
    }]
  },
}

export default function (config) {
  const state = {
    screen: {
      currentScreen: screens.LANDING_PAGE,
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
