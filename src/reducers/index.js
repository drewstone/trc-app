import { combineReducers } from 'redux';
import { handle } from 'redux-pack';
import {
  screens,
  screenActions,
  marketActions,
  userActions,
  decentralActions,
} from '../constants';


const screenInitialState = {
  currentScreen: screens.PLATFORM,
  metadata: null,
};

const screenReducer = (state = screenInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case screenActions.SWITCH_TO:
      return { ...state, currentScreen: payload.screen, metadata: payload.metadata };
    default:
      return state;
  }
};

const marketInitialState = {
  predictions: {},
  tasks: [],
};

const marketReducer = (state = marketInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case marketActions.ADD_TASK:
      return handle(state, action, {
        start: prevState => ({ ...prevState, isLoading: true, fooError: null }),
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({ ...prevState, fooError: payload }),
        success: prevState => ({
          ...prevState,
          tasks: [ ...prevState.tasks, { ...payload } ],
        }),
      });
    case marketActions.FETCH_TASKS:
      return handle(state, action, {
        start: prevState => ({ ...prevState, isLoading: true, fooError: null }),
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({ ...prevState, fooError: payload }),
        success: prevState => {
          return {
            ...prevState,
            tasks: [ ...prevState.tasks, ...payload ],
          }
        },
      });
    default:
      return state;
  }
}


const decentralInitialState = {
  contracts: {},
}

const decentralReducer = (state = decentralInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case decentralActions.FETCH_CONTRACTS:
      return handle(state, action, {
        start: prevState => ({ ...prevState, isLoading: true, fooError: null }),
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({ ...prevState, fooError: payload }),
        success: prevState => ({ ...prevState, contracts: payload }),
      });
    default:
      return state;
  }
};

export default combineReducers({
  screen: screenReducer,
  market: marketReducer,
  decentral: decentralReducer,
});
