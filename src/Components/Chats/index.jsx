import React, { useContext, useState, useEffect } from "react";
import { BiArrowBack, BiArrowFromLeft, BiLink, BiPhone } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { Container } from "reactstrap";
import user from "../../Assets/avatar3.png";
import "../../Styles/AuthStyles.css";
import moment from "moment";
import { GlobalState } from "../../Data/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { Buttons } from "../../Utils";
import { ModalComponents } from "../DefaultHeader";
import $ from "jquery";
import {
	Link,
	useNavigate,
	useParams,
	useSearchParams,
} from "react-router-dom";
import { FaCircle, FaWhatsapp } from "react-icons/fa";
import logo from "../../Assets/logo.png";
import LoadMore from "../LoadMore";
import { AcceptModal } from "../Orders";
import { Rating } from "react-simple-star-rating";
import Countdown from "react-countdown";

export const Report = ({
	handleSubmit,
	loading,
	stateData,
	textChange,
	isOpen,
	toggle,
	handleChangeImageDispute,
}) => {
	return (
		<ModalComponents title={"Create dispute"} toggle={toggle} isOpen={isOpen}>
			<form>
				<div className="form-floating mb-3">
					<input
						type="text"
						required
						name="Title"
						className="form-control bg-grey"
						placeholder="Title"
						value={stateData?.title}
						onChange={textChange("title")}
					/>
					<label htmlFor="Title">Title</label>
				</div>
				<textarea
					name="report"
					className="form-control bg-grey"
					placeholder="Message"
					style={{
						height: "10rem",
						resize: "none",
					}}
					value={stateData?.message}
					onChange={textChange("message")}
				/>
				<div className="my-3">
					<input
						type="file"
						name="file"
						id="file"
						className="form-control"
						accept="image/*"
						onChange={handleChangeImageDispute}
					/>
				</div>
				<Buttons
					onClick={handleSubmit("report")}
					loading={loading}
					css="btn btn-primary1 text-capitalize py-3 w-50 d-block mx-auto my-4"
					width="w-50"
					title={"send"}
				/>
			</form>
		</ModalComponents>
	);
};

export const Review = ({
	handleSubmit,
	loading,
	stateData,
	textChange,
	isOpen,
	toggle,
	title,
	setStateData,
}) => {
	let handleRating = rate => {
		setStateData({ ...stateData, rating: rate });
	};
	return (
		<ModalComponents
			title={title ? "Update Review" : "Review"}
			back={toggle}
			isOpen={isOpen}>
			<form>
				<div className="form-floating mb-3">
					<textarea
						name="Description"
						className="form-control bg-grey"
						placeholder="Description"
						style={{
							height: "10rem",
							resize: "none",
						}}
						value={stateData?.description}
						onChange={textChange("description")}
					/>
					<label htmlFor="Description">Description</label>
				</div>
				<p>Rating</p>
				<Rating
					initialValue={stateData?.rating}
					onClick={handleRating}
					fillColor="#001b87"
				/>
				<Buttons
					onClick={title ? handleSubmit : handleSubmit("review")}
					loading={loading}
					css="btn btn-primary1 text-capitalize py-3 w-50 d-block mx-auto my-4"
					width="w-50"
					title={title ? "update" : "send"}
				/>
			</form>
		</ModalComponents>
	);
};

