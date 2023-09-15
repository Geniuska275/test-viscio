import React, { useEffect, useState, useContext } from "react";
import { Container } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../Data/Context";
import { Loader } from "../../Utils";
import { LoadMore } from "../../Components";
import { BidTable } from "../../Components/Orders/Bids";

const OrderBid = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { orders } = useContext(GlobalState);

	let [data, setData] = useState(null),
		[loading, setLoading] = useState(false),
		[loading2, setLoading2] = useState(false),
		[mainBids, setMainBids] = useState(false),
		[paginate, setPaginate] = useState(false),
		params = useParams();

	useEffect(() => {
		if (orders?.all_order && orders?.all_order?.length > 0) {
			orders?.all_order?.map(item => item?._id === params?.id && setData(item));
		}
	}, [params?.id, orders?.all_order]);

	let getOrderBid = async data => {
		try {
			if (!data?.limit) setLoading(true);
			let res = await axios.get(
				`/orders/bids?order=${params?.id}&populate=order&populate=vendor${
					data?.limit ? `&limit=${data?.limit}` : ""
				}`
			);

			setMainBids(res?.data?.data?.docs);
			setPaginate({ ...res?.data?.data, docs: null });
			setLoading(false);
		} catch (err) {
			setLoading(false);
			toast.error(err?.response ? err?.response?.data?.message : err?.message);
		}
		setLoading(false);
	};
	useEffect(() => {
		getOrderBid();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.id, orders?.isUpdated]);

	let handleLoadMore = async () => {
		setLoading2(true);
		await getOrderBid({ limit: Number(paginate?.nextPage * paginate?.limit) });
		setLoading2(false);
	};

	if (!data) return;
	return (
		<Container className="px-lg-5 pt-4 pt-lg-0">
			<div className="mb-3">
				<p className="text3 textColor2 fw-600 text-capitalize">order bid(s)</p>
			</div>
			{loading ? (
				<Loader />
			) : mainBids ? (
				<>
					<BidTable stateBid={mainBids} handleLoadMore={handleLoadMore} />
					<LoadMore
						next={paginate?.hasNextPage}
						handleLoadMore={handleLoadMore}
						loading={loading2}
					/>
				</>
			) : null}
		</Container>
	);
};

export default OrderBid;
