import { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../Data/Context";
import $ from "jquery";

export const useChatLeftSide = () => {
	const { chats } = useContext(GlobalState),
		[stateChatsUser, setStateChatsUser] = useState([]);
	useEffect(() => {
		if (chats?.chats) setStateChatsUser(chats?.chats);
		$("#div1").animate({ scrollTop: $("#div1").prop("scrollHeight") }, 1000);
	}, [chats?.chats, chats?.isAdded, chats?.newChat]);
	return { stateChatsUser };
};
