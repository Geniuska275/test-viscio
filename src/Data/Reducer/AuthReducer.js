import {
	GET_USER,
	GET_USER_FAIL,
	GET_USER_LOADING,
	LOGIN_USER,
	LOGIN_USER_FAIL,
	LOGIN_USER_LOADING,
	LOGOUT,
	REGISTER_USER,
	REGISTER_USER_FAIL,
	TEMP_USER_VISCIO,
	TOKEN,
	UPDATE_USER,
	UPDATE_USER_FAIL,
	UPDATE_USER_LOADING,
} from "../Actions/ActionType";

const initialState = {
	token: localStorage.getItem(TOKEN),
	user: null,
	isAuth: false,
	isLoggedIn: false,
	isRegistered: false,
	isLoading: false,
	isAuthLoading: false,
	logoutLoading: false,
	userType: "",
	update_loading: false,
	isUpdated: false,
};

const AuthReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_USER:
			return {
				...state,
				user: payload.data,
				isAuth: true,
				isAuthLoading: false,
			};
		case GET_USER_FAIL:
			return {
				...state,
				user: null,
				isAuth: false,
				isAuthLoading: false,
			};
		case GET_USER_LOADING:
			return {
				...state,
				isAuthLoading: true,
			};
		case LOGIN_USER:
			localStorage.setItem(TOKEN, payload.token);
			return {
				...state,
				isLoggedIn: true,
				isLoading: false,
			};
		case LOGIN_USER_FAIL:
			return {
				...state,
				isLoggedIn: false,
				isLoading: false,
			};
		case REGISTER_USER:
			// localStorage.setItem(TOKEN, payload.token);
			return {
				...state,
				isRegistered: true,
				isLoading: false,
			};
		case REGISTER_USER_FAIL:
			return {
				...state,
				isRegistered: false,
				isLoading: false,
			};
		case LOGIN_USER_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case UPDATE_USER_LOADING:
			return {
				...state,
				update_loading: true,
			};
		case UPDATE_USER:
			return {
				...state,
				update_loading: false,
				user: payload,
				isUpdated: true,
			};
		case UPDATE_USER_FAIL:
			return {
				...state,
				update_loading: false,
				user: state.user,
				isUpdated: false,
			};
		case TEMP_USER_VISCIO:
			return {
				...state,
				userType: payload,
			};
		case LOGOUT:
			localStorage.removeItem(TOKEN);
			localStorage.removeItem(TEMP_USER_VISCIO);
			return {
				token: null,
				user: null,
				isAuth: false,
				isLoggedIn: false,
				isLoading: false,
			};
		default:
			return state;
	}
};

export default AuthReducer;

export const EditData = (data, payload) => {
	return data.map(item => (item._id !== payload._id ? item : payload));
};

export const DeleteData = (data, payload) => {
	return [...data.filter(item => item._id !== payload._id)];
};
