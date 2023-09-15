import {
	ADD_REFERRAL,
	ADD_REFERRAL_FAIL,
	GET_NOTIFICATION,
	GET_PRICE_CHECKER_TWO,
	GET_PRICE_CHECKER_TWO_FAIL,
	GET_REFERRAL,
	GET_REFERRAL_FAIL,
	GET_REFERRAL_LOADING,
	GET_SETTINGS,
	LOGOUT,
	UPDATE_NOTIFICATION,
} from "../Actions/ActionType";
import { EditData } from "./AuthReducer";
let init = {
	referral: [],
	isLoading: false,
	isAdded: false,
	properties: null,
	notification: [],
	properties_notify: null,
	isUpdated: null,
	settings: null,
};

const ReferralReducer = (state = init, { type, payload }) => {
	switch (type) {
		case GET_REFERRAL:
			return {
				...state,
				referral: payload?.data?.docs,
				properties: { ...payload?.data, docs: null },
				isLoading: false,
			};
		case GET_NOTIFICATION:
			return {
				...state,
				notification: payload?.data?.docs,
				properties_notify: { ...payload?.data, docs: null },
			};
		case UPDATE_NOTIFICATION:
			return { ...state, notification: EditData(state.notification, payload) };
		case GET_REFERRAL_LOADING:
			return { ...state, isLoading: true };
		case ADD_REFERRAL:
			return {
				...state,
				referral: [payload, ...state.referral],
				isAdded: true,
			};
		case GET_SETTINGS:
			return { ...state, settings: payload };
		case GET_REFERRAL_FAIL:
		case ADD_REFERRAL_FAIL:
			return {
				...state,
				referral: state.referral,
				isLoading: false,
				isAdded: false,
			};
		case LOGOUT:
			return init;
		default:
			return state;
	}
};

let init2 = {
	prices: null,
	isFound: false,
};

export const PriceCheckerReducer = (state = init2, { type, payload }) => {
	switch (type) {
		case GET_PRICE_CHECKER_TWO:
			return {
				...state,
				prices: payload?.data,
				isFound: true,
			};
		case GET_PRICE_CHECKER_TWO_FAIL:
			return {
				...state,
				prices: state.prices,
				isFound: false,
			};
		case LOGOUT:
			return init2;
		default:
			return state;
	}
};

export default ReferralReducer;
