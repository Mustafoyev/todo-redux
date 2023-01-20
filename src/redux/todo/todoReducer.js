import { TODO_ERROR, TODO_LOADER, TODO_RES } from './todoType';

const initialState = {
	loading: false,
	data: [],
	error: false,
};

export const todoReducer = (state = initialState, action) => {
	switch (action.type) {
		case TODO_LOADER:
			return {
				...state,
				loading: true,
			};
		case TODO_RES:
			return {
				...state,
				loading: false,
				data: action.payload,
			};
		case TODO_ERROR:
			return {
				...state,
				loading: false,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};
