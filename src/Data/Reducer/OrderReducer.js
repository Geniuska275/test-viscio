import {
	ACCEPT_ORDER,
	ADD_ORDER,
	GET_ALL_BIDS,
	GET_ALL_ORDER,
	GET_BIDS,
	GET_BIDS_COMPLETED,
	GET_BIDS_FAIL,
	GET_BIDS_LOADING,
	GET_BIDS_PENDING,
	GET_BIDS_PICKUP,
	GET_ORDER,
	GET_ORDER_FAIL,
	GET_ORDER_LOADING,
	GET_RECENT_ORDER,
	GET_RECENT_ORDER_FAIL,
	GET_TRACK_ORDER,
	GET_TRACK_ORDER_FAIL,
	GET_TRACK_ORDER_LOADING,
	LOGOUT,
	UPDATE_ORDER,
} from "../Actions/ActionType";
import { EditData } from "./AuthReducer";

let init = {
	order: [],
	all_order: 0,
	isLoading: false,
	isAdded: false,
	isUpdated: false,
	isAccepted: false,
	bids: [],
	pending_bids: [],
	pending_total: 0,
	pickup_bids: [],
	pickup_total: 0,
	completed_bids: [],
	completed_total: 0,
	bid_loading: false,
	track_order: null,
	track_loading: false,
	update_loading: false,
	recent_order: [],
	total_bids: [],
	properties: null,
};

const OrderReducer = (state = init, { type, payload }) => {
	switch (type) {
		case GET_ORDER:
			return {
				...state,
				order: payload?.data?.docs,
				properties: { ...payload?.data, docs: null },
				isLoading: false,
			};
		case GET_ALL_ORDER:
			return {
				...state,
				all_order: payload?.data?.docs,
			};
		case GET_RECENT_ORDER:
			return { ...state, recent_order: payload?.data };
		case GET_RECENT_ORDER_FAIL:
			return { ...state, recent_order: state.recent_order };
		case GET_ORDER_LOADING:
			return { ...state, isLoading: true };
		case ADD_ORDER:
			return {
				...state,
				order: [payload, ...state.order],
				all_order: [payload, ...state.all_order],
				isAdded: true,
			};
		case UPDATE_ORDER:
			return {
				...state,
				order: EditData(state.order, payload),
				all_order: EditData(state.all_order, payload),
				isUpdated: true,
				update_loading: false,
			};
		case ACCEPT_ORDER:
			return {
				...state,
				order: EditData(state.order, payload),
				all_order: EditData(state.all_order, payload),
				isAccepted: true,
				update_loading: false,
			};
		case GET_TRACK_ORDER_LOADING:
			return { ...state, track_loading: true };
		case GET_TRACK_ORDER:
			return { ...state, track_order: payload, track_loading: false };
		case GET_TRACK_ORDER_FAIL:
			return { ...state, track_order: null, track_loading: false };
		case GET_BIDS_LOADING:
			return { ...state, bid_loading: true };
		case GET_BIDS:
			return { ...state, bids: payload, bid_loading: false };
		case GET_ALL_BIDS:
			return {
				...state,
				total_bids: payload,
			};
		case GET_BIDS_PENDING:
			return {
				...state,
				pending_bids: payload?.data?.docs,
				pending_total: payload?.data?.totalDocs,
			};
		case GET_BIDS_PICKUP:
			return {
				...state,
				pickup_bids: payload?.data?.docs,
				pickup_total: payload?.data?.totalDocs,
			};
		case GET_BIDS_COMPLETED:
			return {
				...state,
				completed_bids: payload?.data?.docs,
				completed_total: payload?.data?.totalDocs,
			};
		case GET_BIDS_FAIL:
			return {
				...state,
				bids: state.bids,
				pending_bids: state.pending_bids,
				pickup_bids: state.pickup_bids,
				completed_bids: state.completed_bids,
				bid_loading: false,
			};
		case GET_ORDER_FAIL:
			return {
				...state,
				order: state.order,
				isLoading: false,
				isAdded: false,
				isUpdated: false,
				isAccepted: false,
				update_loading: false,
			};
		case LOGOUT:
			return { ...init, recent_order: state?.recent_order };
		default:
			return state;
	}
};

export default OrderReducer;
