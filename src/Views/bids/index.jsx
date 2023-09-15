import React, { useEffect, useState, useContext } from "react";
import { Container } from "reactstrap";
import { BidTable } from "../../Components/Orders/Bids";
import { GlobalState } from "../../Data/Context";

const OrderBid = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { orders } = useContext(GlobalState);

	let [data, setData] = useState(false);

	useEffect(() => {
		setData(orders?.total_bids?.filter?.(item => item?.available));
	}, [orders?.total_bids]);

	if (!data) return;
	return (
		<Container className="px-lg-5 pt-4 pt-lg-0">
			<div className="mb-3">
				<p className="text3 textColor2 fw-600 text-capitalize">
					available bid(s)
				</p>
			</div>

			<BidTable stateBid={data} />
		</Container>
	);
};

export default OrderBid;
