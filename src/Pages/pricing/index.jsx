import React, { Fragment, useState, useEffect, useContext } from "react";
import { Container } from "reactstrap";
import { ModalComponents } from "../../Components";
import axios from "axios";
import { Buttons, EmptyComponent } from "../../Utils";
import { GlobalState } from "../../Data/Context";

export const vehicleType = ["bike", "car", "bicycle", "truck"];
export const deliveryType = [
	"City (delivery within same state or city)",
	"Inter-State",
	"Inter-Country",
];

// export let getPriceDistance = async data => {
// 	try {
// 		let res = await axios.get(`/price-checker/distance`, { ...data });
// 		return res;
// 	} catch (err) {
// 		console.log({ err: err.response });
// 		toast.error(err?.response ? err?.response?.data?.message : err?.message);
// 	}
// };

const Pricing = () => <MainPricing />;

export default Pricing;

export const CheckPrice = ({ handleSubmit, loading }) => {
	let [dataList, setDatalist] = useState([]),
		[dataList2, setDatalist2] = useState([]),
		[stateData, setStateData] = useState({
			pickup: "",
			destination: "",
			vehicleType: "",
		}),
		[data, setData] = useState({
			origin: "",
			destination: "",
			vehicleType: "",
		});
	let textChange =
		name =>
		({ target: { value } }) => {
			setStateData({ ...stateData, [name]: value });
		};

	let getLocation = async (input, name) => {
		try {
			let res = await axios.get(
				`/price-checker/address-suggestion?input=${input}`
			);
			if (name === "destination") setDatalist(res.data?.data);
			else setDatalist2(res.data?.data);
			// console.log(res.data);
		} catch (error) {
			console.log({ error });
		}
	};
	useEffect(() => {
		if (stateData?.destination)
			getLocation(stateData?.destination, "destination");
	}, [stateData?.destination]);

	useEffect(() => {
		if (stateData?.destination && dataList)
			dataList?.map(
				item =>
					item?.description === stateData.destination &&
					setData({ ...data, destination: item?.place_id })
			);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stateData?.destination, dataList]);

	useEffect(() => {
		if (stateData?.pickup && dataList2)
			dataList2?.map(
				item =>
					item?.description === stateData.pickup &&
					setData({ ...data, origin: item?.place_id })
			);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stateData?.pickup, dataList2]);

	useEffect(() => {
		if (stateData?.pickup) getLocation(stateData?.pickup, "pickup");
	}, [stateData?.pickup]);

	let handleCheckSubmit = async e => {
		e.preventDefault();
		console.log({ dataList, dataList2 });
		await handleSubmit({ ...data, vehicleType: stateData?.vehicleType }, e);
	};

	return (
		<form>
			<div className="form-floating mb-3">
				<input
					type="text"
					required
					name="address"
					className="form-control bg-grey"
					placeholder="Pick up address"
					list="pickup"
					value={stateData.pickup}
					onChange={textChange("pickup")}
				/>
				<datalist id="pickup">
					{dataList2?.map((item, index) => (
						<option value={item?.description} key={index} />
					))}
				</datalist>
				<label htmlFor="pickup">Pick up address</label>
				<small className="mb-4 d-block">Kindly give detailed adress </small>
			</div>
			<div className="form-floating mb-3">
				<input
					type="text"
					required
					name="address"
					className="form-control bg-grey"
					placeholder="Drop off address"
					list="destination"
					value={stateData.destination}
					onChange={textChange("destination")}
				/>
				<datalist id="destination">
					{dataList?.map((item, index) => (
						<option value={item?.description} key={index} />
					))}
				</datalist>
				<label htmlFor="destination">Drop off address</label>
				<small className="mb-4 d-block">Receiver's address </small>
			</div>
			<div className="mb-3 form-floating">
				<select
					name="VehicleType"
					value={stateData?.vehicleType}
					onChange={textChange("vehicleType")}
					className="text-capitalize form-select form-control">
					<option value="">Select a Vehicle Type</option>
					{vehicleType?.map((item, ind) => (
						<option value={item} key={ind}>
							{item}
						</option>
					))}
				</select>
				<label htmlFor="vehicleType">Vehicle type</label>
			</div>
			<Buttons
				title={"check price"}
				onClick={handleCheckSubmit}
				css="btn-primary1 text-capitalize py-3 d-block mx-auto my-4"
				width="w-50"
				loading={loading}
			/>
		</form>
	);
};

export const MainPricing = () => {
	const { getPriceChecker, priceChecker, nairaSign, numberWithCommas } =
		useContext(GlobalState);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	let [isOpen, setIsOpen] = useState(false),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[prices, setPrice] = useState(null),
		toggle = () => {
			setIsOpen(!isOpen);
		},
		handleSubmit = async (data, e) => {
			e.preventDefault();

			console.log({ data });
			setLoading(true);
			await getPriceChecker(data);
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (submit && priceChecker?.isFound) {
			toggle();
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, priceChecker?.isFound]);

	useEffect(() => {
		if (priceChecker.prices) setPrice([priceChecker.prices]);
	}, [priceChecker.prices]);

	// console.log({ prices });

	return (
		<Container className="px-lg-5  pt-3 pt-lg-0">
			<div className="d-flex justify-content-end align-items-center">
				<button
					type="button"
					onClick={toggle}
					className="btn btn-primary1 text-capitalize py-3 px-5 my-5">
					Check Price
				</button>
			</div>
			{prices?.length > 0 ? (
				<table className="table">
					<thead className="">
						<tr className="thead">
							<th>Distance in kilometer</th>
							<th>Price Range</th>
						</tr>
					</thead>
					<tbody>
						{prices?.map((item, index) => (
							<Fragment key={index}>
								<tr className="py-1">
									<td className="text-capitalize">
										{numberWithCommas(item?.distanceInKm)}
									</td>
									<td className="text-capitalize">
										{nairaSign} {numberWithCommas(item?.price)}
									</td>
								</tr>
							</Fragment>
						))}
					</tbody>
				</table>
			) : (
				<EmptyComponent subtitle={"No price checked"} />
			)}
			<ModalComponents title={"Price Checker"} toggle={toggle} isOpen={isOpen}>
				<CheckPrice handleSubmit={handleSubmit} loading={loading} />
			</ModalComponents>
		</Container>
	);
};
