import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../Data/Context";

const Home = () => {
	const { sidebarList2 } = useContext(GlobalState);
	let navigate = useNavigate();
	useEffect(() => {
		navigate(sidebarList2[0].url);
	}, [navigate, sidebarList2]);
	return <></>;
};

export default Home;
