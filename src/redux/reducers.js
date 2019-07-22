import { actionTypes } from './actions';

const INITIAL_STATE = {
	showLoader: false,
	username: '',
	commits: [],
	nextCommits: [],
};

const reducers = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.SHOW_LOADER:
			return {
				...state,
				showLoader: action.payload
			}
		case actionTypes.SET_USERNAME:
			return {
				...state,
				username: action.payload
			}
		case actionTypes.SET_COMMITS:
			return {
				...state,
				commits: action.payload
			}
		case actionTypes.SET_NEXT_COMMITS:
			return {
				...state,
				nextCommits: action.payload
			}
		default:
			return state
	}
};

export default reducers