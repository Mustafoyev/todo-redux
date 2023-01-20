import { USER, USER_REMOVE } from './userType';

const initialState = {
	user: {},
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER:
			return {
				...state,
				user: action.payload,
			};
		case USER_REMOVE:
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
};
