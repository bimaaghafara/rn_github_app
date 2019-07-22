export const actionTypes = {
    SET_USERNAME: 'SET_USERNAME',
    SET_COMMITS: 'SET_COMMITS',
    SET_NEXT_COMMITS: 'SET NEXT_COMMITS'
}

export const setUsername = (payload) => {
	return {
		type: actionTypes.SET_USERNAME,
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