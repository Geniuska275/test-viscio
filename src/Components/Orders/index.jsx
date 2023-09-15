import React, { useContext, useEffect, useState } from "react";
import { ModalComponents } from "../DefaultHeader";
import OrderBar from "./OrderBar";
import OrderList, { OrderListVendor } from "./OrderList";
import map from "../../Assets/Rectangle.png";
import "../../Styles/AuthStyles.css";
import moment from "moment";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Buttons, Loader } from "../../Utils";
import { toast } from "react-toastify";
import { BiEditAlt, BiPlusCircle, BiTrash } from "react-icons/bi";
import { v4 } from "uuid";
import { GlobalState } from "../../Data/Context";
import axios from "axios";

const MainOrder = ({ acceptOrder }) => {
	const { orders, addOrders, auth, updateOrderTypes } = useContext(GlobalState);
	let [isOpen, setIsOpen] = useState(false),
		[isOpen2, setIsOpen2] = useState(false),
		[isOpen3, setIsOpen3] = useState(false),
		[isOpen4, setIsOpen4] = useState(false),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[bidTerms, setBidTerms] = useState(false),
		[active, setActive] = useState(0),
		[activeTab, setActiveTab] = useState(0),
		[orderArray, setOrderArray] = useState([]),
		[dataList, setDatalist] = useState([]),
		[dataList2, setDatalist2] = useState([]),
		[orderToAccept, setOrderToAccept] = useState(null),
		param = useParams(),
		init = {
			pickupName: "",
			pickupLocation: "",
			pickupPhone: "",
			pickupItem: "",
			pickupItemWeight: "",
			deliveryMode: "",
			dropoffName: "",
			dropoffLocation: "",
			dropoffPhone: "",
			deliveryType: "",
			id: "",
			pickupPlaceId: "",
			dropoffPlaceId: "",
			insured: false,
			itemWorth: "",
			notes: "",
		},
		[stateData, setStateData] = useState(init),
		textChange =
			name =>
			({ target: { value, type, title, checked } }) => {
				setStateData({
					...stateData,
					[name]:
						type === "radio" ? title : type === "checkbox" ? checked : value,
				});
			},
		[stateData2, setStateData2] = useState({
			price: "",
			deliveryHours: "",
			days: "",
			hours: "",
		}),
		textChange2 =
			name =>
			({ target: { value } }) => {
				setStateData2({ ...stateData2, [name]: value });
			},
		toggle = () => {
			setIsOpen(!isOpen);
		},
		toggle2 = () => {
			setIsOpen2(!isOpen2);
		},
		toggle3 = () => {
			setIsOpen3(!isOpen3);
		},
		toggle4 = () => {
			setIsOpen4(!isOpen4);
		},
		handleSubmit = async e => {
			e.preventDefault();
			if (acceptOrder) {
				toggle2();
			} else {
				if (orderArray.length === 0)
					return toast.info("Please add an item to proceed");
				setLoading(true);
				// console.log({ orderArray });
				await addOrders({ items: orderArray });
				setLoading(false);
				setSubmit(true);
			}
		},
		handleSubmit2 = async e => {
			e.preventDefault();
			let errArr = [];
			if (!stateData2?.price) errArr.push("Price required");
			if (!stateData2?.days && !stateData2?.hours)
				errArr.push("Delivery duration is required");
			if (!bidTerms) errArr.push("Please accept the bid terms and conditions");
			if (errArr.length > 0) return errArr.forEach(item => toast.info(item));
			let newTime;

			let newDays = 0,
				newHours = 0;
			if (stateData2?.days) {
				newDays = Number(stateData2?.days) * 24;
			}
			if (stateData2?.hours) {
				newHours = Number(stateData2?.hours);
			}
			newTime = Number(Number(newDays) + Number(newHours));
			setLoading(true);
			await updateOrderTypes(
				auth?.user?._id === stateData2?.vendor
					? stateData2?._id
					: orderToAccept?._id,
				auth?.user?._id === stateData2?.vendor ? "update" : "bid",
				{
					...stateData2,
					deliveryHours: newTime,
				}
			);
			setLoading(false);
			setSubmit(true);
		},
		[stateEdit, setStateEdit] = useState({
			isEdit: false,
			value: "",
		}),
		navigate = useNavigate();

	useEffect(() => {
		if (submit && orders?.isAdded) {
			setIsOpen(!isOpen);
			setSubmit(false);
			setOrderArray([]);
			setStateData(init);
			setActive(0);
			navigate("/chats");
		}
		if (submit && orders?.isUpdated) {
			setIsOpen2(!isOpen2);
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, orders?.isAdded]);

	let handleAddItem = next => {
		let err = [];
		if (!next) {
			if (!stateData.pickupItem) err.push("Pick-up Item required");
			if (!stateData.pickupName) err.push("Pick-up name required");
			if (!stateData.pickupLocation) err.push("Pick-up address required");
			if (!stateData.pickupPhone) err.push("Pick-up phone number required");
			if (!stateData.dropoffName) err.push("Drop-off name required");
			if (!stateData.dropoffLocation) err.push("Drop-off address required");
			if (!stateData.dropoffPhone) err.push("Drop-off phone number required");
			if (!stateData.deliveryMode) err.push("Delivery mode required");
			if (!stateData.deliveryType) err.push("Delivery type required");
		} else {
			if (
				stateData?.pickupItem ||
				stateData?.pickupName ||
				stateData?.pickupLocation ||
				stateData?.dropoffName ||
				stateData?.dropoffLocation
			) {
				if (!stateData.pickupItem) err.push("Pick-up Item required");
				if (!stateData.pickupName) err.push("Pick-up name required");
				if (!stateData.pickupLocation) err.push("Pick-up address required");
				if (!stateData.pickupPhone) err.push("Pick-up phone number required");
				if (!stateData.dropoffName) err.push("Drop-off name required");
				if (!stateData.dropoffLocation) err.push("Drop-off address required");
				if (!stateData.dropoffPhone) err.push("Drop-off phone number required");
				if (!stateData.deliveryMode) err.push("Delivery mode required");
				if (!stateData.deliveryType) err.push("Delivery type required");
			}
		}
		stateData = {
			...stateData,
			dropoffPlaceId: stateData?.dropoffPlaceId
				? stateData?.dropoffPlaceId
				: stateData?.dropoffLocation,
			pickupPlaceId: stateData?.pickupPlaceId
				? stateData?.pickupPlaceId
				: stateData?.pickupLocation,
		};
		if (err.length > 0) return err.forEach(item => toast.info(item));
		if (stateEdit.isEdit) {
			let newItem = [
				...orderArray.map(item =>
					item.id === stateEdit.value ? stateData : item
				),
			];
			setOrderArray(newItem);
			setStateEdit({ isEdit: false, value: "" });
		} else {
			if (
				stateData?.pickupItem ||
				stateData?.pickupName ||
				stateData?.pickupLocation ||
				stateData?.dropoffName ||
				stateData?.dropoffLocation
			) {
				let newItem = {
					...stateData,
					id: v4(),
				};
				setOrderArray([...orderArray, newItem]);
			}
		}

		setStateData(init);
		if (next === "next") {
			setActive(1);
		}
	};

	useEffect(() => {
		if (orderToAccept) {
			if (orderToAccept?.bid?.vendor === auth?.user?._id) {
				setStateData2(orderToAccept?.bid);
			}
		}
	}, [orderToAccept, auth?.user]);
	let handleDeleteItem = rf => {
		let newItem = orderArray.filter(item => item.id !== rf.id);
		setOrderArray(newItem);
	};
	useEffect(() => {
		if (stateEdit.isEdit) {
			orderArray.map(item => item.id === stateEdit.value && setStateData(item));
		}
	}, [orderArray, stateEdit]);

	let getLocation = async (input, name) => {
		try {
			let res = await axios.get(
				`/price-checker/address-suggestion?input=${input}`
			);
			if (name === "dropoffPlaceId") setDatalist(res.data?.data);
			else setDatalist2(res.data?.data);
			// console.log(res.data);
		} catch (error) {
			console.log({ error });
		}
	};
	useEffect(() => {
		if (stateData?.dropoffLocation)
			getLocation(stateData?.dropoffLocation, "dropoffPlaceId");
	}, [stateData?.dropoffLocation]);

	useEffect(() => {
		if (stateData?.dropoffLocation && dataList)
			dataList?.map(
				item =>
					item?.description === stateData.dropoffLocation &&
					setStateData({ ...stateData, dropoffPlaceId: item?.place_id })
			);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stateData?.dropoffLocation, dataList]);

	useEffect(() => {
		if (stateData?.pickupLocation && dataList2)
			dataList2?.map(
				item =>
					item?.description === stateData.pickupLocation &&
					setStateData({ ...stateData, pickupPlaceId: item?.place_id })
			);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stateData?.pickupLocation, dataList2]);

	useEffect(() => {
		if (stateData?.pickupLocation)
			getLocation(stateData?.pickupLocation, "pickupPlaceId");
	}, [stateData?.pickupLocation]);

	if (orders?.isLoading && !orders?.isAccepted && !orders?.isUpdated)
		return <Loader />;

	return (
		<>
			<OrderBar setActive={setActiveTab} />
			{auth.user?.type === "vendor" && param.page !== "orders" && (
				<div className="d-flex justify-content-end align-items-center">
					<button
						type="button"
						onClick={toggle}
						className="btn btn-primary1 text-capitalize py-3 px-5 my-5">
						create order
					</button>
				</div>
			)}
			{auth.user?.type === "user" && (
				<div className="d-flex justify-content-end align-items-center">
					<button
						type="button"
						onClick={toggle}
						className="btn btn-primary1 text-capitalize py-3 px-5 my-5">
						create order
					</button>
				</div>
			)}
			{auth.user?.type === "vendor" && param.page === "orders" ? (
				<OrderListVendor
					toggle={toggle2}
					setOrderToAccept={setOrderToAccept}
					active={activeTab}
					toggle4={toggle4}
				/>
			) : (
				<OrderList
					toggle={toggle4}
					setOrderToAccept={setOrderToAccept}
					active={activeTab}
				/>
			)}
			<ModalComponents title={"Create order"} toggle={toggle} isOpen={isOpen}>
				<PickUpModal
					stateData={stateData}
					textChange={textChange}
					handleSubmit={handleSubmit}
					active={active}
					setActive={setActive}
					handleAddItem={handleAddItem}
					handleDeleteItem={handleDeleteItem}
					orderArray={orderArray}
					setStateEdit={setStateEdit}
					loading={loading}
					dataList={dataList}
					dataList2={dataList2}
				/>
			</ModalComponents>
			<ModalComponents title={"accept order"} toggle={toggle2} isOpen={isOpen2}>
				<PickUpAcceptModal
					active={active}
					setActive={setActive}
					stateData={orderToAccept}
					textChange={textChange}
					handleSubmit={handleSubmit2}
					title="accept order"
					textChange2={textChange2}
					stateData2={stateData2}
					loading={loading}
					setBidTerms={setBidTerms}
					bidTerms={bidTerms}
				/>
			</ModalComponents>
			<ModalComponents title={"view order"} back={toggle4} isOpen={isOpen4}>
				<ViewOrderFormModal
					toggle={toggle3}
					stateData={orderToAccept}
					textChange={textChange}
					active={activeTab}
				/>
			</ModalComponents>
			<OrderStatus toggle={toggle3} isOpen={isOpen3} data={orderToAccept} />
		</>
	);
};

export default MainOrder;

const PickUpModal = ({
	handleSubmit,
	title,
	stateData,
	textChange,
	loading,
	active,
	setActive,
	handleAddItem,
	handleDeleteItem,
	setStateEdit,
	orderArray,
	dataList,
	dataList2,
}) => {
	return (
		<>
			{active === 1 ? (
				<>
					{orderArray?.length > 0 && (
						<div className="mt-3">
							<table className="table">
								<thead>
									<tr className="text-capitalize">
										<th>Pick up</th>
										<th>Drop off</th>
										<th>Mode</th>
										<th>Item</th>
										{orderArray?.length > 0 && (
											<th style={{ textAlign: "right" }}>Actions</th>
										)}
									</tr>
								</thead>
								<tbody>
									{orderArray?.length === 0 ? (
										<></>
									) : (
										orderArray?.map((item, index) => (
											<tr className="td" key={index}>
												<td className="text-capitalize">
													{item?.pickupLocation}
												</td>
												<td className="text-capitalize">
													{item?.dropoffLocation}
												</td>
												<td className="text-capitalize">
													{item?.deliveryMode}
												</td>
												<td className="text-capitalize">{item?.pickupItem}</td>
												<td style={{ textAlign: "right" }}>
													<BiEditAlt
														className="me-2 myCursor"
														onClick={() => {
															setStateEdit({
																isEdit: true,
																value: item.id,
															});
															setActive(0);
														}}
													/>
													<BiTrash
														className="myCursor"
														onClick={() => handleDeleteItem(item)}
													/>
												</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					)}
					<button
						className="btn btn-outline-primary1 text-capitalize ms-auto d-block"
						onClick={() => setActive(0)}>
						return
					</button>
					<Buttons
						onClick={handleSubmit}
						loading={loading}
						css="btn btn-primary1 text-capitalize py-3 w-50 d-block mx-auto my-4"
						title={title ? title : "create order"}
						width="w-50"
					/>
				</>
			) : (
				<>
					<PickUpForm
						textChange={textChange}
						stateData={stateData}
						title={title}
						loading={loading}
						handleSubmit={handleSubmit}
						dataList={dataList}
						dataList2={dataList2}
					/>
					<button
						className="btn btn-success text-capitalize ms-auto d-block"
						onClick={() => handleAddItem()}>
						<BiPlusCircle /> add{" "}
					</button>

					<Buttons
						onClick={() => {
							handleAddItem("next");
						}}
						loading={loading}
						css="btn btn-primary1 text-capitalize py-3 w-50 d-block mx-auto my-4"
						title={title ? title : "preview"}
						width="w-50"
					/>
				</>
			)}
		</>
	);
};

const PickUpForm = ({ textChange, stateData, dataList, dataList2 }) => {
	return (
		<form>
			<div className="form-floating mb-3">
				<input
					type="text"
					required
					name="fullname"
					className="form-control bg-grey"
					placeholder="Pick up full name"
					value={stateData.pickupName}
					onChange={textChange("pickupName")}
				/>
				<label htmlFor="fullname">Pick up full name</label>
				<small className="mb-4 d-block">
					Name of the person we are picking item from{" "}
				</small>
			</div>
			<div className="form-floating mb-3">
				<datalist id="pickupLocation">
					{dataList2?.map((item, index) => (
						<option
							value={item?.description}
							key={index}
							title={item?.place_id}>
							{item?.description}
						</option>
					))}
				</datalist>
				<input
					type="text"
					required
					name="address"
					className="form-control bg-grey"
					placeholder="Pick up address"
					value={stateData.pickupLocation}
					list="pickupLocation"
					onChange={textChange("pickupLocation")}
					onPaste={e => e?.preventDefault()}
				/>
				<label htmlFor="fullname">Pick up address</label>
				<small className="mb-4 d-block fontReducePass">
					Kindly give detailed address, please select from the available
					dropdown landmark option that'll appear as you type{" "}
				</small>
			</div>
			<div className="form-floating mb-3">
				<input
					type="tel"
					required
					name="telephone"
					className="form-control bg-grey"
					placeholder="Pick up telephone"
					value={stateData.pickupPhone}
					onChange={textChange("pickupPhone")}
				/>
				<label htmlFor="fullname">Pick up phone number</label>
				<small className="mb-4 d-block">
					Provide phone number and other line{" "}
				</small>
			</div>
			<div className="form-floating mb-3">
				<input
					type="text"
					required
					name="item"
					className="form-control bg-grey"
					placeholder="Pick up item"
					value={stateData.pickupItem}
					onChange={textChange("pickupItem")}
				/>
				<label htmlFor="fullname">Pick up item</label>
			</div>
			<div className="form-floating mb-3">
				<input
					type="number"
					required
					name="iDrop off aWeight in Kg (optional)tem"
					className="form-control bg-grey"
					placeholder="Drop off Weight in Kg (optional)"
					value={stateData.pickupItemWeight}
					onChange={textChange("pickupItemWeight")}
				/>
				<label htmlFor="Drop off Weight in Kg (optional)">
					Drop off Weight in Kg (optional)
				</label>
			</div>
			<p>Delivery Mode</p>
			<div className="row mb-4">
				<div className="col-3">
					<input
						type="radio"
						name="deliveryMode"
						className="form-check-input me-2 borderColor"
						title="bicycle"
						id="Bicycle"
						value={stateData.deliveryMode}
						onChange={textChange("deliveryMode")}
						checked={stateData.deliveryMode === "bicycle"}
					/>
					<label htmlFor="Bicycle"> Bicycle</label>
				</div>
				<div className="col-3">
					<input
						type="radio"
						name="deliveryMode"
						className="form-check-input me-2 borderColor"
						title="bike"
						id="Bike"
						value={stateData.deliveryMode}
						onChange={textChange("deliveryMode")}
						checked={stateData.deliveryMode === "bike"}
					/>
					<label htmlFor="Bike"> Bike</label>
				</div>
				<div className="col-3">
					<input
						type="radio"
						name="deliveryMode"
						className="form-check-input me-2 borderColor"
						title="car"
						id="Car"
						value={stateData.deliveryMode}
						onChange={textChange("deliveryMode")}
						checked={stateData.deliveryMode === "car"}
					/>
					<label htmlFor="Car"> Car</label>
				</div>
				<div className="col-3">
					<input
						type="radio"
						name="deliveryMode"
						className="form-check-input me-2 borderColor"
						title="truck"
						id="Truck"
						value={stateData.deliveryMode}
						onChange={textChange("deliveryMode")}
						checked={stateData.deliveryMode === "truck"}
					/>
					<label htmlFor="Truck"> Truck</label>
				</div>
			</div>
			<div className="form-floating mb-3">
				<textarea
					name="Note"
					className="form-control bg-grey"
					value={stateData?.notes}
					onChange={textChange("notes")}
					placeholder="Note"
					style={{
						resize: "none",
						height: "7rem",
					}}
				/>
				<label htmlFor="Note">Note</label>
			</div>
			<div className="form-floating mb-3">
				<input
					type="text"
					required
					name="fullname"
					className="form-control bg-grey"
					placeholder="Drop off full name"
					value={stateData.dropoffName}
					onChange={textChange("dropoffName")}
				/>
				<label htmlFor="fullname">Drop off full name</label>
				<small className="mb-4 d-block">Receiver's name </small>
			</div>
			<div className="form-floating mb-3">
				<input
					type="text"
					required
					name="address"
					className="form-control bg-grey"
					placeholder="Drop off address"
					list="dropoffLocation"
					value={stateData.dropoffLocation}
					onChange={textChange("dropoffLocation")}
					onPaste={e => e?.preventDefault()}
				/>
				<label htmlFor="fullname">Drop off address</label>
				<small className="mb-4 d-block fontReducePass">
					Receiver's address, please select from the available dropdown landmark
					option that'll appear as you type{" "}
				</small>
				<datalist id="dropoffLocation">
					{dataList?.map((item, index) => (
						<option
							value={item?.description}
							key={index}
							title={item?.place_id}>
							{item?.description}
						</option>
					))}
				</datalist>
			</div>
			<div className="form-floating mb-3">
				<input
					type="tel"
					required
					name="telephone"
					className="form-control bg-grey"
					placeholder="Drop off telephone"
					value={stateData.dropoffPhone}
					onChange={textChange("dropoffPhone")}
				/>
				<label htmlFor="fullname">Drop off phone number</label>
				<small className="mb-4 d-block">
					Kindly provide main line and other line{" "}
				</small>
			</div>
			<p>Delivery Type</p>
			<div className="mb-4">
				<div className="">
					<input
						type="radio"
						name="deliveryType"
						className="form-check-input me-2 borderColor"
						value={stateData.deliveryType}
						onChange={textChange("deliveryType")}
						title="City (delivery within same state or city)"
						id="City (delivery within same state or city)"
						checked={
							stateData.deliveryType ===
							"City (delivery within same state or city)"
						}
					/>
					<label htmlFor="City (delivery within same state or city)">
						{" "}
						City (delivery within same state or city)
					</label>
				</div>
				<div className="">
					<input
						type="radio"
						name="deliveryType"
						className="form-check-input me-2 borderColor"
						value={stateData.deliveryType}
						onChange={textChange("deliveryType")}
						title="Inter-State"
						id="Inter-State"
						checked={stateData.deliveryType === "Inter-State"}
					/>
					<label htmlFor="Inter-State"> Inter-State</label>
				</div>
				<div className="">
					<input
						type="radio"
						name="deliveryType"
						className="form-check-input me-2 borderColor"
						value={stateData.deliveryType}
						onChange={textChange("deliveryType")}
						title="Inter-Country"
						id="Inter-Country"
						checked={stateData.deliveryType === "Inter-Country"}
					/>
					<label htmlFor="Inter-Country"> Inter-Country</label>
				</div>
			</div>
			<div className="mb-4">
				<input
					type="checkbox"
					name="insured"
					className="form-check-input me-2 borderColor form-control form-check form-check-inline"
					id="Insurance"
					value={stateData.insured}
					onChange={textChange("insured")}
					checked={stateData.insured}
				/>
				<label htmlFor="Insurance"> Insurance</label>
			</div>
			{stateData?.insured && (
				<div className="form-floating mb-3">
					<input
						type={"number"}
						name="Pickup Item value"
						className="form-control bg-grey"
						value={stateData?.itemWorth}
						onChange={textChange("itemWorth")}
						placeholder="Pickup Item value"
					/>
					<label htmlFor="Pickup Item value">Pickup Item value</label>
				</div>
			)}
		</form>
	);
};

export const OrderStatus = ({ toggle, data, isOpen }) => {
	let [active, setActive] = useState(0),
		[err, setErr] = useState(false);

	let orderMap = [
		{
			title: "order received",
			date: moment(),
		},
		{
			title: "on the way",
			date: moment(),
		},
		{
			title: "delivered",
			date: moment(),
		},
	];
	// console.log({ data });

	useEffect(() => {
		if (data?.bid) {
			data?.bid?.status === "accepted"
				? setActive(1)
				: data?.bid?.status === "picked"
				? setActive(2)
				: data?.bid?.status === "completed" || data?.bid?.status === "delivered"
				? setActive(3)
				: setActive(0);
		} else {
			data?.status === "accepted"
				? setActive(1)
				: data?.status === "picked"
				? setActive(2)
				: data?.status === "completed" || data?.status === "delivered"
				? setActive(3)
				: setActive(0);
		}
	}, [data?.bid, data]);

	return (
		<ModalComponents
			title={"order status"}
			toggle={toggle}
			isOpen={isOpen}
			notHeader={true}
			size="lg">
			<div className="row g-4 downH3">
				<div className="col-5 m-auto">
					<div className="ps-5">
						<h3 className="text-capitalize textColor2 mb-0">order status</h3>
						<div
							className="bg-select-2 rounded-pill mb-3"
							style={{
								height: "3px",
								width: "6rem",
							}}
						/>
					</div>
					<div className="d-flex align-items-center flex-column">
						{active === 0 ? (
							<p>Order await bidding/acceptance</p>
						) : (
							<div className="borderLeft w-75">
								{orderMap.map((item, index) => (
									<div className="position-relative py-2 ps-5" key={index}>
										<div
											className={`position-absolute startTransition ${
												active > index ? "startTransition2" : ""
											}`}
										/>
										<div>
											<h5
												className={`${
													active > index ? "textColor2" : "text-muted"
												} text-capitalize`}>
												{item?.title}
											</h5>
											{/* {index !== orderMap.length - 1 && (
												<p className="textColor2">
													{moment().format("DD MMM YYYY, hh:mm A")}
												</p>
											)} */}
										</div>
									</div>
								))}
							</div>
						)}
						<button
							onClick={toggle}
							className="btn btn-primary1 text-capitalize py-3 w-75 d-block mx-auto mt-4">
							close
						</button>
						<a
							href={`https://www.google.com/maps/dir/?api=1&origin=${data?.items?.[0]?.pickupLocation}&destination=${data?.items?.[0]?.dropoffLocation}&destination_place_id=:${data?.items?.[0]?.dropoffLocation}`}
							className="btn btn-primary1 text-capitalize py-3 w-75 d-block mx-auto mt-4 text-decoration-none text-white"
							target={"_blank"}
							rel="noreferrer">
							view map
						</a>
					</div>
				</div>
				<div
					className="col-7 backgroundMap p-0"
					style={{ background: `url(${map})` }}>
					{!err && (
						<iframe
							src={`https://www.google.com/maps/dir/?api=1&origin=${data?.items?.[0]?.pickupLocation}&destination=${data?.items?.[0]?.dropoffLocation}&destination_place_id=:${data?.items?.[0]?.dropoffLocation}`}
							className="h-100 w-100"
							onError={() => setErr(true)}
							title={data?.items?.[0]?.pickupLocation}
						/>
					)}
				</div>
			</div>
		</ModalComponents>
	);
};

export const AcceptModal = ({ textChange, stateData }) => {
	return (
		<form>
			<div className="form-floating mb-3">
				<input
					type="number"
					required
					name="price"
					className="form-control bg-grey"
					placeholder="Price"
					value={stateData?.price}
					onChange={textChange("price")}
				/>
				<label htmlFor="price">Price</label>
			</div>
			<div>
				<label htmlFor="Delivery schedule">Delivery duration</label>

				<div className="row mx-0 g-5">
					<div className="mb-3 col-4">
						<label htmlFor="Days">Days</label>
						<input
							type="number"
							required
							name="Delivery days"
							className="form-control bg-grey"
							placeholder="Days"
							value={stateData?.days}
							onChange={textChange("days")}
						/>
					</div>
					<div className="mb-3 col-4">
						<label htmlFor="Hours">Hours</label>
						<input
							type="number"
							required
							name="Delivery hours"
							className="form-control bg-grey"
							placeholder="Hours"
							value={stateData?.hours}
							onChange={textChange("hours")}
						/>
					</div>
				</div>
			</div>
		</form>
	);
};

const PickUpAcceptModal = ({
	handleSubmit,
	title,
	stateData,
	textChange,
	loading,
	active,
	setActive,
	textChange2,
	stateData2,
	setBidTerms,
	bidTerms,
}) => {
	useEffect(() => {
		setActive(0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let [subActive, setSubActive] = useState(0);

	console.log({ stateData, stateData2 });
	let returnValue = ["completed", "accepted", "picked", "delivered"];
	const { auth, nairaSign, numberWithCommas, referrals } =
		useContext(GlobalState);

	return (
		<>
			{active === 1 ? (
				<>
					<AcceptModal
						textChange={textChange2}
						stateData={stateData2}
						edit={auth?.user?._id === stateData?.bid?.vendor ? true : false}
					/>
					<button
						className="btn btn-outline-primary1 text-capitalize ms-auto d-block"
						onClick={() => setActive(0)}>
						return
					</button>
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

						{stateData2?.price && (
							<p className="text-center d-flex align-items-center justify-content-between">
								<span>Late delivery fee: </span>
								<strong>
									{nairaSign}{" "}
									{numberWithCommas(
										Number(
											(stateData2?.price *
												referrals?.settings?.latePercentage) /
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
						title={
							auth?.user?._id === stateData?.bid?.vendor ? "update bid" : "send"
						}
						width="w-50"
					/>
				</>
			) : (
				<>
					<PickUpFormAccept
						textChange={textChange}
						stateData={stateData}
						title={title}
						loading={loading}
						handleSubmit={handleSubmit}
						subActive={subActive}
					/>
					{stateData?.items?.length > 1 && (
						<div className="d-flex align-items-center">
							<span>
								{subActive + 1}/{stateData?.items.length} items
							</span>
							<button
								className="btn btn-outline-primary1 text-capitalize ms-auto d-block"
								onClick={() =>
									setSubActive(
										stateData?.items?.length - 1 === subActive ? 0 : ++subActive
									)
								}>
								next
							</button>
						</div>
					)}
					{!returnValue?.includes(stateData?.bid?.status) && (
						<Buttons
							onClick={() => setActive(1)}
							loading={loading}
							css="btn btn-primary1 text-capitalize py-3 w-50 d-block mx-auto my-4"
							title={"accept"}
							width="w-50"
						/>
					)}
					<a
						href={`https://www.google.com/maps/dir/?api=1&origin=${stateData?.items?.[subActive]?.pickupLocation}&destination=${stateData?.items?.[subActive]?.dropoffLocation}&destination_place_id=:${stateData?.items?.[subActive]?.dropoffLocation}`}
						className="btn btn-primary1 text-capitalize py-3 w-50 d-block mx-auto mt-4 text-decoration-none text-white"
						target={"_blank"}
						rel="noreferrer">
						view map
					</a>
				</>
			)}
		</>
	);
};

const PickUpFormAccept = ({ textChange, stateData, subActive }) => {
	const { auth } = useContext(GlobalState);
	// console.log({ stateData });
	let requiredField = ["accepted", "picked", "completed", "delivered"];
	return (
		<form>
			{stateData?.bid &&
				stateData?.bid?.vendor === auth?.user?._id &&
				requiredField?.includes(stateData?.bid?.status) && (
					<div className="form-floating mb-3">
						<input
							type="text"
							required
							name="fullname"
							className="form-control bg-grey"
							placeholder="Pick up full name"
							value={stateData?.items?.[subActive]?.pickupName}
							readOnly
							onChange={textChange("pickupName")}
						/>
						<label htmlFor="fullname">Pick up full name</label>
						<small className="mb-4 d-block">
							Name of the person we are picking item from{" "}
						</small>
					</div>
				)}
			<div className="form-floating mb-3">
				<input
					type="text"
					required
					name="address"
					className="form-control bg-grey"
					placeholder="Pick up address"
					value={stateData?.items?.[subActive]?.pickupLocation}
					readOnly
					onChange={textChange("pickupLocation")}
				/>
				<label htmlFor="fullname">Pick up address</label>
				<small className="mb-4 d-block">Kindly give detailed adress </small>
			</div>
			{stateData?.bid &&
				stateData?.bid?.vendor === auth?.user?._id &&
				requiredField?.includes(stateData?.bid?.status) && (
					<>
						<div className="form-floating mb-3">
							<input
								type="tel"
								required
								name="telephone"
								className="form-control bg-grey"
								placeholder="Pick up telephone"
								value={stateData?.items?.[subActive]?.pickupPhone}
								readOnly
								onChange={textChange("pickupPhone")}
							/>
							<label htmlFor="fullname">Pick up phone number</label>
							<small className="mb-4 d-block">
								Provide phone number and other line{" "}
							</small>
						</div>
						<div className="form-floating mb-3">
							<input
								type="text"
								required
								name="item"
								className="form-control bg-grey"
								placeholder="Pick up item"
								value={stateData?.items?.[0]?.pickupItem}
								readOnly
								onChange={textChange("pickupItem")}
							/>
							<label htmlFor="fullname">Pick up item</label>
						</div>
					</>
				)}
			<p>Delivery Mode</p>
			<div className="row mb-4">
				<div className="col-3">
					<input
						type="radio"
						name="deliveryMode"
						className="form-check-input me-2 borderColor"
						title="bicycle"
						id="Bicycle"
						value={stateData?.items?.[subActive]?.deliveryMode}
						readOnly
						onChange={textChange("deliveryMode")}
						checked={stateData?.items?.[subActive]?.deliveryMode === "bicycle"}
					/>
					<label htmlFor="Bicycle"> Bicycle</label>
				</div>
				<div className="col-3">
					<input
						type="radio"
						name="deliveryMode"
						className="form-check-input me-2 borderColor"
						title="bike"
						id="Bike"
						value={stateData?.items?.[subActive]?.deliveryMode}
						readOnly
						onChange={textChange("deliveryMode")}
						checked={stateData?.items?.[subActive]?.deliveryMode === "bike"}
					/>
					<label htmlFor="Bike"> Bike</label>
				</div>
				<div className="col-3">
					<input
						type="radio"
						name="deliveryMode"
						className="form-check-input me-2 borderColor"
						title="car"
						id="Car"
						value={stateData?.items?.[subActive]?.deliveryMode}
						readOnly
						onChange={textChange("deliveryMode")}
						checked={stateData?.items?.[subActive]?.deliveryMode === "car"}
					/>
					<label htmlFor="Car"> Car</label>
				</div>
				<div className="col-3">
					<input
						type="radio"
						name="deliveryMode"
						className="form-check-input me-2 borderColor"
						title="truck"
						id="Truck"
						value={stateData?.items?.[subActive]?.deliveryMode}
						readOnly
						onChange={textChange("deliveryMode")}
						checked={stateData?.items?.[subActive]?.deliveryMode === "truck"}
					/>
					<label htmlFor="Truck"> Truck</label>
				</div>
			</div>
			{stateData?.bid &&
				stateData?.bid?.vendor === auth?.user?._id &&
				requiredField?.includes(stateData?.bid?.status) && (
					<div className="form-floating mb-3">
						<input
							type="text"
							required
							name="fullname"
							className="form-control bg-grey"
							placeholder="Drop off full name"
							value={stateData?.items?.[subActive]?.dropoffName}
							readOnly
							onChange={textChange("dropoffName")}
						/>
						<label htmlFor="fullname">Drop off full name</label>
						<small className="mb-4 d-block">Receiver's name </small>
					</div>
				)}
			<div className="form-floating mb-3">
				<input
					type="text"
					required
					name="address"
					className="form-control bg-grey"
					placeholder="Drop off address"
					value={stateData?.items?.[subActive]?.dropoffLocation}
					readOnly
					onChange={textChange("dropoffLocation")}
				/>
				<label htmlFor="fullname">Drop off address</label>
				<small className="mb-4 d-block">Receiver's address </small>
			</div>
			{stateData?.bid &&
				stateData?.bid?.vendor === auth?.user?._id &&
				requiredField?.includes(stateData?.bid?.status) && (
					<div className="form-floating mb-3">
						<input
							type="tel"
							required
							name="telephone"
							className="form-control bg-grey"
							placeholder="Drop off telephone"
							value={stateData?.items?.[subActive]?.dropoffPhone}
							readOnly
							onChange={textChange("dropoffPhone")}
						/>
						<label htmlFor="fullname">Drop off phone number</label>
						<small className="mb-4 d-block">
							Kindly provide main line and other line{" "}
						</small>
					</div>
				)}
			{stateData?.bid &&
				stateData?.bid?.vendor === auth?.user?._id &&
				requiredField?.includes(stateData?.bid?.status) && (
					<div className="form-floating mb-3">
						<input
							type="text"
							required
							name="fullname"
							className="form-control bg-grey"
							placeholder="Tracking ID"
							value={stateData?.orderId}
							readOnly
							onChange={textChange("orderId")}
						/>
						<label htmlFor="fullname">Tracking ID</label>
					</div>
				)}
			<p>Delivery Type</p>
			<div className="mb-4">
				<div className="">
					<input
						type="radio"
						name="deliveryType"
						readOnly
						className="form-check-input me-2 borderColor"
						value={stateData?.items?.[subActive]?.deliveryType}
						onChange={textChange("deliveryType")}
						title="City (delivery within same state or city)"
						id="City (delivery within same state or city)"
						checked={
							stateData?.items?.[subActive]?.deliveryType ===
							"City (delivery within same state or city)"
						}
					/>
					<label htmlFor="City (delivery within same state or city)">
						{" "}
						City (delivery within same state or city)
					</label>
				</div>
				<div className="">
					<input
						type="radio"
						readOnly
						name="deliveryType"
						className="form-check-input me-2 borderColor"
						value={stateData?.items?.[subActive]?.deliveryType}
						onChange={textChange("deliveryType")}
						title="Inter-State"
						id="Inter-State"
						checked={
							stateData?.items?.[subActive]?.deliveryType === "Inter-State"
						}
					/>
					<label htmlFor="Inter-State"> Inter-State</label>
				</div>
				<div className="">
					<input
						type="radio"
						readOnly
						name="deliveryType"
						className="form-check-input me-2 borderColor"
						value={stateData?.items?.[subActive]?.deliveryType}
						onChange={textChange("deliveryType")}
						title="Inter-Country"
						id="Inter-Country"
						checked={
							stateData?.items?.[subActive]?.deliveryType === "Inter-Country"
						}
					/>
					<label htmlFor="Inter-Country"> Inter-Country</label>
				</div>
			</div>
		</form>
	);
};

const ViewOrderFormModal = ({ stateData, textChange, toggle, active }) => {
	let { auth } = useContext(GlobalState);
	let [subActive, setSubActive] = useState(0),
		[state, setState] = useState(null);

	useEffect(() => {
		setState(
			active === 0 || auth?.user?.type === "user" ? stateData : stateData?.order
		);
	}, [active, stateData, auth?.user?.type]);

	if (!state) return <></>;

	// console.log({ stateData });

	return (
		<>
			<ViewOrderForm
				textChange={textChange}
				stateData={state}
				subActive={subActive}
				active={active}
			/>
			{state?.items?.length > 1 && (
				<div className="d-flex align-items-center">
					<span>
						{subActive + 1}/{state?.items.length} items
					</span>
					<button
						className="btn btn-outline-primary1 text-capitalize ms-auto d-block"
						onClick={() =>
							setSubActive(
								state?.items?.length - 1 === subActive ? 0 : ++subActive
							)
						}>
						next
					</button>
				</div>
			)}
			{auth?.user?.type === "user" || active === 0 ? (
				<Link
					to={`/orders/${state?._id}`}
					className="btn btn btn-primary1 text-capitalize py-3 w-50 d-block mx-auto my-4">
					view order bid(s)
				</Link>
			) : null}
			<Buttons
				onClick={toggle}
				css="btn btn-primary1 text-capitalize py-3 w-50 d-block mx-auto my-4"
				title={"view order status"}
				width="w-50"
			/>
		</>
	);
};

const ViewOrderForm = ({ textChange, stateData, subActive }) => {
	return (
		<form>
			<div className="form-floating mb-3">
				<input
					type="text"
					required
					name="fullname"
					className="form-control bg-grey"
					placeholder="Pick up full name"
					value={stateData?.items?.[subActive]?.pickupName}
					readOnly
					onChange={textChange("pickupName")}
				/>
				<label htmlFor="fullname">Pick up full name</label>
				<small className="mb-4 d-block">
					Name of the person we are picking item from{" "}
				</small>
			</div>
			<div className="form-floating mb-3">
				<input
					type="text"
					required
					name="address"
					className="form-control bg-grey"
					placeholder="Pick up address"
					value={stateData?.items?.[subActive]?.pickupLocation}
					readOnly
					onChange={textChange("pickupLocation")}
				/>
				<label htmlFor="fullname">Pick up address</label>
				<small className="mb-4 d-block">Kindly give detailed adress </small>
			</div>
			<div className="form-floating mb-3">
				<input
					type="tel"
					required
					name="telephone"
					className="form-control bg-grey"
					placeholder="Pick up telephone"
					value={stateData?.items?.[subActive]?.pickupPhone}
					readOnly
					onChange={textChange("pickupPhone")}
				/>
				<label htmlFor="fullname">Pick up phone number</label>
				<small className="mb-4 d-block">
					Provide phone number and other line{" "}
				</small>
			</div>
			<div className="form-floating mb-3">
				<input
					type="text"
					required
					name="item"
					className="form-control bg-grey"
					placeholder="Pick up item"
					value={stateData?.items?.[0]?.pickupItem}
					readOnly
					onChange={textChange("pickupItem")}
				/>
				<label htmlFor="fullname">Pick up item</label>
			</div>
			<p>Delivery Mode</p>
			<div className="row mb-4">
				<div className="col-3">
					<input
						type="radio"
						name="deliveryMode"
						className="form-check-input me-2 borderColor"
						title="bicycle"
						id="Bicycle"
						value={stateData?.items?.[subActive]?.deliveryMode}
						readOnly
						onChange={textChange("deliveryMode")}
						checked={stateData?.items?.[subActive]?.deliveryMode === "bicycle"}
					/>
					<label htmlFor="Bicycle"> Bicycle</label>
				</div>
				<div className="col-3">
					<input
						type="radio"
						name="deliveryMode"
						className="form-check-input me-2 borderColor"
						title="bike"
						id="Bike"
						value={stateData?.items?.[subActive]?.deliveryMode}
						readOnly
						onChange={textChange("deliveryMode")}
						checked={stateData?.items?.[subActive]?.deliveryMode === "bike"}
					/>
					<label htmlFor="Bike"> Bike</label>
				</div>
				<div className="col-3">
					<input
						type="radio"
						name="deliveryMode"
						className="form-check-input me-2 borderColor"
						title="car"
						id="Car"
						value={stateData?.items?.[subActive]?.deliveryMode}
						readOnly
						onChange={textChange("deliveryMode")}
						checked={stateData?.items?.[subActive]?.deliveryMode === "car"}
					/>
					<label htmlFor="Car"> Car</label>
				</div>
				<div className="col-3">
					<input
						type="radio"
						name="deliveryMode"
						className="form-check-input me-2 borderColor"
						title="truck"
						id="Truck"
						value={stateData?.items?.[subActive]?.deliveryMode}
						readOnly
						onChange={textChange("deliveryMode")}
						checked={stateData?.items?.[subActive]?.deliveryMode === "truck"}
					/>
					<label htmlFor="Truck"> Truck</label>
				</div>
			</div>
			<div className="form-floating mb-3">
				<input
					type="text"
					required
					name="fullname"
					className="form-control bg-grey"
					placeholder="Drop off full name"
					value={stateData?.items?.[subActive]?.dropoffName}
					readOnly
					onChange={textChange("dropoffName")}
				/>
				<label htmlFor="fullname">Drop off full name</label>
				<small className="mb-4 d-block">Receiver's name </small>
			</div>
			<div className="form-floating mb-3">
				<input
					type="text"
					required
					name="address"
					className="form-control bg-grey"
					placeholder="Drop off address"
					value={stateData?.items?.[subActive]?.dropoffLocation}
					readOnly
					onChange={textChange("dropoffLocation")}
				/>
				<label htmlFor="fullname">Drop off address</label>
				<small className="mb-4 d-block">Receiver's address </small>
			</div>
			<div className="form-floating mb-3">
				<input
					type="tel"
					required
					name="telephone"
					className="form-control bg-grey"
					placeholder="Drop off telephone"
					value={stateData?.items?.[subActive]?.dropoffPhone}
					readOnly
					onChange={textChange("dropoffPhone")}
				/>
				<label htmlFor="fullname">Drop off phone number</label>
				<small className="mb-4 d-block">
					Kindly provide main line and other line{" "}
				</small>
			</div>
			<p>Delivery Type</p>
			<div className="mb-4">
				<div className="">
					<input
						type="radio"
						name="deliveryType"
						readOnly
						className="form-check-input me-2 borderColor"
						value={stateData?.items?.[subActive]?.deliveryType}
						onChange={textChange("deliveryType")}
						title="City (delivery within same state or city)"
						id="City (delivery within same state or city)"
						checked={
							stateData?.items?.[subActive]?.deliveryType ===
							"City (delivery within same state or city)"
						}
					/>
					<label htmlFor="City (delivery within same state or city)">
						{" "}
						City (delivery within same state or city)
					</label>
				</div>
				<div className="">
					<input
						type="radio"
						readOnly
						name="deliveryType"
						className="form-check-input me-2 borderColor"
						value={stateData?.items?.[subActive]?.deliveryType}
						onChange={textChange("deliveryType")}
						title="Inter-State"
						id="Inter-State"
						checked={
							stateData?.items?.[subActive]?.deliveryType === "Inter-State"
						}
					/>
					<label htmlFor="Inter-State"> Inter-State</label>
				</div>
				<div className="">
					<input
						type="radio"
						readOnly
						name="deliveryType"
						className="form-check-input me-2 borderColor"
						value={stateData?.items?.[subActive]?.deliveryType}
						onChange={textChange("deliveryType")}
						title="Inter-Country"
						id="Inter-Country"
						checked={
							stateData?.items?.[subActive]?.deliveryType === "Inter-Country"
						}
					/>
					<label htmlFor="Inter-Country"> Inter-Country</label>
				</div>
			</div>
			<div className="form-floating mb-3">
				<input
					type="text"
					required
					name="fullname"
					className="form-control bg-grey"
					placeholder="Tracking ID"
					value={stateData?.orderId}
					readOnly
					onChange={textChange("orderId")}
				/>
				<label htmlFor="fullname">Tracking ID</label>
			</div>
		</form>
	);
};
