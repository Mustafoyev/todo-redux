import { TODO_ERROR, TODO_LOADER, TODO_RES } from './todoType';

export const todoLoading = () => {
	return {
		type: TODO_LOADER,
	};
};

export const todoFetch = (todos) => {
	return {
		type: TODO_RES,
		payload: todos,
	};
};

export const todoErr = (err) => {
	return {
		type: TODO_ERROR,
		payload: err,
	};
};
