import React, { Fragment, useContext, useEffect, useState } from "react";
import { colors } from "./OrderBar";
import "../../Styles/AuthStyles.css";
import { EmptyComponent } from "../../Utils";
import { GlobalState } from "../../Data/Context";
import { BsPlusCircleFill } from "react-icons/bs";
import LoadMore from "../LoadMore";
import moment from "moment";

const OrderList = ({ toggle, setOrderToAccept, active }) => {
	const { orders, auth, getOrders } = useContext(GlobalState),
		[stateOrders, setStateOrders] = useState(null),
		[loading, setLoading] = useState(false);

	useEffect(() => {
		if (active === 2) {
			setStateOrders(
				orders.all_order
					?.filter(item => item?.bid?.status === "completed")
					.filter(item => item?.user === auth?.user?._id)
			);
		} else if (active === 1) {
			setStateOrders(
				orders.all_order
					?.filter(
						item =>
							item?.bid?.status === "accepted" ||
							item?.bid?.status === "picked" ||
							item?.bid?.status === "delivered"
					)
					.filter(item => item?.user === auth?.user?._id)
			);
		} else
			setStateOrders(
				orders.order?.filter(item => item?.user === auth?.user?._id)
			);
	}, [orders.order, auth?.user?._id, active, orders?.all_order]);

	let handleLoadMore = async () => {
		setLoading(true);
		await getOrders({
			limit: Number(orders?.properties?.nextPage * orders?.properties?.limit),
		});
		setLoading(false);
	};

	if (!stateOrders) return;

	return (
		<div>
			{stateOrders?.length === 0 ? (
				<EmptyComponent />
			) : (
				<table className="table">
					<thead className="">
						<tr className="thead orderGrid orderGrid4 orderGridNew trFull">
							<th>pick up Address</th>
							<th>Drop Off Address</th>
							<th className="d-none d-md-flex">tracking ID</th>
							<th className="d-none d-md-flex">Delivery Mode</th>
							<th>Date</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{stateOrders.map((item, index) => (
							<Fragment key={index}>
								<tr
									className="shadow rounded tr myCursor orderGrid orderGrid4 orderGridNew trFull"
									onClick={() => {
										if (toggle) {
											setOrderToAccept(item);
											toggle();
										}
									}}>
									<td className="text-capitalize textTrunc textTrunc4">
										{item?.items[0]?.pickupLocation}
									</td>
									<td className="text-capitalize textTrunc textTrunc4">
										{item?.items?.length > 1 ? (
											<BsPlusCircleFill className="text-success" />
										) : null}{" "}
										{item?.items[0]?.dropoffLocation}
									</td>
									<td className=" d-none d-md-flex">{item?.orderId}</td>
									<td className="text-capitalize d-none d-md-flex">
										{item?.items[0]?.deliveryMode}
									</td>
									<td className="text-capitalize">
										{moment(item?.createdAt).format("DD MMM, YYYY")}
									</td>
									<td className="text-capitalize">
										<button
											className="btn text-capitalize text-white"
											style={{
												background: `${
													item?.bid?.status === "completed"
														? colors[2]
														: item?.bid?.status === "accepted"
														? colors[1]
														: item?.bid?.status === "picked"
														? colors[3]
														: colors[0]
												}`,
											}}>
											{item?.bid?.status ? item?.bid?.status : "created"}
										</button>
									</td>
								</tr>
								<tr className="mustSeperate" />
							</Fragment>
						))}
					</tbody>
				</table>
			)}
			{auth?.user?.type === "user" && (
				<LoadMore
					next={orders?.properties?.hasNextPage}
					handleLoadMore={handleLoadMore}
					loading={loading}
				/>
			)}
		</div>
	);
};

export default OrderList;

