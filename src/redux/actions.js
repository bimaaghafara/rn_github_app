export const actionTypes = {
	SHOW_LOADER: 'SHOW_LOADER',
    SET_USERNAME: 'SET_USERNAME',
	SET_PREV_COMMITS: 'SET_PREV_COMMITS',
    SET_COMMITS: 'SET_COMMITS',
	SET_NEXT_COMMITS: 'SET_NEXT_COMMITS'
}

export const showLoader = (payload) => {
	return {
		type: actionTypes.SHOW_LOADER,
		payload: payload 
	}
}

export const setUsername = (payload) => {
	return {
		type: actionTypes.SET_USERNAME,
		payload: payload 
	}
}

export const setPrevCommits = (payload) => {
	return {
		type: actionTypes.SET_PREV_COMMITS,
		payload: payload 
	}
}

export const setCommits = (payload) => {
	return {
		type: actionTypes.SET_COMMITS,
		payload: payload 
	}
}

export const setNextCommits = (payload) => {
	return {
		type: actionTypes.SET_NEXT_COMMITS,
		payload: payload 
	}
}