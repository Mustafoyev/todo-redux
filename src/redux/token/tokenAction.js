import { REMOVE_TOKEN, TOKEN } from './tokenType';

export const addToken = (token) => {
	return {
		type: TOKEN,
		payload: token,
	};
};

export const removeToken = () => {
	return {
		type: REMOVE_TOKEN,
		payload: '',
	};
};
