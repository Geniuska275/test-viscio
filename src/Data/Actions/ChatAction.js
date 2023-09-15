import axios from "axios";
import { toast } from "react-toastify";
import { returnErrors } from "../Reducer/ErrorReducer";
import {
	ADD_CHAT,
	ADD_CHAT_FAIL,
	ADD_DISPUTE,
	ADD_FEEDBACK,
	DELETE_FEEDBACK,
	GET_ALL_DISPUTE,
	GET_CHAT,
	GET_CHAT_FAIL,
	GET_CHAT_LOADING,
	GET_DISPUTE,
	GET_DISPUTE_FAIL,
	GET_FEEDBACK,
	GET_FEEDBACK_FAIL,
	UPDATE_DISPUTE,
	UPDATE_FEEDBACK,
} from "./ActionType";

export const getChats =
	(data, load = false) =>
	async dispatch => {
		if (!load) dispatch({ type: GET_CHAT_LOADING });
		try {
			let res = await axios.get(
				`/chat?populate=lastMessage&populate=users&populate=users.avatar&orderBy=updatedAt&order=asc${
					!data ? "" : `&limit=${data.limit}`
				}`
			);

			dispatch({
				type: GET_CHAT,
				payload: res.data,
			});
		} catch (err) {
			if (err) console.log({ err });
			if (err) console.log(err?.response ? err?.response?.data : err?.message);
			dispatch({ type: GET_CHAT_FAIL });
		}
	};

export const updateChats = (data, type) => async dispatch => {
	try {
		var res;
		// console.log({ data, type });
		if (type === "file")
			res = await axios.post(
				`/chat/${data?.chatId}/message`,
				{ ...data },
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
		else res = await axios.post(`/chat/${data?.chatId}/message`, { ...data });
		// console.log({ res: res?.data });
		dispatch({
			type: ADD_CHAT,
			payload: res.data?.data,
		});

		// toast.success(res.data.message, {
		// 	autoClose: 5000,
		// });
		dispatch(getChats(null, "load"));
	} catch (err) {
		console.log({ err: err.response });
		dispatch(
			returnErrors({
				error: err?.response?.data?.data,
				status: err?.response?.status,
			})
		);
		toast.error(err?.response ? err?.response?.data?.message : err?.message);
		dispatch({ type: ADD_CHAT_FAIL });
	}
};

export const getDispute = data => async dispatch => {
	dispatch({ type: GET_CHAT_LOADING });
	try {
		let res = await axios.get(
			`/chat/report?populate=files&populate=chat&populate=owner${
				!data ? "" : `&limit=${data.limit}`
			}`
		);

		let res1 = await axios.get(
			`/chat/report?populate=files&populate=chat&populate=owner&limit=${res?.data?.data?.totalDocs}`
		);

		dispatch({
			type: GET_DISPUTE,
			payload: res.data,
		});
		dispatch({
			type: GET_ALL_DISPUTE,
			payload: res1.data?.data?.docs,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({ type: GET_DISPUTE_FAIL });
	}
};

export const updateDispute = (data, type) => async dispatch => {
	try {
		var res;
		// console.log({ type, data });
		if (type === "update")
			res = await axios.post(`/chat/${data?.dispute}/resolve`);
		else
			res = await axios.post(
				`/chat/report`,
				{ ...data },
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
		// console.log({ res: res?.data });
		dispatch({
			type: type === "update" ? UPDATE_DISPUTE : ADD_DISPUTE,
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
		dispatch({
			type: GET_DISPUTE_FAIL,
		});
	}
};

export const getFeedback = data => async dispatch => {
	try {
		let res = await axios.get(
			`/feedback?populate=createdBy${!data ? "" : `&limit=${data.limit}`}`
		);

		dispatch({
			type: GET_FEEDBACK,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({ type: GET_FEEDBACK_FAIL });
	}
};

export const updateFeedback = (data, type) => async dispatch => {
	try {
		var res;
		// console.log({ data, type });
		if (type === "add") res = await axios.post(`/feedback`, { ...data });
		else if (type === "update")
			res = await axios.put(`/feedback/${data?._id}`, { ...data });
		else if (type === "delete")
			res = await axios.delete(`/feedback/${data?._id}`);

		if (type === "add")
			dispatch({
				type: ADD_FEEDBACK,
				payload: res.data?.data,
			});
		else if (type === "update")
			dispatch({
				type: UPDATE_FEEDBACK,
				payload: res.data?.data,
			});
		else if (type === "delete")
			dispatch({
				type: DELETE_FEEDBACK,
				payload: data,
			});

		toast.success(res.data.message, {
			autoClose: 5000,
		});
		dispatch(getFeedback());
	} catch (err) {
		console.log({ err: err.response });
		dispatch(
			returnErrors({
				error: err?.response?.data?.data,
				status: err?.response?.status,
			})
		);
		toast.error(err?.response ? err?.response?.data?.message : err?.message);
		dispatch({ type: GET_FEEDBACK_FAIL });
	}
};
