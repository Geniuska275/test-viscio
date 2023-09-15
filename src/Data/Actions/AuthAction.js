import {
	GET_ERRORS_TEXT,
	GET_USER,
	GET_USER_FAIL,
	GET_USER_LOADING,
	LOGIN_USER,
	LOGIN_USER_FAIL,
	LOGIN_USER_LOADING,
	LOGOUT,
	REGISTER_USER,
	REGISTER_USER_FAIL,
	REGISTER_USER_LOADING,
	TEMP_USER_VISCIO,
	TOKEN,
	UPDATE_USER,
	UPDATE_USER_LOADING,
} from "./ActionType";
import { SetAuthToken } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";
import { clearErrors, returnErrors } from "../Reducer/ErrorReducer";
import { getBankAccounts, getWallet } from "./WalletAction";
import { getNotify, getReferral, getSettings } from "./ReferralAction";
import { getBids, getOrders } from "./OrderAction";
import { getChats, getDispute, getFeedback } from "./ChatAction";

// LOGOUT
export const LogoutToken = () => async dispatch => {
	dispatch({ type: LOGOUT });
};

// GET USER INFO
export const loadUser = () => async dispatch => {
	if (localStorage.getItem(TOKEN)) {
		SetAuthToken(localStorage.getItem(TOKEN));
	}
	dispatch(clearErrors());
	dispatch({ type: GET_USER_LOADING });

	try {
		let res = await axios.get(
			`/users/profile?populate=avatar&populate=wallet&populate=bankAccounts&populate=driverLicense&populate=officeFrontView&populate=vehicleRegistration`
		);
		// console.log({ res: res.data });
		dispatch({
			type: GET_USER,
			payload: res.data,
		});

		dispatch(getOrders());
		dispatch(getBids());
		dispatch(getWallet());
		dispatch(getReferral());
		dispatch(getChats());
		dispatch(getDispute());
		dispatch(getFeedback());
		dispatch(getNotify());
		dispatch(getSettings());

		if (res?.data?.data?.type === "vendor") {
			dispatch(getBankAccounts());
		}
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({ type: GET_USER_FAIL });
		dispatch({
			type: GET_ERRORS_TEXT,
			payload: err?.response ? err?.response?.data?.message : err?.message,
		});
	}
};

// LOGIN ACTION
export const loginUser = userData => async dispatch => {
	dispatch({ type: LOGIN_USER_LOADING });
	// Set body
	let body = userData;
	try {
		let res = await axios.post(`/auth/login`, body);

		dispatch({
			type: LOGIN_USER,
			payload: res.data?.data,
		});
		dispatch(loadUser());
		toast.success(res.data.message, { autoClose: 5000 });
	} catch (err) {
		console.log({ err: err.response });
		dispatch(
			returnErrors({
				error: err?.response?.data?.data,
				status: err?.response?.status,
			})
		);
		toast.error(err?.response ? err?.response?.data?.message : err?.message);
		dispatch({ type: LOGIN_USER_FAIL });
	}
};

// REGISTER ACTION
export const registerUser = userData => async dispatch => {
	dispatch({ type: REGISTER_USER_LOADING });

	try {
		let res = await axios.post(
			`/auth/register`,
			{
				...userData,
				// ...data,
			},
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		dispatch({
			type: REGISTER_USER,
			payload: res.data,
		});

		toast.success(res.data.message, { autoClose: false });
	} catch (err) {
		console.log({ err: err.response });
		dispatch(
			returnErrors({
				error: err?.response?.data?.data,
				status: err?.response?.status,
			})
		);
		toast.error(err?.response ? err?.response?.data?.message : err?.message);
		dispatch({ type: REGISTER_USER_FAIL });
	}
};

export const updateUser = (data, type) => async dispatch => {
	dispatch({ type: UPDATE_USER_LOADING });
	try {
		var res;

		if (type === "profile")
			res = await axios.put(`/users/${type}`, { ...data });
		else if (type === "change-password")
			res = await axios.post(`/auth/${type}`, { ...data });
		else if (type === "profile-image")
			res = await axios.post(
				`/users/${type}`,
				{ ...data },
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

		dispatch({
			type: UPDATE_USER,
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
		dispatch({ type: LOGIN_USER_FAIL });
	}
};

export const imageUpload = async images => {
	let imgArr = [];
	for (const item of images) {
		let logo = new FormData();
		logo.append(`logo`, item);

		try {
			let res = await axios.post(`/v1/upload`, logo, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			const data = await res.data.url;
			imgArr.push(data);
		} catch (error) {
			console.log({ errorImg: error });
		}
	}
	return imgArr;
};

export const getSetTempUser = data => async dispatch => {
	try {
		if (data) {
			localStorage.setItem(TEMP_USER_VISCIO, data);
		}
		dispatch({
			type: TEMP_USER_VISCIO,
			payload: data ? data : localStorage.getItem(TEMP_USER_VISCIO),
		});
	} catch (error) {}
};
