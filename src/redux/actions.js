export const actionTypes = {
    SET_USERNAME: 'SET_USERNAME',
    SET_PASSWORD: 'SET_PASSWORD',
    SET_COMMITS: 'SET_COMMITS',
    SET_NEXT_COMMITS: 'SET NEXT_COMMITS'
}

export const setUsername = (payload) => {
	return {
		type: actionTypes.SET_USERNAME,
		payload: payload 
	}
}

export const setPassword = (payload) => {
	return {
		type: actionTypes.SET_PASSWORD,
		payload: payload 
	}
}