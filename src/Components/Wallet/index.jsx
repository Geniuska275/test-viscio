import React, { Fragment, useContext, useEffect, useState } from "react";
import moment from "moment";
import { ModalComponents } from "../DefaultHeader";
import { DefaultBoxing } from "../Error";
import { Buttons, EmptyComponent } from "../../Utils";
import { GlobalState } from "../../Data/Context";
import { usePaystackPayment } from "react-paystack";
import { toast } from "react-toastify";
import axios from "axios";

const Wallets = ({
	toggle,
	userType,
	toggle2,
	isOpen,
	isOpen2,
	handleSubmit2,
}) => {
	const { wallets, nairaSign, numberWithCommas, auth, fundWallet, banks } =
		useContext(GlobalState);
	let [report, setReport] = useState(""),
		[stateWallet, setStateWallet] = useState(null),
		init = {
			accountNumber: "",
			bankCode: "",
			bankId: "",
			amount: "",
		},
		[stateData, setStateData] = useState(init),
		[totalPayment, setTotalPayment] = useState(""),
		[completePayment, setCompletePayment] = useState(""),
		[reference, setReference] = useState(""),
		[loading, setLoading] = useState(false),
		[bankOpen, setBankOpen] = useState(false),
		[walletActive, setWalletActive] = useState(0),
		[submit, setSubmit] = useState(false),
		[stateDelete, setStateDelete] = useState({ isDeleted: false, data: "" }),
		toggleDel = () => {
			setStateDelete({ isDeleted: false, data: "" });
		},
		banktoggle = () => {
			setBankOpen(!bankOpen);
		},
		textChange =
			name =>
			({ target: { value } }) => {
				setStateData({ ...stateData, [name]: value });
			};

	useEffect(() => {
		setStateWallet(wallets.wallet);
	}, [wallets.wallet]);

	useEffect(() => {
		if (totalPayment) {
			let newTotal,
				percent = Math.ceil((1.55 * Number(totalPayment)) / 100);

			if (percent > 2000) percent = 2000;
			if (Number(totalPayment) >= 2500) {
				if (percent === 2000) newTotal = Number(totalPayment) + Number(percent);
				else newTotal = Number(totalPayment) + Number(percent) + 100;
			} else {
				newTotal = Number(totalPayment) + Number(percent);
			}

			setCompletePayment(newTotal);
		}
	}, [totalPayment]);

	const config = {
		email: auth?.user?.email,
		amount: Number(Number(completePayment) * 100),
		publicKey: process.env.REACT_APP_PAYSTACK_KEY,
		metadata: {
			name: `${auth?.user?.lastName} ${auth?.user?.firstName}`,
			phone: auth?.user?.phone,
		},
		reference,
	};

	const initializePayment = usePaystackPayment(config);

	let handleSuccess = async ref => {
		setLoading(true);
		await fundWallet("verify", ref);
		setLoading(false);
		setSubmit(true);
		setReference("");
	};

	const onSuccess = reference => {
		handleSuccess(reference);
	};

	// you can call this function anything
	const onClose = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		console.log("closed");
	};

	let walletTab = [
		{
			name: "Transaction history",
			value: "history",
		},
		{
			name: "Bank Accounts",
			value: "bank",
		},
	];

	useEffect(() => {
		if (reference) {
			initializePayment(onSuccess, onClose);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reference]);

	const handleProcessPayment = async e => {
		e.preventDefault();
		if (!totalPayment) return;
		try {
			setLoading(true);
			let res = await axios.post(`/transaction/generate`, {
				amount: completePayment,
				purpose: "Wallet",
			});
			setReference(res?.data?.data?.reference);
			setLoading(false);
		} catch (error) {
			console.log({ error });
		}
		// console.log(onSuccess, onClose);
	};

	const handleAddBank = async e => {
		e.preventDefault();
		if (stateData?.accountNumber?.length !== 10)
			return toast.info("Account number must be 10 digits");

		setLoading(true);
		await fundWallet("banks", stateData);
		setLoading(false);
		setSubmit(true);
	};

	const handleInitiateWithdraw = async e => {
		e.preventDefault();
		let errArr = [];
		if (!stateData?.amount) errArr.push("Amount required");

		if (!stateData?.bankId) errArr.push("Account Bank required");

		if (errArr.length > 0) return errArr.forEach(item => toast.info(item));

		setLoading(true);
		await fundWallet("initiate", stateData);
		setLoading(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && wallets?.isAdded) {
			toggle();
			setSubmit(false);
		}
		if (submit && banks?.isAdded) {
			setBankOpen(false);
			setSubmit(false);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, wallets?.isAdded, banks?.isAdded]);

	return (
		<>
			<DefaultBoxing>
				<div>
					<p>available balance</p>
					<h1 className="">
						{nairaSign}{" "}
						{numberWithCommas(stateWallet?.balance ? stateWallet?.balance : 0)}
					</h1>
					<button
						type="button"
						onClick={toggle}
						className="btn btn-white text-capitalize py-3 px-5 mt-5">
						{userType ? "withdraw" : "fund wallet"}
					</button>
				</div>
			</DefaultBoxing>
			{auth?.user?.type === "user" ? (
				<p className="my-3 text-center text5 fw-normal">Transaction history</p>
			) : (
				<>
					<div className="btn-group w-100 mt-3">
						{walletTab.map((item, ind) => (
							<button
								className={`btn w-100 ${
									walletActive === ind ? "border-bottom roudned-none" : ""
								}`}
								onClick={() => setWalletActive(ind)}
								key={ind}>
								{item?.name}
							</button>
						))}
					</div>
					{walletTab?.[walletActive]?.value === "bank" ? (
						<div className="d-flex justify-content-end align-items-center pt-3">
							<button
								onClick={banktoggle}
								className="btn btn-primary1 text-capitalize">
								add bank
							</button>
							<BankModal
								isOpen={bankOpen}
								toggle={banktoggle}
								banks={banks?.banks}
								loading={loading}
								handleSubmit={handleAddBank}
								textChange={textChange}
							/>
						</div>
					) : null}
					<p className="my-3 text-center text5 fw-normal">
						{walletTab[walletActive]?.name}
					</p>
				</>
			)}
			<>
				{auth?.user?.type === "user" ? (
					<>
						<HistoryTable
							stateWallet={stateWallet}
							userType={userType}
							toggle2={toggle2}
							nairaSign={nairaSign}
							numberWithCommas={numberWithCommas}
						/>
					</>
				) : (
					<>
						{walletActive === 1 ? (
							<AccountTable data={banks?.bankAccount} toggle={setStateDelete} />
						) : (
							<HistoryTable
								stateWallet={stateWallet}
								userType={userType}
								toggle2={toggle2}
								nairaSign={nairaSign}
								numberWithCommas={numberWithCommas}
							/>
						)}
					</>
				)}
			</>
			<ModalComponents
				title={userType ? "withdraw" : "Fund Wallet"}
				toggle={toggle}
				isOpen={isOpen}>
				{userType ? (
					<WithdrawFund
						handleSubmit={handleInitiateWithdraw}
						stateData={stateData}
						textChange={textChange}
						banks={banks?.bankAccount}
						stateWallet={stateWallet}
						loading={loading}
					/>
				) : (
					<FundWallet
						handleSubmit={handleProcessPayment}
						totalPayment={totalPayment}
						setTotalPayment={setTotalPayment}
						loading={loading}
						user={auth?.user}
						nairaSign={nairaSign}
						numberWithCommas={numberWithCommas}
						completePayment={completePayment}
					/>
				)}
			</ModalComponents>
			<ModalComponents title={"report"} toggle={toggle2} isOpen={isOpen2}>
				<Report
					handleSubmit={handleSubmit2}
					report={report}
					setReport={setReport}
				/>
			</ModalComponents>
			<ModalComponents
				title={"Delete Account"}
				back={toggleDel}
				isOpen={stateDelete.isDeleted}>
				<div className="downH2 d-flex">
					<form className="d-flex flex-column justify-content-center align-items-center h-100 w-100 m-auto">
						<p>Do you want to delete this account?</p>
						<div className="btn-group mx-auto w-50">
							<Buttons
								loading={loading}
								onClick={async e => {
									e.preventDefault();
									setLoading(true);
									await fundWallet("delete-bank", stateDelete.data);
									setSubmit(true);
									setLoading(false);
								}}
								width="w-50"
								css="btn-success2 text-capitalize py-3 w-50"
								title={"yes"}
							/>
							<Buttons
								onClick={toggleDel}
								width="w-50"
								css="btn-primary1 text-capitalize py-3 w-50"
								title={"no"}
							/>
						</div>
					</form>
				</div>
			</ModalComponents>
		</>
	);
};

