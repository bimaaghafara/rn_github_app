import {actionTypes} from './actions';

const INITIAL_STATE = {
  username: 'uuuu',
  password: 'pppp',
  commits: [],
  nextCommits: [],
};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_USERNAME:
        return {
            ...state,
            username: action.payload
        }
    case actionTypes.SET_PASSWORD:
        return {
            ...state,
            password: action.payload
        }
    default:
        return state
  }
};

export default reducers