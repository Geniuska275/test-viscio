// Root reducer to combine all reducers in the app

import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import BankReducer from "./BankReducer";
import ChatReducer, { DisputeReducer } from "./ChatReducer";
import ErrorReducer from "./ErrorReducer";
import OrderReducer from "./OrderReducer";
import ReferralReducer, { PriceCheckerReducer } from "./ReferralReducer";
import FeedbackReducer from "./FeedbackReducer";
import socketReducer from "./SocketReducer";
import WalletReducer from "./WalletReducer";

export default combineReducers({
	auth: AuthReducer,
	orders: OrderReducer,
	wallets: WalletReducer,
	referrals: ReferralReducer,
	errors: ErrorReducer,
	chats: ChatReducer,
	socket: socketReducer,
	banks: BankReducer,
	dispute: DisputeReducer,
	feedbacks: FeedbackReducer,
	priceChecker: PriceCheckerReducer,
});