export const OrderListVendor = ({
	toggle,
	setOrderToAccept,
	active,
	toggle4,
}) => {
	const { orders, auth, nairaSign, numberWithCommas, getOrders } =
			useContext(GlobalState),
		[stateOrders, setStateOrders] = useState(null),
		[loading, setLoading] = useState(false);

	useEffect(() => {
		if (active === 2) {
			setStateOrders(orders.completed_bids);
		} else if (active === 1) {
			setStateOrders(orders.pickup_bids);
		} else {
			setStateOrders(
				orders.order?.filter(item => item?.user !== auth?.user?._id)
			);
		}
	}, [
		orders.order,
		auth?.user?._id,
		active,
		orders.pickup_bids,
		orders.completed_bids,
	]);

	let handleLoadMore = async () => {
		setLoading(true);
		await getOrders({
			limit: Number(orders?.properties?.nextPage * orders?.properties?.limit),
		});
		setLoading(false);
	};

	if (!stateOrders) return;
	// console.log({ active, stateOrders });
	return (
		<div>
			{stateOrders?.length === 0 ? (
				<div className="mt-5">
					<EmptyComponent />
				</div>
			) : (
				<table className="table mt-5">
					<thead className="">
						<tr className="thead orderGrid orderGridNew orderGrid4 bg-select-2 trFull">
							<th className="text-white fw-normal">Pickup address</th>
							<th className="text-white fw-normal">Drop Off Address</th>
							<th className="text-white fw-normal d-none d-md-flex">
								tracking ID
							</th>
							<th className="d-none d-md-flex text-white fw-normal">
								{active === 0 ? "item" : "price"}
							</th>
							<th className="text-white fw-normal">Date</th>
							<th className="text-white fw-normal">Status</th>
						</tr>
					</thead>
					<thead className="mustSeperate" />
					<tbody>
						{stateOrders.map((item, index) => (
							<Fragment key={index}>
								<tr
									className="shadow rounded tr myCursor orderGrid trFull orderGridNew orderGrid4"
									onClick={() => {
										if (toggle) {
											setOrderToAccept(active !== 0 ? item?.order : item);
											if (auth?.user?.type === "vendor") {
												toggle();
											} else {
												toggle4();
											}
										}
									}}>
									<td className="text-capitalize textTrunc textTrunc4">
										{active !== 0
											? item?.order?.items?.length > 1 && (
													<BsPlusCircleFill className="text-success" />
											  )
											: item?.items?.length > 1 && (
													<BsPlusCircleFill className="text-success" />
											  )}{" "}
										{active !== 0
											? item?.order?.items?.[0]?.pickupLocation
											: item?.items?.[0]?.pickupLocation}
									</td>
									<td className="text-capitalize textTrunc textTrunc4">
										{active !== 0
											? item?.order?.items?.[0]?.dropoffLocation
											: item?.items?.[0]?.dropoffLocation}
									</td>
									<td className="d-none d-md-flex">
										{active !== 0 ? item?.order?.orderId : item?.orderId}
									</td>
									<td className="text-capitalize d-none d-md-flex textTrunc textTrunc4">
										{active === 0 ? (
											item?.items?.[0]?.pickupItem
										) : (
											<>
												{nairaSign}

												{item?.price && numberWithCommas(item?.price)}
											</>
										)}
									</td>
									<td>
										{active !== 0
											? moment(item?.order?.createdAt).format("DD MMM, YYYY")
											: moment(item?.createdAt).format("DD MMM, YYYY")}
									</td>
									<td className="text-capitalize">
										<button
											className="btn text-capitalize text-white"
											style={{
												background: `${
													active !== 0
														? item?.status === "completed"
															? colors[2]
															: item?.status === "accepted"
															? colors[1]
															: item?.status === "picked"
															? colors[3]
															: colors[0]
														: item?.bid?.status === "completed"
														? colors[2]
														: item?.bid?.status === "accepted"
														? colors[1]
														: item?.bid?.status === "picked"
														? colors[3]
														: colors[0]
												}`,
											}}>
											{active !== 0
												? item?.status
												: item?.bid?.status
												? item?.bid?.status
												: "created"}
										</button>
									</td>
								</tr>
								<tr className="mustSeperate" />
							</Fragment>
						))}
					</tbody>
				</table>
			)}
			<LoadMore
				next={orders?.properties?.hasNextPage}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};

export const OrderListNonAuth = () => {
	const { orders } = useContext(GlobalState),
		[stateOrders, setStateOrders] = useState(null);

	useEffect(() => {
		setStateOrders(orders.recent_order);
	}, [orders.recent_order]);

	if (!stateOrders) return;

	return (
		<div>
			{stateOrders?.length === 0 ? (
				<EmptyComponent subtitle={"Order list is empty"} />
			) : (
				<table className="table">
					<thead className="">
						<tr className="thead orderGrid orderGridNew orderGrid2 bg-select-2 trFull">
							<th className="ps-lg-5 text-white">Pick Up address</th>
							<th className="text-white">Drop Off Address</th>
							<th className="text-white">Delivery Mode</th>
							<th className="text-white">Item</th>
						</tr>
						<tr className="mustSeperate" />
					</thead>
					<tbody>
						{stateOrders.map((item, index) => (
							<Fragment key={index}>
								<tr className="shadow rounded tr myCursor orderGrid orderGrid2 orderGridNew trFull">
									<td className="text-capitalize textTrunc textTrunc4">
										{item?.items?.length > 1 ? (
											<BsPlusCircleFill className="text-success" />
										) : null}{" "}
										{item?.items[0]?.pickupLocation}
									</td>
									<td className="text-capitalize textTrunc textTrunc4">
										{item?.items[0]?.dropoffLocation}
									</td>
									<td className="text-capitalize">
										{item?.items[0]?.deliveryMode}
									</td>
									<td className="text-capitalize">
										{item?.items[0]?.pickupItem}
									</td>
								</tr>
								<tr className="mustSeperate" />
							</Fragment>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};
