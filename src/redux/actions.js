export const actionTypes = {
    SET_USERNAME: 'SET_USERNAME',
    SET_TOKEN: 'SET_TOKEN',
    SET_COMMITS: 'SET_COMMITS',
    SET_NEXT_COMMITS: 'SET NEXT_COMMITS'
}

export const setUsername = (payload) => {
	return {
		type: actionTypes.SET_USERNAME,
		payload: payload 
	}
}

export const setToken = (payload) => {
	return {
		type: actionTypes.SET_TOKEN,
		payload: payload 
	}
}