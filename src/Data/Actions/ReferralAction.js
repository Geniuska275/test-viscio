import axios from "axios";
import { toast } from "react-toastify";
import { returnErrors } from "../Reducer/ErrorReducer";
import {
	ADD_REFERRAL,
	ADD_REFERRAL_FAIL,
	GET_REFERRAL,
	GET_REFERRAL_FAIL,
	GET_REFERRAL_LOADING,
	GET_PRICE_CHECKER_TWO,
	GET_PRICE_CHECKER_TWO_FAIL,
	GET_NOTIFICATION,
	UPDATE_NOTIFICATION,
	GET_SETTINGS,
} from "./ActionType";

export const getSettings = () => async dispatch => {
	dispatch({ type: GET_REFERRAL_LOADING });
	try {
		let res = await axios.get(`/settings?populate=payload&populate=user`);

		dispatch({
			type: GET_SETTINGS,
			payload: res.data?.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
	}
};

export const getReferral = data => async dispatch => {
	dispatch({ type: GET_REFERRAL_LOADING });
	try {
		let res = await axios.get(
			`/users/referrals${!data ? "" : `&limit=${data.limit}`}`
		);

		dispatch({
			type: GET_REFERRAL,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({ type: GET_REFERRAL_FAIL });
	}
};

export const getNotify = data => async dispatch => {
	dispatch({ type: GET_REFERRAL_LOADING });
	try {
		let res = await axios.get(
			`/notification${!data ? "" : `&limit=${data.limit}`}`
		);

		dispatch({
			type: GET_NOTIFICATION,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
	}
};

export const readNotification = data => async dispatch => {
	dispatch({ type: GET_REFERRAL_LOADING });
	try {
		let res = await axios.put(`/notification/${data}`);

		dispatch({
			type: UPDATE_NOTIFICATION,
			payload: res.data?.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
	}
};

export const fundWalletReferral = thisData => async dispatch => {
	try {
		var res = await axios.post(`/referral`, { ...thisData });

		dispatch({
			type: ADD_REFERRAL,
			payload: res.data,
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
		dispatch({ type: ADD_REFERRAL_FAIL });
	}
};

export const getPriceChecker = thisData => async dispatch => {
	try {
		let res = await axios.get(
			`/price-checker/distance?origin=${thisData?.origin}&destination=${thisData?.destination}&vehicleType=${thisData?.vehicleType}`
		);

		dispatch({
			type: GET_PRICE_CHECKER_TWO,
			payload: res.data,
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
		dispatch({ type: GET_PRICE_CHECKER_TWO_FAIL });
	}
};
