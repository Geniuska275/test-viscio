import React, { createContext, useState } from "react";
import { GiSwordSpin } from "react-icons/gi";
import { TbReportMoney } from "react-icons/tb";
// import { MdBookmarkBorder } from "react-icons/md";
import { BsChat, BsPerson, BsTruck, BsPersonPlusFill } from "react-icons/bs";
import { FaWallet } from "react-icons/fa";
import { connect, useSelector } from "react-redux";
import {
	getSetTempUser,
	LogoutToken,
	registerUser,
	loginUser,
	updateUser,
} from "./Actions/AuthAction";
import {
	addOrders,
	getTrackOrder,
	updateOrderTypes,
	getOrders,
	getBids,
} from "./Actions/OrderAction";
import { fundWallet } from "./Actions/WalletAction";
import {
	fundWalletReferral,
	getPriceChecker,
	getNotify,
	readNotification,
} from "./Actions/ReferralAction";
import {
	socketProfile,
	socketUser,
	socketReconnect,
	socketNewMessage,
} from "./Reducer/SocketReducer";
import {
	updateChats,
	updateDispute,
	updateFeedback,
	getChats,
} from "./Actions/ChatAction";

export const GlobalState = createContext();

const DataProvider = ({
	children,
	getSetTempUser,
	LogoutToken,
	addOrders,
	getTrackOrder,
	updateOrderTypes,
	getOrders,
	fundWallet,
	fundWalletReferral,
	registerUser,
	loginUser,
	updateUser,
	socketProfile,
	socketUser,
	updateChats,
	updateDispute,
	updateFeedback,
	socketReconnect,
	socketNewMessage,
	getPriceChecker,
	getNotify,
	readNotification,
	getChats,
	getBids,
}) => {
	const {
		auth,
		wallets,
		orders,
		referrals,
		chats,
		socket,
		banks,
		dispute,
		feedbacks,
		priceChecker,
		errors,
	} = useSelector(state => state);

	let headerList = [
		{
			name: "Home",
			url: "/",
		},
		{
			name: "About us",
			url: "/about",
		},
		{
			name: "Contact us",
			url: "/contact",
		},
		{
			name: "FAQ's",
			url: "/faqs",
		},
		{
			name: "Order",
			url: "/order",
		},
		{
			name: "Price Checker",
			url: "/price-checker",
			type: "button",
		},
	];

	let sidebarList = [
		{
			name: "Order",
			url: "/orders",
			icon: <BsTruck size={24} />,
		},
		{
			name: "Chat",
			url: "/chats",
			icon: <BsChat size={24} />,
		},
		{
			name: "Pricing",
			url: "/pricing",
			icon: <GiSwordSpin size={24} />,
			button: "pricing",
		},
		{
			name: "wallet",
			url: "/wallet",
			icon: <FaWallet size={24} />,
		},
		{
			name: "referral",
			url: "/referral",
			icon: <BsPersonPlusFill size={24} />,
		},
		{
			name: "Profile",
			url: "/profile",
			icon: <BsPerson size={24} />,
		},
	];

	let sidebarList2 = [
		{
			name: "Order",
			url: "/orders",
			icon: <BsTruck size={24} />,
		},
		// {
		// 	name: "My Order",
		// 	url: "/my-orders",
		// 	icon: <MdBookmarkBorder size={24} />,
		// },
		{
			name: "Bids",
			url: "/bids",
			icon: <TbReportMoney size={24} />,
		},
		{
			name: "wallet",
			url: "/wallet",
			icon: <FaWallet size={24} />,
		},
		{
			name: "Chat",
			url: "/chats",
			icon: <BsChat size={24} />,
		},
		{
			name: "Pricing",
			url: "/pricing",
			icon: <GiSwordSpin size={24} />,
			button: "pricing",
		},
		{
			name: "referral",
			url: "/referral",
			icon: <BsPersonPlusFill size={24} />,
		},
		{
			name: "Profile",
			url: "/profile",
			icon: <BsPerson size={24} />,
		},
	];

	let numberWithCommas = x => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	let nairaSign = <span className="fontInherit">&#8358;</span>,
		[contextPage, setContextPage] = useState("");

	const state = {
		numberWithCommas,
		headerList,
		sidebarList,
		sidebarList2,
		nairaSign,
		contextPage,
		setContextPage,

		auth,
		getSetTempUser,
		LogoutToken,
		registerUser,
		loginUser,
		updateUser,

		wallets,
		fundWallet,

		orders,
		addOrders,
		getTrackOrder,
		updateOrderTypes,
		getOrders,

		referrals,
		fundWalletReferral,

		chats,
		updateChats,
		socketNewMessage,
		getChats,

		socket: socket?.socket,
		socketProfile,
		socketUser,
		socketList: socket?.user,
		socketReconnect,
		mainSocket: socket,

		banks,

		dispute,
		updateDispute,

		feedbacks,
		updateFeedback,

		priceChecker,
		getPriceChecker,
		getNotify,
		readNotification,
		getBids,

		errors,
	};

	return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};

export default connect(null, {
	registerUser,
	loginUser,
	updateUser,
	getSetTempUser,
	LogoutToken,
	addOrders,
	getTrackOrder,
	updateOrderTypes,
	getOrders,
	fundWallet,
	fundWalletReferral,
	socketProfile,
	socketUser,
	updateChats,
	updateDispute,
	updateFeedback,
	socketReconnect,
	socketNewMessage,
	getPriceChecker,
	getNotify,
	readNotification,
	getChats,
	getBids,
})(DataProvider);