export const LeftSide = ({ stateChatsUser, css }) => {
	const { auth, chats, getChats } = useContext(GlobalState);
	let [loading, setLoading] = useState(false);

	let handleLoadMore = async () => {
		setLoading(true);
		await getChats(
			{
				limit: Number(chats?.properties?.nextPage * chats?.properties?.limit),
			},
			"load"
		);
		setLoading(false);
	};

	return (
		<>
			<div className={`${css} m-0 mb-lg-auto pt-3 pt-lg-0`}>
				<div className="position-relative">
					<p className="my-0">
						Kindly refresh per time, bids for your order will appear here. If
						you don't get a bid within 15 minutes. Click here to reach our
						customer support.
					</p>
					<div className="d-flex justify-content-end">
						<a
							style={{
								height: "3rem",
								width: "3rem",
								background: "#20c997",
							}}
							className="d-flex justify-content-center align-items-center bg-select-2 my-2  rounded-circle text-decoration-none text-capitalize text-white"
							href={"https://wa.me/2348085546073"}
							target={"_blank"}
							title="Contact customer care through WhatsApp"
							rel={"noreferrer"}>
							<FaWhatsapp size={24} />
						</a>
					</div>
				</div>
				<button className="btn btn-primary1 text-capitalize py-3 w-100 d-block mx-auto mb-4 d-flex justify-content-between align-items-center">
					<span>View latest messages</span>
					<BiArrowFromLeft size={20} />
				</button>
				<div className="chatWidth">
					{/* <div>
						<input
							type="search"
							name="search"
							placeholder="Search user"
							className="form-control"
						/>
					</div> */}
					{chats?.isLoading ? (
						<div className="d-flex justify-content-center align-items-center mt-4">
							<MoonLoader className="textColor2" size={24} />
						</div>
					) : (
						<div>
							{stateChatsUser
								?.sort(
									(itA, itB) =>
										moment(
											itB?.lastMessageDate
												? itB?.lastMessageDate
												: itB?.updatedAt
										) -
										moment(
											itA?.lastMessageDate
												? itA?.lastMessageDate
												: itA?.updatedAt
										)
								)
								?.map((item, index) => (
									<div className="myCursor" key={index}>
										{item?.users?.map(
											(list, ind) =>
												list?._id !== auth?.user?._id && (
													<Link
														to={`/chats/${list?._id}?chat=${item?._id}`}
														className="border p-2 list-group-item-light rounded my-3 d-flex align-items-center text-decoration-none"
														key={ind}>
														<div className="me-1">
															<img
																src={
																	list?.avatar?.url ? list?.avatar?.url : user
																}
																alt={"User"}
																style={{
																	height: "2.2rem",
																	width: "2.5rem",
																}}
																className="rounded-circle img-fluid"
															/>
														</div>
														<div className="w-100">
															<div className="d-flex justify-content-between align-items-center my-auto">
																<h6 className="textColor2 texTrunc fw-600 my-0">
																	{list?.firstName} {list?.lastName}
																</h6>

																<small>
																	{moment(
																		item?.lastMessageDate
																			? item?.lastMessageDate
																			: item?.updatedAt
																	).format("hh:mm A")}
																</small>
															</div>
															<div className="d-flex justify-content-between align-items-center my-0">
																<small className="textTrunc m-0 text-muted">
																	{item?.lastMessage?.content}
																</small>
																{item?.newMessageCount > 0 && (
																	<small className="list-group-item-success rounded-pill px-1 my-0">
																		{item?.newMessageCount}
																	</small>
																)}
															</div>
														</div>
													</Link>
												)
										)}
									</div>
								))}
						</div>
					)}
					<LoadMore
						next={chats?.properties?.hasNextPage}
						handleLoadMore={handleLoadMore}
						loading={loading}
					/>
				</div>
			</div>
		</>
	);
};