export default Wallets;

const FundWallet = ({
	handleSubmit,
	loading,
	totalPayment,
	setTotalPayment,
	user,
	nairaSign,
	numberWithCommas,
	completePayment,
}) => {
	let [active, setActive] = useState(0);

	return (
		<form>
			{active === 1 ? (
				<div className="px-4">
					<p className="text-center d-flex align-items-center justify-content-between">
						Amount:{" "}
						<strong>
							{nairaSign} {numberWithCommas(Number(totalPayment).toFixed(2))}{" "}
						</strong>
					</p>
					<p className="text-center d-flex align-items-center justify-content-between">
						Charge:{" "}
						<strong>
							{nairaSign}{" "}
							{numberWithCommas(
								Number(Number(completePayment) - Number(totalPayment)).toFixed(
									2
								)
							)}{" "}
						</strong>
					</p>

					<p className="text-center d-flex align-items-center justify-content-between">
						<span>Total: </span>
						<strong>
							{nairaSign} {numberWithCommas(Number(completePayment).toFixed(2))}{" "}
						</strong>
					</p>
					<p className="text-center">
						Funds credited to your wallet are non refundable and cannot be
						withdrawn. They shall be applied solely towards your transactions
						within VISCIO
					</p>
					<button
						type="button"
						onClick={() => {
							setActive(0);
						}}
						className="btn btn-outline-primary1 text-capitalize d-block ms-auto">
						back
					</button>

					<Buttons
						loading={loading}
						onClick={handleSubmit}
						width="w-50"
						css={"btn-primary1 text-capitalize py-3 d-block mx-auto my-4"}
						title="fund wallet"
					/>
				</div>
			) : (
				<div className="px-3">
					<p className="text-center">
						Hi {user?.lastName} {user?.firstName}, please note we will direct
						you to our payment platform to fund your wallet
					</p>
					<small className="d-block my-3 text-center">
						Please kindly enter the amount to fund this wallet
					</small>
					<div className="form-floating mb-3">
						<input
							type="number"
							name="amount"
							id=""
							className="form-control bg-grey"
							placeholder="N 50,000"
							value={totalPayment}
							onChange={e => setTotalPayment(e.target.value)}
						/>
						<label htmlFor="amount">Amount</label>
					</div>
					<button
						onClick={e => {
							e.preventDefault();
							if (!totalPayment)
								return toast.info("Amount to fund wallet with is required");
							setActive(1);
						}}
						className="btn btn-primary1 text-capitalize py-3 w-50 d-block mx-auto my-4">
						fund wallet
					</button>
				</div>
			)}
		</form>
	);
};

