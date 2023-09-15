import React, { useEffect } from "react";
import { Container } from "reactstrap";
import { OrderListNonAuth } from "../Components/Orders/OrderList";
import "../Styles/AuthStyles.css";

const Order = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Container className="py-5">
			<section className="py-5">
				<OrderListNonAuth />
			</section>
		</Container>
	);
};

export default Order;
