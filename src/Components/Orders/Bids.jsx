import { Fragment, useState, useContext } from "react";
import { GlobalState } from "../../Data/Context";
import { Buttons, EmptyComponent } from "../../Utils";
import { colors } from "./OrderBar";
import { useParams } from "react-router-dom";
import { ModalComponents } from "../DefaultHeader";
import { DisplayFeePercentage, Report, UpdateBidVendor } from "../Chats";
import { toast } from "react-toastify";
import { FaPhone } from "react-icons/fa";

export const BidTable = ({ stateBid }) => {
	const { numberWithCommas, nairaSign, updateOrderTypes, auth, updateDispute } =
			useContext(GlobalState),
		{ page, id } = useParams();
	let [data, setData] = useState(null),
		[loading, setLoading] = useState(false),
		[loadingType, setLoadingType] = useState(""),
		[submit, setSubmit] = useState(false),
		[isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		},
		[images, setImages] = useState(false),
		[isOpen3, setIsOpen3] = useState(false),
		toggle3 = () => {
			setIsOpen3(!isOpen3);
		},
		[isOpen4, setIsOpen4] = useState(false),
		toggle4 = () => {
			setIsOpen4(!isOpen4);
		},
		init = {
			title: "",
			message: "",
		},
		[stateData, setStateData] = useState(init),
		textChange =
			name =>
			({ target: { value } }) => {
				setStateData({ ...stateData, [name]: value });
			};

	if (!stateBid) return;

	let handleSubmit = action => async e => {
		e.preventDefault();
		setSubmit(false);
		setLoadingType(action);
		setLoading(true);

		let thisBid = data;

		if (action === "accept") {
			thisBid = data?._id;
		} else if (action === "cancel" || action === "complete") {
			thisBid = id ? id : data?.order;
		}
		if (action !== "accept") {
			if (!thisBid) thisBid = data?._id;
			else thisBid = thisBid?._id ? thisBid?._id : thisBid;
		}
		// console.log({
		// 	id: thisBid,
		// 	action,
		// 	bid: data,
		// 	order: id ? id : data?.order,
		// });
		if (!thisBid) return;
		await updateOrderTypes(
			thisBid,
			action === "delivered" ? "update" : action,
			{
				status: action === "delivered" ? "delivered" : "picked",
			}
		);
		setLoading(false);
		setLoadingType("");
		setSubmit(true);
	};

	let timerFactor = ["picked", "accepted"];
	let disableFactor = ["rejected", "completed"];
	let disableFactor2 = [...disableFactor, "delivered", "cancel", "canceled"];
	let timerFactor2 = [...timerFactor, "delivered"];

	const handleChangeImageDispute = e => {
		const filesDispute = e.target.files[0];
		let err = "";

		if (!filesDispute) err = "File does not exist";
		if (!filesDispute.type.includes("image"))
			err = `File, ${filesDispute?.name} format not supported`;

		if (err) {
			return toast.error(err);
		} else {
			setImages(filesDispute);
		}
	};
	let handleDispute = path => async e => {
		e.preventDefault();
		if (path !== "update") if (!stateData?.message || !stateData?.title) return;
		// console.log({ dispute: stateData, path, data });
		setLoading(true);
		setLoadingType("dispute");
		if (path === "update") {
			await updateDispute(
				{ dispute: data?.chat?._id ? data?.chat?._id : data?.chat },
				path
			);
		} else {
			await updateDispute(
				{
					...stateData,
					chat: data?.chat?._id ? data?.chat?._id : data?.chat,
					files: images,
				},
				path
			);
		}
		setLoading(false);
		setLoadingType("");
		setSubmit(true);
	};

	return (
		<>
			<div className="">
				{stateBid?.length === 0 ? (
					<EmptyComponent subtitle={"Your bid list is empty"} />
				) : (
					<table className="table mt-5">
						<thead className="">
							<tr className="thead bg-select-2 row mx-0 g-3 g-md-4 trFull py-2">
								<th className="text-white fw-normal col textTrunc">
									tracking ID
								</th>
								<th className="text-white fw-normal col textTrunc">
									bid price
								</th>
								<th className="text-white fw-normal col textTrunc">
									{page === "bids" ? "user" : "vendor"}
								</th>
								<th className="text-white fw-normal col textTrunc">
									delivered in
								</th>
								<th className="text-white fw-normal col textTrunc">Status</th>
							</tr>
						</thead>
						<thead className="mustSeperate" />
						<tbody>
							{stateBid?.map((item, index) => (
								<Fragment key={index}>
									<tr
										onClick={() => setData(item)}
										className="shadow rounded tr myCursor row mx-0 g-3 trFull g-md-4 py-2 textColor2">
										<td className="col ">{item?.order?.orderId}</td>
										<td className="col text-capitalize textTrunc textTrunc2">
											{item?.price && nairaSign}
											{item?.price && numberWithCommas(item?.price)}
										</td>
										<td className="col text-capitalize textTrunc textTrunc2">
											{page === "bids"
												? `${item?.order?.user?.lastName} ${item?.order?.user?.firstName}`
												: `${item?.vendor?.lastName} ${item?.vendor?.firstName}`}
										</td>
										<td className="col text-capitalize textTrunc textTrunc2">
											{item?.deliveryHours} hr(s)
										</td>
										<td className="col text-capitalize">
											<button
												className="btn text-capitalize text-white"
												style={{
													background: `${
														item?.status === "completed"
															? colors[2]
															: item?.status === "accepted"
															? colors[1]
															: item?.status === "picked"
															? colors[3]
															: colors[0]
													}`,
												}}>
												{item?.status ? item?.status : "created"}
											</button>
										</td>
									</tr>
									<tr className="mustSeperate" />
								</Fragment>
							))}
						</tbody>
					</table>
				)}
			</div>
			<ModalComponents
				title={`Bid Action: orderId-${data?.order?.orderId}`}
				isOpen={data}
				back={() => setData(null)}>
				<>
					{page !== "bids" ? (
						<>
							<div className="mb-4 border-bottom">
								<h5 className="text-capitalize">Vendor detail</h5>
								<p className="text-center d-flex align-items-center justify-content-between">
									<span>Name: </span>
									<strong>
										{data?.vendor?.firstName} {data?.vendor?.lastName}
									</strong>
								</p>
								{timerFactor2?.includes(data?.status) && (
									<p className="text-center d-flex align-items-center justify-content-between">
										<span>Telephone: </span>
										<strong>
											{data?.vendor?.telephone}
											{data?.vendor?.telephone && (
												<a href={`tel:${data?.vendor?.telephone}`}>
													<FaPhone className="textColor2" size={24} />
													{"	 "}
												</a>
											)}
										</strong>
									</p>
								)}
							</div>
						</>
					) : (
						<>
							<div className="mb-4 border-bottom">
								<h5 className="text-capitalize">User detail</h5>
								<p className="text-center d-flex align-items-center justify-content-between">
									<span>Name: </span>
									<strong>
										{data?.order?.user?.firstName} {data?.order?.user?.lastName}
									</strong>
								</p>
								{timerFactor2?.includes(data?.status) && (
									<p className="text-center d-flex align-items-center justify-content-between">
										<span>Telephone: </span>
										<strong>
											{data?.order?.user?.telephone}
											{data?.order?.user?.telephone && (
												<a href={`tel:${data?.order?.user?.telephone}`}>
													<FaPhone className="textColor2" size={24} />
													{"	 "}
												</a>
											)}
										</strong>
									</p>
								)}
							</div>
						</>
					)}
					<div className="row g-4">
						{auth?.user?.type === "user" &&
							!disableFactor2?.includes(data?.status) && (
								<>
									<div className="col-4 px-2">
										<Buttons
											title={"accept"}
											css={`
											btn-outline-primary1 text-capitalize py-3 fontBtn fontReduce
										`}
											width={""}
											onClick={toggle4}
										/>
									</div>
									<div className="col-4 px-2">
										<Buttons
											loading={loadingType === "reject" && loading}
											title={"reject"}
											loadCss={"textColor2 bg-select-2 "}
											css={`
											btn-outline-primary1 text-capitalize py-3 fontBtn fontReduce
										`}
											width={""}
											onClick={handleSubmit("reject")}
										/>
									</div>
								</>
							)}
						{timerFactor2?.includes(data?.status) ? (
							<>
								<div className="col-4 px-2">
									<Buttons
										loading={loadingType === "pickup" && loading}
										title={"pickup"}
										loadCss={"textColor2 bg-select-2 "}
										css={`
										btn-outline-primary1 text-capitalize py-3 fontBtn fontReduce
									`}
										width={""}
										onClick={handleSubmit("pickup")}
									/>
								</div>
								<div className="col-4 px-2">
									<Buttons
										loading={loadingType === "cancel" && loading}
										title={"cancel-order"}
										loadCss={"textColor2 bg-select-2 "}
										css={`
										btn-outline-primary1 text-capitalize py-3 fontBtn fontReduce
									`}
										width={""}
										onClick={handleSubmit("cancel")}
									/>
								</div>
								{auth?.user?.type === "user" && (
									<div className="col-4 px-2">
										<Buttons
											loading={loadingType === "complete" && loading}
											title={"mark as received"}
											loadCss={"textColor2 bg-select-2 "}
											css={`
											btn-outline-primary1 text-capitalize py-3 fontBtn fontReduce
										`}
											width={""}
											onClick={handleSubmit("complete")}
										/>
									</div>
								)}
								{auth?.user?.type === "vendor" && (
									<div className="col-4 px-2">
										<Buttons
											loading={loadingType === "delivered" && loading}
											title={"order-deliver"}
											loadCss={"textColor2 bg-select-2 "}
											css={`
											btn-outline-primary1 text-capitalize py-3 fontBtn fontReduce
										`}
											width={""}
											onClick={handleSubmit("delivered")}
										/>
									</div>
								)}
								<div className="col-4 px-2">
									<Buttons
										loading={loadingType === "report" && loading}
										title={"report"}
										loadCss={"textColor2 bg-select-2 "}
										css={`
										btn-outline-primary1 text-capitalize py-3 fontBtn fontReduce
									`}
										width={""}
										onClick={toggle}
									/>
								</div>
							</>
						) : null}
						{auth?.user?.type === "vendor" && data?.status === "pending" && (
							<div className="col-4 px-2">
								<Buttons
									title={"update bid"}
									css={`
									btn-outline-primary1 text-capitalize fontBtn py-3 fontReduce
								`}
									width={""}
									onClick={toggle3}
								/>
							</div>
						)}
					</div>
				</>
			</ModalComponents>
			<Report
				handleChangeImageDispute={handleChangeImageDispute}
				toggle={toggle}
				isOpen={isOpen}
				loading={loading}
				stateData={stateData}
				textChange={textChange}
				handleSubmit={handleDispute}
			/>
			<UpdateBidVendor toggle={toggle3} isOpen={isOpen3} mainBids2={data} />
			<DisplayFeePercentage
				toggle={toggle4}
				isOpen={isOpen4}
				mainBids2={data}
				loading={loading}
				loadingType={loadingType}
				handleSubmit={handleSubmit}
				submit={submit}
				setSubmit={setSubmit}
				setIsOpen={setIsOpen4}
			/>
		</>
	);
};
