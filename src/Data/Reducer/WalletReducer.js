import {
	ADD_WALLET,
	ADD_WALLET_FAIL,
	GET_WALLET,
	GET_WALLET_FAIL,
	GET_WALLET_LOADING,
	LOGOUT,
} from "../Actions/ActionType";
let init = {
	wallet: [],
	isLoading: false,
	isAdded: false,
};

const WalletReducer = (state = init, { type, payload }) => {
	switch (type) {
		case GET_WALLET:
			return { ...state, wallet: payload, isLoading: false };
		case GET_WALLET_LOADING:
			return { ...state, isLoading: true };
		case ADD_WALLET:
			return {
				...state,
				isAdded: true,
			};
		case GET_WALLET_FAIL:
		case ADD_WALLET_FAIL:
			return {
				...state,
				wallet: state.wallet,
				isLoading: false,
				isAdded: false,
			};
		case LOGOUT:
			return init;
		default:
			return state;
	}
};

export default WalletReducer;