const Report = ({ handleSubmit, loading, report, setReport }) => {
	return (
		<form>
			<textarea
				name="report"
				className="form-control bg-grey"
				placeholder="Message"
				style={{
					height: "10rem",
					resize: "none",
				}}
				value={report}
				onChange={e => setReport(e.target.value)}
			/>
			<Buttons
				onClick={handleSubmit}
				loading={loading}
				css="btn btn-primary1 text-capitalize py-3 w-50 d-block mx-auto my-4"
				width="w-50"
				title={"send"}
			/>
		</form>
	);
};

const WithdrawFund = ({
	handleSubmit,
	stateData,
	textChange,
	loading,
	banks,
	stateWallet,
}) => {
	let [active, setActive] = useState(0);
	let { referrals, nairaSign, numberWithCommas } = useContext(GlobalState);
	let [charge, setCharge] = useState(0);

	useEffect(() => {
		setCharge(
			Number((stateData?.amount * referrals?.settings?.chargePercentage) / 100)
		);
	}, [stateData?.amount, referrals?.settings]);
	if (!banks) return;

	return (
		<form>
			{active === 1 ? (
				<>
					<div className="px-4">
						<p className="text-center d-flex align-items-center justify-content-between">
							Amount:{" "}
							<strong>
								{nairaSign}{" "}
								{numberWithCommas(Number(stateData?.amount).toFixed(2))}{" "}
							</strong>
						</p>
						<p className="text-center d-flex align-items-center justify-content-between">
							Charge:{" "}
							<strong>
								{nairaSign} {numberWithCommas(Number(charge).toFixed(2))}{" "}
							</strong>
						</p>

						<p className="text-center d-flex align-items-center justify-content-between">
							<span>Total: </span>
							<strong>
								{nairaSign}{" "}
								{numberWithCommas(
									Number(Number(stateData?.amount) + charge).toFixed(2)
								)}{" "}
							</strong>
						</p>
						<button
							type="button"
							onClick={() => {
								setActive(0);
							}}
							className="btn btn-outline-primary1 text-capitalize d-block ms-auto my-4">
							back
						</button>
						<Buttons
							onClick={handleSubmit}
							loading={loading}
							css="btn btn-primary1 text-capitalize py-3 w-50 d-block mx-auto my-4"
							title={"send"}
							width="w-50"
						/>
					</div>
				</>
			) : (
				<>
					<div className="form-floating mb-3">
						<select
							name="bankId"
							className="form-control bg-grey"
							value={stateData?.bankId}
							onChange={textChange("bankId")}>
							<option value="">Select a bank</option>
							{banks?.map((item, i) => (
								<option value={item?._id} key={i}>
									{item?.accountName}, {item?.bankName}
								</option>
							))}
						</select>
						<label htmlFor="bankId" className="textColor2">
							Bank
						</label>
					</div>
					<div className="form-floating mb-3">
						<input
							type="number"
							placeholder="50,000"
							name="amount"
							className="form-control bg-grey"
							value={stateData?.amount}
							onChange={textChange("amount")}
							max={stateWallet?.balance}
						/>
						<label htmlFor="amount" className="textColor2">
							Amount
						</label>
					</div>
					<Buttons
						onClick={e => {
							e.preventDefault();
							let errArr = [];
							if (!stateData?.amount) errArr.push("Amount required");

							if (!stateData?.bankId) errArr.push("Account Bank required");

							if (errArr.length > 0)
								return errArr.forEach(item => toast.info(item));

							setActive(1);
						}}
						css="btn btn-primary1 text-capitalize py-3 w-50 d-block mx-auto my-4"
						title={"next"}
						width="w-50"
					/>
				</>
			)}
		</form>
	);
};

