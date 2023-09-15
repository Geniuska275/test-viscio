import axios from "axios";
import { toast } from "react-toastify";
import { returnErrors } from "../Reducer/ErrorReducer";
import {
	ADD_ORDER,
	ADD_ORDER_FAIL,
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
	UPDATE_ORDER,
	UPDATE_ORDER_LOADING,
} from "./ActionType";
import { getChats } from "./ChatAction";

export const getOrders =
	(data, load = false) =>
	async dispatch => {
		if (!data && !load) dispatch({ type: GET_ORDER_LOADING });
		try {
			let res = await axios.get(
				`/orders?populate=bid${!data?.limit ? "" : `&limit=${data?.limit}`}`
			);

			let res2 = await axios.get(
				`/orders?populate=bid&limit=${res?.data?.data?.totalDocs}`
			);

			dispatch({
				type: GET_ORDER,
				payload: res.data,
			});

			dispatch({
				type: GET_ALL_ORDER,
				payload: res2.data,
			});
		} catch (err) {
			if (err) console.log({ err });
			if (err) console.log(err?.response ? err?.response?.data : err?.message);
			dispatch({ type: GET_ORDER_FAIL });
		}
	};

export const getRecentOrders = () => async dispatch => {
	try {
		let res = await axios.get(`/orders/recent`);

		dispatch({
			type: GET_RECENT_ORDER,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({ type: GET_RECENT_ORDER_FAIL });
	}
};

export const addOrders = thisData => async dispatch => {
	try {
		let res = await axios.post(`/orders`, { ...thisData });

		dispatch({
			type: ADD_ORDER,
			payload: res.data?.data,
		});
		dispatch(getBids("load"));
		dispatch(getChats(null, "load"));

		toast.success(res.data.message, {
			autoClose: 5000,
		});
	} catch (err) {
		console.log({ err: err.response });
		dispatch(
			returnErrors({
				error: err?.response?.data?.data,
				status: err?.response?.status,
			})
		);
		toast.error(err?.response ? err?.response?.data?.message : err?.message);
		dispatch({ type: ADD_ORDER_FAIL });
	}
};

export const getBids =
	(load = false) =>
	async dispatch => {
		if (!load) dispatch({ type: GET_BIDS_LOADING });
		try {
			let res = await axios.get(
				`/orders/bids?populate=order&populate=order.bid&populate=chat`
			);
			let res2 = await axios.get(
				`/orders/bids?status=pending&populate=order&populate=order.bid&populate=chat&limit=${res?.data?.data?.totalDocs}`
			);
			let res3 = await axios.get(
				`/orders/bids?status=picked&populate=order&populate=order.bid&populate=chat&limit=${res?.data?.data?.totalDocs}`
			);
			let res4 = await axios.get(
				`/orders/bids?status=completed&populate=order&populate=order.bid&populate=chat&limit=${res?.data?.data?.totalDocs}`
			);

			let res5 = await axios.get(
				`/orders/bids?populate=order&populate=order.bid&populate=order.user&populate=chat&limit=${res?.data?.data?.totalDocs}`
			);

			dispatch({
				type: GET_BIDS,
				payload: res.data?.data?.docs,
			});
			dispatch({
				type: GET_BIDS_PENDING,
				payload: res2.data,
			});
			dispatch({
				type: GET_BIDS_PICKUP,
				payload: res3.data,
			});
			dispatch({
				type: GET_BIDS_COMPLETED,
				payload: res4.data,
			});
			dispatch({
				type: GET_ALL_BIDS,
				payload: res5.data?.data?.docs,
			});
		} catch (err) {
			if (err) console.log({ err });
			if (err) console.log(err?.response ? err?.response?.data : err?.message);
			dispatch({ type: GET_BIDS_FAIL });
		}
	};

export const getTrackOrder = data => async dispatch => {
	dispatch({ type: GET_TRACK_ORDER_LOADING });
	try {
		let res = await axios.get(`/orders/track/${data}`);

		dispatch({
			type: GET_TRACK_ORDER,
			payload: res.data?.data,
		});

		toast.success(res.data.message, {
			autoClose: 5000,
		});
	} catch (err) {
		console.log({ err: err.response });
		dispatch(
			returnErrors({
				error: err?.response?.data?.data,
				status: err?.response?.status,
			})
		);
		toast.error(err?.response ? err?.response?.data?.message : err?.message);
		dispatch({ type: GET_TRACK_ORDER_FAIL });
	}
};

export const updateOrderTypes = (id, type, data) => async dispatch => {
	dispatch({ type: UPDATE_ORDER_LOADING });
	try {
		var res;
		if (type === "bid") {
			res = await axios.post(`/orders/${type}/${id}`, { ...data });
		} else if (type === "update")
			res = await axios.put(`/orders/update/${id}`, { ...data });
		else if (type === "pickup")
			res = await axios.put(`/orders/update/${id}`, { ...data });
		else res = await axios.post(`/orders/${type}/${id}`);

		dispatch({
			type: UPDATE_ORDER,
			payload: res.data?.data,
		});
		dispatch(getBids("load"));
		dispatch(getOrders(null, "load"));
		dispatch(getChats(null, "load"));

		toast.success(res.data.message, {
			autoClose: 5000,
		});
	} catch (err) {
		console.log({ err: err.response });
		dispatch(
			returnErrors({
				error: err?.response?.data?.data,
				status: err?.response?.status,
			})
		);
		toast.error(err?.response ? err?.response?.data?.message : err?.message);

		dispatch({ type: GET_ORDER_FAIL });
	}
};
