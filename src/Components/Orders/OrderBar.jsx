import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalState } from "../../Data/Context";
import "../../Styles/AuthStyles.css";

export let colors = [
	"#E93BED",
	"#0BCE83",
	"#001B87",
	"#010e44",
	"hsla(157, 90%, 43%, 0.203)",
];

const OrderBar = ({ setActive }) => {
	const { auth, orders, numberWithCommas } = useContext(GlobalState);
	let param = useParams(),
		orderbarType = [
			{
				name: "Created order",
				number: numberWithCommas(
					orders?.all_order
						? orders.all_order?.filter(item => item?.user === auth?.user?._id)
								?.length
						: 0
				),
			},
			{
				name: "Accepted order",
				number: numberWithCommas(
					orders?.all_order
						? orders.all_order
								?.filter(
									item =>
										item?.bid?.status === "accepted" ||
										item?.bid?.status === "picked"
								)
								.filter(item => item?.user === auth?.user?._id)?.length
						: 0
				),
			},
			{
				name: "completed order",
				number: numberWithCommas(
					orders?.all_order
						? orders.all_order
								?.filter(item => item?.bid?.status === "completed")
								.filter(item => item?.user === auth?.user?._id)?.length
						: 0
				),
			},
		],
		orderbarType3 = [
			// {
			// 	name: "create order",
			// 	link: "/orders-vendor",
			// },
			{
				name: "Pending Order",
				number: numberWithCommas(orders?.pending_total),
				display: "pending",
			},
			{
				name: "Pick Up order",
				number: numberWithCommas(orders?.pickup_total),
				display: "pickup",
			},
			{
				name: "completed order",
				number: numberWithCommas(orders?.completed_total),
				display: "completed",
			},
		],
		[stateOrder, setStateOrder] = useState(null);

	useEffect(() => {
		if (auth?.isAuth)
			auth.user?.type === "user"
				? setStateOrder(orderbarType)
				: auth.user?.type === "vendor" && param.page === "orders"
				? setStateOrder(orderbarType3)
				: setStateOrder(orderbarType);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		auth?.isAuth,
		auth?.user,
		orders?.pickup_bids,
		orders?.pending_bids,
		orders?.order,
	]);

	if (!stateOrder) return <></>;

	return (
		<div className="orderbarType">
			{stateOrder.map((item, index) => (
				<Fragment key={index}>
					{item.link ? (
						<Link
							onClick={() => {
								if (setActive) setActive(index);
							}}
							to={item.link}
							className="text-decoration-none textColor2  text-capitalize shadow p-2 py-4 text-center rounded myCursor tabDiv2 d-flex">
							<span className="m-auto fw-600">{item.name}</span>
						</Link>
					) : (
						<div
							className="shadow p-2 py-4 text-center rounded myCursor tabDiv2"
							onClick={() => {
								if (setActive) setActive(index);
							}}>
							<p
								className="mb-3 fw-600 text5"
								style={{
									color: colors[index],
								}}>
								{item.number}
							</p>
							<p className="text-capitalize">{item.name}</p>
						</div>
					)}
				</Fragment>
			))}
		</div>
	);
};

export default OrderBar;
