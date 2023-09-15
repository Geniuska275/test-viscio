import React, { useContext, useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { BiArrowBack, BiBell } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import user from "../Assets/avatar3.png";
import { Buttons, EmptyComponent } from "../Utils";
import { GlobalState } from "../Data/Context";
import LoadMore from "./LoadMore";

const DefaultHeader = () => {
	const { auth } = useContext(GlobalState);
	let navigate = useNavigate(),
		param = useLocation(),
		[isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		};

	return (
		<section className="d-lg-block d-none">
			<div
				className="pt-5 pe-5 ps-3 d-flex align-items-center barFont mb-3 justify-content-between"
				style={{ minHeight: "7rem" }}>
				<div className="w-100">
					{param.pathname === "/orders" ? (
						<></>
					) : (
						<BiArrowBack
							className="me-3 myCursor"
							onClick={() => navigate(-1)}
						/>
					)}
				</div>
				<header className="d-flex align-items-center my-auto justify-content-end container">
					<BiBell className="myCursor" size={24} onClick={toggle} />
					<Link
						className="text-dark text-decoration-none d-flex align-items-center"
						to="/profile">
						<img
							src={auth?.user?.avatar ? auth?.user?.avatar?.url : user}
							alt={`${auth?.user?.firstName} ${auth?.user?.lastName}`}
							style={{
								height: "2.5rem",
								width: "2.5rem",
								objectFit: "cover",
								objectPosition: "center 15%",
							}}
							className="rounded-circle img-fluid mx-3"
						/>
						<h6>
							{auth?.user?.firstName} {auth?.user?.lastName}
						</h6>
					</Link>
				</header>
			</div>
			<MainNotification isOpen={isOpen} toggle={toggle} />
		</section>
	);
};

export default DefaultHeader;

export const MainNotification = ({ toggle, isOpen }) => {
	const { referrals, getNotify, readNotification } = useContext(GlobalState);
	let [stateNotify, setStateNotify] = useState(null),
		[loading, setLoading] = useState(false);

	let handleLoadMore = async () => {
		setLoading(true);
		await getNotify({
			limit: Number(
				referrals?.properties_notify?.nextPage *
					referrals?.properties_notify?.limit
			),
		});
		setLoading(false);
	};

	useEffect(() => {
		setStateNotify(referrals?.notification);
	}, [referrals?.notification]);

	useEffect(() => {
		if (isOpen && stateNotify?.length > 0) {
			let markasRead = async () => {
				let unread = stateNotify?.filter(item => !item?.read);

				if (unread?.length > 0) {
					for (let i = 0; i < unread.length; i++) {
						await readNotification(unread[i]?._id);
					}
				}
			};
			markasRead();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stateNotify, isOpen]);

	return (
		<ModalComponents title={"Notification"} toggle={toggle} isOpen={isOpen}>
			<div className="downH2">
				{stateNotify?.length === 0 ? (
					<EmptyComponent subtitle={"You have no notification"} />
				) : (
					stateNotify?.map((item, i) => <Notifications item={item} key={i} />)
				)}
				<LoadMore
					next={referrals?.properties_notify?.hasNextPage}
					handleLoadMore={handleLoadMore}
					loading={loading}
				/>
			</div>
		</ModalComponents>
	);
};

const Notifications = ({ item }) => {
	return (
		<div
			className={`py-2 px-3 rounded ${
				item?.read ? "bg-light" : "bg-notify"
			} mb-3`}>
			<div className="textColor2">
				<h6>{item?.title}</h6>
				<p>{item?.message}</p>
			</div>
		</div>
	);
};

export const ModalComponents = ({
	isOpen,
	toggle,
	title,
	children,
	back,
	size,
	notHeader = false,
}) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	return (
		<Modal
			isOpen={isOpen}
			centered
			scrollable
			size={size}
			className={notHeader ? "p-0 overflow-hidden" : ""}>
			{!notHeader && (
				<ModalHeader
					toggle={toggle}
					className="borderNone text-capitalize genSansFont textColor2 reqAccVer">
					{back && <BiArrowBack className="me-3 myCursor" onClick={back} />}
					{title}
				</ModalHeader>
			)}
			<ModalBody className={notHeader ? "p-0 overflow-hidden" : ""}>
				{children}
			</ModalBody>
		</Modal>
	);
};

export const MainNotify = ({
	toggle,
	isOpen,
	title,
	children,
	handleSubmit,
	stateData,
	textChange,
}) => {
	return (
		<ModalComponents
			title={title ? title : "Notification"}
			toggle={toggle}
			isOpen={isOpen}>
			{children}
			<NotifyForm
				handleSubmit={handleSubmit}
				textChange={textChange}
				stateData={stateData}
			/>
		</ModalComponents>
	);
};

export const NotifyForm = ({
	handleSubmit,
	stateData,
	textChange,
	loading,
}) => {
	return (
		<form>
			<div className="form-floating mb-3">
				<input
					type="text"
					required
					name="title"
					className="form-control bg-grey"
					placeholder="title"
					value={stateData.title}
					onChange={textChange("title")}
				/>
				<label htmlFor="title">Title</label>
			</div>
			<div className="form-floating mb-3">
				<textarea
					required
					name="message"
					className="form-control bg-grey"
					placeholder="message"
					style={{
						height: "10rem",
						resize: "none",
					}}
					value={stateData.message}
					onChange={textChange("message")}
				/>
				<label htmlFor="message">Message</label>
			</div>
			<Buttons
				onClick={handleSubmit}
				loading={loading}
				css="btn btn-primary1 text-capitalize py-3 w-50 d-block mx-auto my-4"
				width={"w-50"}
				title={"send"}
			/>
		</form>
	);
};
