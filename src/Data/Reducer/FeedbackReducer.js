import {
	ADD_FEEDBACK,
	DELETE_FEEDBACK,
	GET_FEEDBACK,
	GET_FEEDBACK_FAIL,
	LOGOUT,
	UPDATE_FEEDBACK,
} from "../Actions/ActionType";
import { DeleteData, EditData } from "./AuthReducer";


let init2 = {
	feedback: [],
	isLoading: false,
	isAdded: false,
	isUpdated: false,
	isDeleted: false,
	properties: null,
};

const FeedbackReducer = (state = init2, { type, payload }) => {
	switch (type) {
		case GET_FEEDBACK:
			return {
				...state,
				feedback: payload?.data?.docs,
				properties: { ...payload?.data, docs: null },
				isLoading: false,
			};
		case ADD_FEEDBACK:
			return {
				...state,
				feedback: [payload, ...state.feedback],
				isAdded: true,
			};
		case UPDATE_FEEDBACK:
			return {
				...state,
				feedback: EditData(state.feedback, payload),
				isUpdated: true,
			};
		case DELETE_FEEDBACK:
			return {
				...state,
				feedback: DeleteData(state.feedback, payload),
				isDeleted: true,
			};
		case GET_FEEDBACK_FAIL:
			return {
				...state,
				feedback: state.feedback,
				isLoading: false,
				isAdded: false,
				isUpdated: false,
				isDeleted: false,
			};
		case LOGOUT:
			return init2;
		default:
			return state;
	}
};

export default FeedbackReducer