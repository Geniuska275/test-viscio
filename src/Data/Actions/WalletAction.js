import axios from "axios";
import { toast } from "react-toastify";
import { returnErrors } from "../Reducer/ErrorReducer";
import {
	ADD_BANK_ACCOUNT,
	ADD_WALLET,
	ADD_WALLET_FAIL,
	DELETE_BANK_ACCOUNT,
	GET_ALL_BANKS,
	GET_BANK_ACCOUNT,
	GET_BANK_ACCOUNT_FAIL,
	GET_WALLET,
	GET_WALLET_FAIL,
	GET_WALLET_LOADING,
} from "./ActionType";

export const getWallet = () => async dispatch => {
	dispatch({ type: GET_WALLET_LOADING });
	try {
		let res = await axios.get(`/wallet?populate=histories`);
		dispatch({
			type: GET_WALLET,
			payload: res.data?.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({ type: GET_WALLET_FAIL });
	}
};

export const getBankAccounts = () => async dispatch => {
	dispatch({ type: GET_WALLET_LOADING });
	try {
		let resB = await axios.get(`/wallet/banks`);

		dispatch({
			type: GET_ALL_BANKS,
			payload: resB.data?.data,
		});
		let res = await axios.get(
			`/users/profile?populate[]=bankAccounts&select=bankAccounts`
		);

		dispatch({
			type: GET_BANK_ACCOUNT,
			payload: res.data?.data?.bankAccounts,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({ type: GET_BANK_ACCOUNT_FAIL });
	}
};

export const fundWallet = (type, thisData) => async dispatch => {
	try {
		var res;
		if (type === "verify") {
			res = await axios.get(
				`/transaction/verify?reference=${
					thisData.reference
						? thisData.reference
						: thisData.transactionRef.reference
				}`
			);

			dispatch({
				type: ADD_WALLET,
				payload: res.data,
			});
			dispatch(getWallet());
		} else if (type === "banks") {
			res = await axios.post(`/wallet/bank-account`, { ...thisData });
			dispatch({
				type: ADD_BANK_ACCOUNT,
				payload: res.data?.data,
			});
			dispatch(getBankAccounts());
		} else if (type === "initiate") {
			res = await axios.post(`/wallet/withdrawal`, { ...thisData });
			dispatch({
				type: ADD_WALLET,
				payload: res.data?.data,
			});
			dispatch(getWallet());
		} else if (type === "delete-bank") {
			res = await axios.delete(`/wallet/bank-account/${thisData?._id}`);
			dispatch({
				type: DELETE_BANK_ACCOUNT,
				payload: thisData,
			});
			dispatch(getBankAccounts());
		}

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
		if (type === "banks") dispatch({ type: GET_BANK_ACCOUNT_FAIL });
		else dispatch({ type: ADD_WALLET_FAIL });
	}
};
