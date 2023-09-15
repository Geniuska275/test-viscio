import React, { useEffect } from "react";
import { Container } from "reactstrap";
import MainOrder from "../../Components/Orders";
import { useNavigate } from "react-router-dom";

const Orders = () => {
	let navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
		navigate(-1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container className="px-lg-5 pt-3 pt-lg-0">
			<MainOrder />
		</Container>
	);
};

export default Orders;