const HistoryTable = ({ stateWallet, nairaSign, numberWithCommas }) => {
	return (
		<>
			{stateWallet?.histories?.length === 0 ? (
				<div className="pt-4">
					<EmptyComponent subtitle={"No Wallet  history"} />
				</div>
			) : (
				<table className="table">
					<thead className="">
						<tr className="thead">
							<th>Amount</th>
							<th>Date</th>
							<th>Details</th>
						</tr>
					</thead>
					<tbody>
						{stateWallet?.histories
							?.sort((a, b) => moment(b?.createdAt) - moment(a?.createdAt))
							?.map((item, index) => (
								<Fragment key={index}>
									<tr className="py-1">
										<td className="text-capitalize">
											{nairaSign}
											{numberWithCommas(item?.amount)}
										</td>
										<td className="text-capitalize">
											{moment(item?.createdAt).format("L")}
										</td>
										<td className="text-capitalize">{item?.description}</td>
									</tr>
									<tr className="mustSeperate" />
								</Fragment>
							))}
					</tbody>
				</table>
			)}
		</>
	);
};

const AccountTable = ({ data, toggle }) => {
	if (!data) return;
	return (
		<>
			{data?.length === 0 ? (
				<div className="pt-4">
					<EmptyComponent subtitle={"No Account  history"} />
				</div>
			) : (
				<table className="table">
					<thead className="">
						<tr className="thead">
							<th>Bank Name</th>
							<th>Account Number</th>
							<th>Account Name</th>
						</tr>
					</thead>
					<tbody>
						{data?.map((item, index) => (
							<Fragment key={index}>
								<tr className="py-1">
									<td className="text-capitalize">{item?.bankName}</td>
									<td className="text-capitalize">{item?.accountNumber}</td>
									<td className="text-capitalize">{item?.accountName}</td>
									<td className="text-capitalize">
										<button
											type="button"
											onClick={() => {
												toggle({ isDeleted: true, data: item });
											}}
											className="btn btn-outline-danger text-capitalize border-bottom">
											delete
										</button>
									</td>
								</tr>
								<tr className="mustSeperate" />
							</Fragment>
						))}
					</tbody>
				</table>
			)}
		</>
	);
};

const BankModal = ({
	isOpen,
	toggle,
	banks,
	stateData,
	textChange,
	loading,
	handleSubmit,
}) => {
	if (!banks) return;
	return (
		<ModalComponents isOpen={isOpen} back={toggle} title="add bank account">
			<form>
				<div className="form-floating mb-3">
					<select
						name="bankCode"
						className="form-control bg-grey"
						value={stateData?.bankCode}
						onChange={textChange("bankCode")}>
						<option value="">Select a bank</option>
						{banks?.map((item, i) => (
							<option value={item?.code} key={i}>
								{item?.name}
							</option>
						))}
					</select>
					<label htmlFor="bankCode" className="textColor2">
						Bank
					</label>
				</div>
				<div className="form-floating mb-3">
					<input
						type="number"
						name="accountNumber"
						placeholder="0254195018"
						className="form-control bg-grey"
						value={stateData?.accountNumber}
						onChange={textChange("accountNumber")}
					/>
					<label htmlFor="accountNumber" className="textColor2">
						Account Number
					</label>
				</div>

				<Buttons
					onClick={handleSubmit}
					loading={loading}
					css="btn btn-primary1 text-capitalize py-3 w-50 d-block mx-auto my-4"
					title={"send"}
					width="w-50"
				/>
			</form>
		</ModalComponents>
	);
};