export const RightSide = ({ stateChatsUser }) => {
	const {
			chats,
			orders,
			updateOrderTypes,
			updateChats,
			dispute,
			updateDispute,
			auth,
			socketList,
			updateFeedback,
			feedbacks,
		} = useContext(GlobalState),
		[chatsUser, setChatsUser] = useState(null),
		[mainUser, setMainUser] = useState(null),
		[mainChats, setMainChats] = useState(null),
		[mainChatsPaginate, setMainChatsPaginate] = useState(null),
		[mainBids, setMainBids] = useState(null),
		[mainBids2, setMainBids2] = useState(null),
		[loadChat, setLoadChat] = useState(false),
		[loading, setLoading] = useState(false),
		[loading2, setLoading2] = useState(false),
		[submit, setSubmit] = useState(false),
		[submit2, setSubmit2] = useState(false),
		[loadingType, setLoadingType] = useState(""),
		[message, setMessage] = useState(""),
		[file, setFile] = useState(false),
		[images, setImages] = useState(false),
		[chatDispute, setChatDispute] = useState(null),
		[isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		},
		[isOpen2, setIsOpen2] = useState(false),
		toggle2 = () => {
			setIsOpen2(!isOpen2);
		},
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
			},
		init2 = {
			rating: "",
			description: "",
		},
		[stateData2, setStateData2] = useState(init2),
		textChange2 =
			name =>
			({ target: { value, type, title } }) => {
				setStateData2({
					...stateData2,
					[name]: type === "radio" ? title : value,
				});
			},
		[getSearch] = useSearchParams(),
		params = useParams(),
		navigate = useNavigate();

	useEffect(() => {
		if (stateChatsUser && getSearch?.get("chat")) {
			stateChatsUser?.map(
				item => item?._id === getSearch?.get("chat") && setChatsUser(item)
			);
		}
	}, [getSearch, stateChatsUser]);

	useEffect(() => {
		if (chatsUser) {
			// console.log({ chatsUser });
			chatsUser?.users?.map(
				item => item?._id === params.id && setMainUser(item)
			);
		}
	}, [params.id, chatsUser]);

	useEffect(() => {
		if (getSearch?.get("chat") && dispute?.total_dispute) {
			let filterDispute = dispute?.total_dispute?.filter(
				item => item?.chat === getSearch?.get("chat")
			);
			setChatDispute(filterDispute[0]);
			$("#div1").animate({ scrollTop: $("#div1").prop("scrollHeight") }, 1000);
		}
	}, [dispute?.total_dispute, getSearch]);

	let getChats = async (load, data) => {
		if (!load && !data?.limit) setLoadChat(true);
		try {
			let res = await axios.get(
				`/chat/${getSearch?.get("chat")}/message${
					data?.limit ? `?limit=${data?.limit}` : ""
				}`
			);
			// console.log({ res: res?.data });
			setMainChats(res?.data?.data?.docs);
			setMainChatsPaginate({ ...res?.data?.data, docs: null });
			setLoadChat(false);
			if (!load)
				$("#div1").animate(
					{ scrollTop: $("#div1").prop("scrollHeight") },
					1000
				);
		} catch (err) {
			console.log({ error: err.response });
			// window.location.reload(false);
			toast.error(err?.response ? err?.response?.data?.message : err?.message);
			setLoadChat(false);
		}
		setLoadChat(false);
	};

	useEffect(() => {
		if (getSearch?.get("chat")) {
			getChats();
		}

		return () => {
			setMainChats(null);
			setMainChatsPaginate(null);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getSearch]);
	// console.log({ mainChatsPaginate });

	let handleLoadMore = async () => {
		setLoading2(true);
		await getChats("load", {
			limit: Number(mainChatsPaginate?.nextPage * mainChatsPaginate?.limit),
		});
		setLoading2(false);
	};

	let timerFactor = ["picked", "accepted"];

	// console.log({ socket });

	useEffect(() => {
		if (getSearch?.get("chat") && orders?.all_order) {
			let mainOrders = orders?.all_order?.filter(
				item => item?.bid?.chat === getSearch?.get("chat")
			);
			setMainBids(mainOrders[0]?.bid);
		}
	}, [getSearch, orders?.all_order]);

	useEffect(() => {
		if (getSearch?.get("chat") && orders?.total_bids) {
			let mainOrders = orders?.total_bids?.filter(
				item => item?.chat?._id === getSearch?.get("chat")
			);
			setMainBids2(mainOrders[0]);
		}
	}, [getSearch, orders?.total_bids]);

	useEffect(() => {
		if (file) handleSendFile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]);

	useEffect(() => {
		if (chats?.newChat?.chat === getSearch?.get("chat")) {
			let newChat = [];
			if (mainChats) {
				let findOne = mainChats?.find(
					item => item?._id === chats?.newChat?._id
				);
				if (findOne) {
					newChat = [...mainChats];
				} else {
					newChat = [...mainChats, chats?.newChat];
				}
			} else {
				newChat = [chats?.newChat];
			}
			setMainChats(newChat);

			setSubmit(false);
			setFile(false);
			setLoadingType("");
			setMessage("");
			$("#div1").animate({ scrollTop: $("#div1").prop("scrollHeight") }, 1000);
			getChats(null, {
				limit: Number(mainChatsPaginate?.limit),
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chats?.isAdded, chats?.newChat, getSearch]);

	useEffect(() => {
		if (feedbacks?.isAdded && submit) {
			setIsOpen2(false);
			setSubmit(false);
			setStateData2(init2);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [feedbacks?.isAdded, submit]);

	useEffect(() => {
		if (dispute?.isAdded && submit) {
			setIsOpen(false);
			setSubmit(false);
			setStateData(init);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispute?.isAdded, submit]);

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

	if (!stateChatsUser || !mainUser || !chatsUser) return;

	// console.log({ stateChats, stateChatsUser, chatsUser });
	// console.log({ mainBids, mainBids2 });

	let handleSubmit = action => async e => {
		e.preventDefault();
		setSubmit2(false);
		setLoadingType(action);
		setLoading(true);

		let thisBid = mainBids;

		if (action === "accept") {
			thisBid = mainBids2?._id;
		} else if (action === "cancel" || action === "complete") {
			thisBid = mainBids?.order;
		}
		if (action !== "accept") {
			if (!thisBid) thisBid = mainBids2?._id;
			else thisBid = thisBid?._id ? thisBid?._id : thisBid;
		}
		console.log({
			id: thisBid,
			action,
			bid: mainBids,
			order: mainBids2?.order,
		});
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
		setSubmit2(true);
		$("#div1").animate({ scrollTop: $("#div1").prop("scrollHeight") }, 1000);
	};

	let handleSendMessage = async e => {
		e.preventDefault();
		if (!message) return;
		// console.log({ message });
		setLoading(true);
		setLoadingType("message");
		// console.log({mainBids});
		await updateChats({ content: message, chatId: getSearch?.get("chat") });
		setLoading(false);
		setLoadingType("");
		setSubmit(true);
	};

	let handleSendFile = async () => {
		if (!file) return;
		// console.log({ file });
		setLoading(true);
		setLoadingType("file");

		for (let j = 0; j < file?.length; j++) {
			await updateChats(
				{ type: "file", file: file?.[j], chatId: getSearch?.get("chat") },
				"file"
			);
		}
		setLoading(false);
		setLoadingType("");
		setSubmit(true);
	};

	let handleChangeImage = e => {
		const files = [...e.target.files];
		let err = "",
			newImages = [];

		files.forEach(file => {
			if (!file) return (err = "File does not exist");
			if (!file.type.includes("image"))
				return (err = `File, ${file?.name} format not supported`);
			return newImages.push(file);
		});
		if (err) {
			return toast.error(err);
		} else {
			setFile(file ? [...file, ...newImages] : [...newImages]);
		}
	};

	// console.log({ socketList });
	// console.log({ mainChats });

	let handleDispute = path => async e => {
		e.preventDefault();
		if (path !== "update") if (!stateData?.message || !stateData?.title) return;
		// console.log({ dispute: stateData, path });
		setLoading(true);
		setLoadingType("dispute");
		if (path === "update") {
			await updateDispute({ dispute: chatDispute?._id }, path);
		} else {
			await updateDispute(
				{ ...stateData, chat: getSearch?.get("chat"), files: images },
				path
			);
		}
		setLoading(false);
		setLoadingType("");
		setSubmit(true);
	};

	let handleReview = path => async e => {
		e.preventDefault();
		if (!stateData2?.rating || !stateData2?.description) return;

		setLoading(true);
		setLoadingType(path);
		await updateFeedback(
			{
				...stateData2,
				receiver: mainUser?._id,
				referenceType: "Bid",
				reference: mainBids?._id,
			},

			"add"
		);
		setLoading(false);
		setLoadingType("");
		setSubmit(true);
	};

	let disableFactor = ["rejected", "completed"];
	let disableFactor2 = [...disableFactor, "delivered", "cancel", "canceled"];
	let timerFactor2 = [...timerFactor, "delivered"];

	const Completionist = () => <small>Time up!</small>;
	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			// Render a completed state
			return <Completionist />;
		} else {
			// Render a countdown
			return (
				<small>
					{days}d:{hours}h:{minutes}m:{seconds}s
				</small>
			);
		}
	};

	return (
		<>
			<div className="col-lg-8 rounded border bg-notify p-0 minFullHeight aboutScreen position-relative m-0 m-lg-auto">
				{mainUser && (
					<div className="bg-select-2 p-3 rounded text-white d-flex align-items-center justify-content-between">
						<div className="d-flex align-items-center">
							<BiArrowBack
								className="me-lg-3 me-1 myCursor d-lg-none"
								onClick={() => navigate(-1)}
							/>
							<Link
								to={`/user/${mainUser?._id}`}
								className="text-decoration-none text-white">
								<div className="d-flex align-items-center">
									<div className="position-relative">
										<img
											src={mainUser?.avatar?.url ? mainUser?.avatar?.url : user}
											alt={"User"}
											style={{
												height: "3.5rem",
												width: "3.5rem",
											}}
											className="rounded-circle img-fluid mx-3"
										/>
										{socketList?.find(
											item => item?.userId === mainUser?._id && item?.isOnline
										) ? (
											<FaCircle
												className="text-success-2 position-absolute"
												style={{ bottom: 0, right: "10px" }}
											/>
										) : null}
									</div>
									<div>
										<h6 className="m-0 fontReduce">
											{mainUser
												? `${mainUser?.firstName} ${mainUser?.lastName}`
												: "Annette black"}
										</h6>
										{socketList?.find(
											item => item?.userId === mainUser?._id && item?.isOnline
										) ? (
											<span className="fontReduce">online</span>
										) : null}
									</div>
								</div>
							</Link>
							{mainUser?.phone && (
								<a href={`tel:${mainUser?.phone}`}>
									<BiPhone className="text-white ms-2" size={24} />
									{"	 "}
								</a>
							)}
						</div>
						<div>
							{chatDispute ? (
								chatDispute?.owner === auth?.user?._id &&
								chatDispute?.status !== "resolved" ? (
									<Buttons
										loading={loadingType === "dispute" && loading}
										title={"resolve"}
										css={
											"btn-outline-white text-capitalize text-white fontReduce"
										}
										onClick={handleDispute("update")}
									/>
								) : (
									<button
										onClick={toggle}
										className="btn btn-outline-white text-capitalize text-white fontReduce">
										create dispute
									</button>
								)
							) : (
								<button
									onClick={toggle}
									className="btn btn-outline-white text-capitalize text-white fontReduce">
									create dispute
								</button>
							)}
						</div>
					</div>
				)}
				{timerFactor?.includes(mainBids?.status) ? (
					<div className="position-absolute timeBoard bg-select-2">
						<div className="d-flex h-100 w-100 justify-content-center align-items-center text-white text-capitalize">
							<Countdown
								date={moment(
									mainBids?.dateAccepted
										? mainBids?.dateAccepted
										: mainBids?.createdAt
								).add(mainBids?.deliveryHours, "h")}
								renderer={renderer}
							/>
						</div>
					</div>
				) : null}
				<div className="chatScreen pb-2 position-relative" id="div1">
					{mainChats && (
						<Container>
							<LoadMore
								next={mainChatsPaginate?.hasNextPage}
								handleLoadMore={handleLoadMore}
								loading={loading2}
							/>
							{loadChat ? (
								<div className="my-3 d-flex">
									<MoonLoader className="textColor2 mx-auto" size={24} />
								</div>
							) : (
								<>
									{mainChats
										?.filter(e => e)
										?.sort(
											(itA, itB) =>
												moment(itA?.createdAt) - moment(itB?.createdAt)
										)
										?.map((item, index) => (
											<div className="d-flex my-1" key={index}>
												<div
													className={`w-75 p-3 rounded ${
														item?.sender === auth?.user?._id
															? "ms-auto bg-white"
															: "me-auto bg-light"
													}`}>
													{item?.type === "file" ? (
														<ChatImage
															data={item?.content}
															bg={
																item?.sender === auth?.user?._id
																	? "bg-white"
																	: "bg-light"
															}
														/>
													) : (
														<p className="textColor2 m-0">{item?.content}</p>
													)}
													<div className="d-flex">
														<small className="ms-auto">
															{moment(item?.createdAt).diff(moment(), "years") <
															0
																? moment(item?.createdAt).format(
																		"Do MMM, YYYY hh:mm A"
																  )
																: moment(item?.createdAt).diff(
																		moment(),
																		"months"
																  ) < 0
																? moment(item?.createdAt).format(
																		"Do MMM hh:mm A"
																  )
																: moment(item?.createdAt).diff(
																		moment(),
																		"days"
																  ) < 0
																? moment(item?.createdAt).format(
																		"Do MMM hh:mm A"
																  )
																: moment(item?.createdAt).format("hh:mm A")}
														</small>
													</div>
												</div>
											</div>
										))}
									<div className="d-flex pt-3">
										<div className="row g-4 w-75 fullWidth">
											{auth?.user?.type === "user" &&
												!disableFactor2?.includes(mainBids2?.status) && (
													<>
														<Buttons
															title={"accept"}
															css={`
																${auth?.user?.type === "user"
																	? "bg-white"
																	: "btn-light"} text-capitalize mx-1 fontBtn text-muted col-3 fontReduce
															`}
															width={"col-3"}
															onClick={toggle4}
														/>
														<Buttons
															loading={loadingType === "reject" && loading}
															title={"reject"}
															loadCss={"textColor2 bg-select-2 "}
															css={`
																${auth?.user?.type === "user"
																	? "bg-white"
																	: "btn-light"} text-capitalize mx-1 fontBtn text-muted col-3 fontReduce
															`}
															width={"col-3"}
															onClick={handleSubmit("reject")}
														/>
													</>
												)}
											{timerFactor2?.includes(mainBids?.status) ? (
												<>
													<Buttons
														loading={loadingType === "pickup" && loading}
														title={"pickup"}
														loadCss={"textColor2 bg-select-2 "}
														css={`
															${auth?.user?.type === "user"
																? "bg-white"
																: "btn-light"} text-capitalize mx-1 fontBtn text-muted col-3 fontReduce
														`}
														width={"col-3"}
														onClick={handleSubmit("pickup")}
													/>
													<Buttons
														loading={loadingType === "cancel" && loading}
														title={"cancel-order"}
														loadCss={"textColor2 bg-select-2 "}
														css={`
															${auth?.user?.type === "user"
																? "bg-white"
																: "btn-light"} text-capitalize mx-1 fontBtn text-muted col-3 fontReduce
														`}
														width={"col-3"}
														onClick={handleSubmit("cancel")}
													/>
													<Buttons
														loading={loadingType === "review" && loading}
														title={"review"}
														loadCss={"textColor2 bg-select-2 "}
														css={`
															${auth?.user?.type === "user"
																? "bg-white"
																: "btn-light"} text-capitalize mx-1 fontBtn text-muted col-3 fontReduce
														`}
														width={"col-3"}
														onClick={toggle2}
													/>
													{auth?.user?.type === "user" && (
														<Buttons
															loading={loadingType === "complete" && loading}
															title={"mark as received"}
															loadCss={"textColor2 bg-select-2 "}
															css={`
																${auth?.user?.type === "user"
																	? "bg-white"
																	: "btn-light"} text-capitalize mx-1 fontBtn text-muted col-3 fontReduce
															`}
															width={"col-3"}
															onClick={handleSubmit("complete")}
														/>
													)}
													{auth?.user?.type === "vendor" && (
														<Buttons
															loading={loadingType === "delivered" && loading}
															title={"order-deliver"}
															loadCss={"textColor2 bg-select-2 "}
															css={`
																${auth?.user?.type === "user"
																	? "bg-white"
																	: "btn-light"} text-capitalize mx-1 fontBtn text-muted col-3 fontReduce
															`}
															width={"col-3"}
															onClick={handleSubmit("delivered")}
														/>
													)}
													<Buttons
														loading={loadingType === "report" && loading}
														title={"report"}
														loadCss={"textColor2 bg-select-2 "}
														css={`
															${auth?.user?.type === "user"
																? "bg-white"
																: "btn-light"} text-capitalize mx-1 fontBtn text-muted col-3 fontReduce
														`}
														width={"col-3"}
														onClick={toggle}
													/>
												</>
											) : null}
											{auth?.user?.type === "vendor" &&
												mainBids2?.status === "pending" && (
													<Buttons
														title={"update bid"}
														css={`
															${auth?.user?.type === "user"
																? "bg-white"
																: "btn-light"} text-capitalize mx-1 fontBtn text-muted col-3 fontReduce
														`}
														width={"col-3"}
														onClick={toggle3}
													/>
												)}
										</div>
									</div>
								</>
							)}
						</Container>
					)}
				</div>
				{mainBids?.status && !disableFactor?.includes(mainBids?.status) ? (
					<MessagePanelSend
						message={message}
						setMessage={setMessage}
						loading={loading}
						loadingType={loadingType}
						handleChangeImage={handleChangeImage}
						handleSendMessage={handleSendMessage}
					/>
				) : mainBids2?.status && !disableFactor?.includes(mainBids2?.status) ? (
					<MessagePanelSend
						message={message}
						setMessage={setMessage}
						loading={loading}
						loadingType={loadingType}
						handleChangeImage={handleChangeImage}
						handleSendMessage={handleSendMessage}
					/>
				) : null}
			</div>
			<Report
				handleChangeImageDispute={handleChangeImageDispute}
				toggle={toggle}
				isOpen={isOpen}
				loading={loading}
				stateData={stateData}
				textChange={textChange}
				handleSubmit={handleDispute}
			/>
			<Review
				toggle={toggle2}
				isOpen={isOpen2}
				loading={loading}
				stateData={stateData2}
				textChange={textChange2}
				handleSubmit={handleReview}
				setStateData={setStateData2}
			/>
			<UpdateBidVendor
				toggle={toggle3}
				isOpen={isOpen3}
				mainBids2={mainBids2}
			/>
			<DisplayFeePercentage
				toggle={toggle4}
				isOpen={isOpen4}
				mainBids2={mainBids2}
				loading={loading}
				loadingType={loadingType}
				handleSubmit={handleSubmit}
				submit={submit2}
				setSubmit={setSubmit2}
				setIsOpen={setIsOpen4}
			/>
		</>
	);
};

export const DisplayFeePercentage = ({
	isOpen,
	toggle,
	loadingType,
	loading,
	handleSubmit,
	mainBids2,
	submit,
	setSubmit,
	setIsOpen,
}) => {
	const { referrals, nairaSign, numberWithCommas, orders } =
		useContext(GlobalState);

	let [bidTerms, setBidTerms] = useState(false);
	let [insuredFee, setInsuredFee] = useState(0);
	let [total, setTotal] = useState(0);
	// console.log({ mainBids2 });
	useEffect(() => {
		let findInsured = mainBids2?.order?.items?.filter(item => item?.insured);

		let insureFee = 0;
		if (findInsured?.length > 0) {
			let total = findInsured?.reduce(
				(a, i) =>
					(a +=
						(Number(i?.itemWorth) * referrals?.settings?.insurancePercentage) /
						100),
				0
			);
			insureFee = total;
		}

		setInsuredFee(insureFee);
	}, [mainBids2?.price, referrals?.settings, mainBids2?.order]);

	// console.log({ mainBids2 });

	useEffect(() => {
		setTotal(Number(insuredFee) + Number(mainBids2?.price));
	}, [insuredFee, mainBids2?.price]);

	useEffect(() => {
		if (submit && orders?.isUpdated) {
			setSubmit(false);
			setIsOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, orders?.isUpdated]);

	if (!mainBids2) return;

	return (
		<ModalComponents title={"Bid acceptance"} isOpen={isOpen} back={toggle}>
			<div className="px-4">
				<p className="text-center d-flex align-items-center justify-content-between">
					<span>Order amount: </span>
					<strong>
						{nairaSign} {numberWithCommas(Number(mainBids2?.price).toFixed(2))}{" "}
					</strong>
				</p>
				<p className="text-center d-flex align-items-center justify-content-between">
					<span>Insured Fee: </span>
					<strong>
						{nairaSign} {numberWithCommas(Number(insuredFee).toFixed(2))}{" "}
					</strong>
				</p>
				<p className="text-center d-flex align-items-center justify-content-between">
					<span>Total: </span>
					<strong>
						{nairaSign} {numberWithCommas(Number(total).toFixed(2))}{" "}
					</strong>
				</p>
			</div>
			<div className="my-2">
				<input
					type="checkbox"
					name="bidTerms"
					id="bidTerms"
					className="form-check form-check-input form-check-inline"
					onChange={e => setBidTerms(e.target.checked)}
					value={bidTerms}
					checked={bidTerms}
				/>
				<label htmlFor="bidTerms" className="">
					Cancelling an order after it is released attracts a 5% cash back to
					the logistics operator.
				</label>
				<p className="text-center d-flex align-items-center justify-content-between">
					<span>Cancellation fee: </span>
					<strong>
						{nairaSign}{" "}
						{numberWithCommas(
							Number(
								(total * referrals?.settings?.cancellationPercentage) / 100
							).toFixed(2)
						)}{" "}
					</strong>
				</p>
				<p className="text-center d-flex align-items-center justify-content-between">
					<span>To be delivered in: </span>
					<strong>
						{mainBids2?.deliveryHours
							? numberWithCommas(mainBids2?.deliveryHours)
							: 0}
						hr(s)
					</strong>
				</p>
			</div>
			<Buttons
				loading={loadingType === "accept" && loading}
				title={"accept"}
				disabled={!bidTerms}
				css={`
					btn-primary1 text-capitalize mx-1 fontBtn text-muted py-3 w-50 fontReduce
				`}
				width={"w-50 mx-auto"}
				onClick={handleSubmit("accept")}
			/>
		</ModalComponents>
	);
};

export const UpdateBidVendor = ({ isOpen, toggle, mainBids2 }) => {
	const { updateOrderTypes, orders, referrals, numberWithCommas, nairaSign } =
		useContext(GlobalState);
	let [stateData, setStateData] = useState({
			price: "",
			deliveryHours: "",
			days: "",
			hours: "",
		}),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[bidTerms, setBidTerms] = useState(false),
		textChange =
			name =>
			({ target: { value } }) => {
				setStateData({ ...stateData, [name]: value });
			},
		handleSubmit = async e => {
			e.preventDefault();
			let errArr = [];
			if (!stateData?.price) errArr.push("Price required");
			if (errArr.length > 0) return errArr.forEach(item => toast.info(item));

			let newTime;

			let newDays = 0,
				newHours = 0;
			if (stateData?.days) {
				newDays = Number(stateData?.days) * 24;
			}
			if (stateData?.hours) {
				newHours = Number(stateData?.hours);
			}
			newTime = Number(Number(newDays) + Number(newHours));
			setLoading(true);
			await updateOrderTypes(mainBids2?._id, "update", {
				price: stateData?.price,
				deliveryHours: newTime,
			});
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (submit && orders?.isUpdated) {
			setSubmit(false);
			toggle();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, orders?.isUpdated]);

	useEffect(() => {
		if (mainBids2) {
			let days = Math.floor(mainBids2?.deliveryHours / 24);
			let hours = mainBids2?.deliveryHours % 24;
			setStateData({ ...mainBids2, days, hours });
		}
	}, [mainBids2]);
	// console.log({ mainBids2 });

	return (
		<>
			<ModalComponents isOpen={isOpen} back={toggle} title="update bid detail">
				<AcceptModal textChange={textChange} stateData={stateData} />

				<div className="my-2">
					<input
						type="checkbox"
						name="bidTerms"
						id="bidTerms"
						className="form-check form-check-input form-check-inline"
						onChange={e => setBidTerms(e.target.checked)}
						value={bidTerms}
						checked={bidTerms}
					/>
					<label htmlFor="bidTerms" className="">
						Order accepted and not delivered by stated time attracts a 5% cash
						back to the user.
					</label>

					{stateData?.price && (
						<p className="text-center d-flex align-items-center justify-content-between">
							<span>Late delivery fee: </span>
							<strong>
								{nairaSign}{" "}
								{numberWithCommas(
									Number(
										(stateData?.price * referrals?.settings?.latePercentage) /
											100
									).toFixed(2)
								)}{" "}
							</strong>
						</p>
					)}
				</div>
				<Buttons
					onClick={handleSubmit}
					loading={loading}
					disabled={!bidTerms}
					css="btn btn-primary1 text-capitalize py-3 w-50 d-block mx-auto my-4"
					title={"update bid"}
					width="w-50"
				/>
			</ModalComponents>
		</>
	);
};

export const DefaultRight = () => {
	return (
		<div className="col-0 col-lg-8 rounded border bg-notify p-0 minFullHeight aboutScreen position-relative d-none d-lg-flex justify-content-center align-items-center m-0 m-lg-auto">
			<div
				className="d-flex justify-content-center 
                align-items-center flex-column h-100 m-auto">
				<img src={logo} alt="logo" className="img-fluid my-3" />
				<small className="d-block">
					Interact with your customer seamlessly
				</small>
			</div>
		</div>
	);
};

export let ChatImage = ({ data, bg }) => {
	let [err, setErr] = useState(false);

	let errorHandler = () => setErr(true);

	useEffect(() => {
		return () => setErr(false);
	}, [data]);

	return (
		<div className={`${bg ? bg : "bg-white"} h-100`}>
			{err ? (
				<div className="d-flex justify-content-center align-items-center h-100">
					<p className="fontReduce text-capitalize">could not load resources</p>
				</div>
			) : (
				<img
					alt="img"
					src={data}
					className="w-100 h-100"
					onError={errorHandler}
					loading="lazy"
					style={{
						maxHeight: "40vh",
						objectFit: "contain",
					}}
				/>
			)}
		</div>
	);
};

const MessagePanelSend = ({
	message,
	setMessage,
	loadingType,
	loading,
	handleChangeImage,
	handleSendMessage,
}) => {
	return (
		<div className="sticky-bottom mainTabs  border-top w-100 py-3 d-flex justify-content-around align-items-center bg-light mainMaxWidth mt-auto d-flex flex-column">
			<div className="rounded py-1 w-100 mx-2 d-flex align-items-center px-3">
				<input
					type="text"
					className="form-control w-100 me-1 fontReduce bg-white fontReduce"
					value={message}
					onChange={e => setMessage(e.target.value)}
					placeholder="Type your message here"
					autoFocus
				/>
				<div className="d-flex align-items-center btn-group">
					<div className="file_upload d-flex myCursor btn">
						<Buttons
							loading={loadingType === "file" && loading}
							loadCss={"textColor2 bg-select-2 "}
							css="bg-light"
							title=" "
							width={"auto"}>
							<BiLink title="Upload image" className="textColor2" size={20} />
						</Buttons>
						<input
							title="Upload file"
							type="file"
							name="file"
							id="file"
							multiple
							className="myCursor"
							accept="image/*"
							onChange={handleChangeImage}
						/>
					</div>
					<Buttons
						disabled={loadingType === "message" && loading}
						// loadCss={"textColor2 bg-select-2 "}
						// loading={loadingType === "message" && loading}
						css="bg-light"
						title=" "
						width={"auto"}
						onClick={handleSendMessage}>
						<RiSendPlaneFill className="textColor2" size={20} />
					</Buttons>
				</div>
			</div>
		</div>
	);
};
