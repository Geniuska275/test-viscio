import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import { BsArrowLeft, BsEye, BsEyeSlash, BsInfo } from "react-icons/bs";
import { Buttons, OtpComponent } from "../Utils";
import { GlobalState } from "../Data/Context";
import { toast } from "react-toastify";
import AccountVerification, { PhoneVerify } from "../Components/PasswordReset";
import { vehicleType } from "../Pages/pricing";

export let validateEmail = email => {
	const re =
		// eslint-disable-next-line no-useless-escape
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

const Register = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { registerUser, auth } = useContext(GlobalState);

	let [typePass, setTypePass] = useState(false),
		[typePassConfirm, setTypePassConfirm] = useState(false),
		series = ["Create an account", "Personal Info"],
		[active, setActive] = useState(0),
		[userType, setUserType] = useState(""),
		init = {
			dailing_code: "+234",
			phone: "",
			password: "",
			confirmPassword: "",
			mobilityAssetType: "",
			cacNumber: "",
			ninNumber: "",
			driverLicense: "",
			vehicleRegistration: "",
			officeFrontView: "",
			fullname: "",
			email: "",
			firstName: "",
			lastName: "",
			idType: "cac",
			referralCode: "",
		},
		[stateData, setStateData] = useState(init),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[isOpen, setIsOpen] = useState(false),
		[isOpen2, setIsOpen2] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		},
		toggle2 = () => {
			setIsOpen2(!isOpen2);
		};

	const handleUploadImage = path => async e => {
		let file = e.target.files[0];
		if (!file) {
			setLoading(false);
			return toast.error("No file included...");
		}

		setImages(path, file);
	};

	let setImages = (path, file) => {
		setStateData({ ...stateData, [path]: file });
	};

	let textChange =
		name =>
		({ target: { value, title, type, checked } }) => {
			setStateData({
				...stateData,
				[name]:
					type === "radio" ? title : type === "checkbox" ? checked : value,
			});
		};

	let handleSubmit1 = type => async e => {
		e.preventDefault();
		if (!stateData?.firstName || !stateData?.lastName || !stateData?.email)
			return;

		if (!validateEmail(stateData?.email))
			return toast.info("Invalid email format");
		setUserType(type);
		setActive(++active);
	};

	let handleSubmit = async e => {
		e.preventDefault();
		if (!stateData?.firstName || !stateData?.lastName || !stateData?.email)
			return;
		let ni = {
			nin: stateData?.ninNumber,
		};
		let ca = {
			cac: stateData?.cacNumber,
		};
		let data = {
			...stateData,
			type: userType,
			datas: stateData?.idType === "nin" ? ni : ca,
			cac: stateData?.cacNumber,
			nin: stateData?.ninNumber,
		};
		if (active === 1) {
			if (!stateData?.password || !stateData?.phone) return;
			if (stateData?.password !== stateData?.confirmPassword)
				return toast.error("Password do not match");

			setLoading(true);
			// console.log({ dataFront: data });
			await registerUser(data);
			setLoading(false);
			setSubmit(true);
		} else setActive(++active);
	};

	useEffect(() => {
		if (submit && auth?.isRegistered) {
			setSubmit(false);
			toggle();
			setStateData(init);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, auth?.isRegistered]);

	return (
		<Container className="py-5">
			<section className="d-flex justify-content-center align-items-center aboutScreen">
				<div
					data-aos="zoom-in"
					className="m-auto shadow px-3 py-5 rounded shadow2 w-100"
					style={{
						maxWidth: "550px",
					}}>
					<Container className="px-lg-5 px-3">
						<h3 className="textColor2 text-capitalize fw-600">
							{series[active]}
						</h3>
						{active === 0 ? (
							<MainRegister
								handleSubmit={handleSubmit1}
								stateData={stateData}
								textChange={textChange}
								toggle={toggle}
							/>
						) : active === 1 ? (
							<PersonalInfo
								typePass={typePass}
								setTypePass={setTypePass}
								typePass2={typePassConfirm}
								setTypePass2={setTypePassConfirm}
								stateData={stateData}
								textChange={textChange}
								handleSubmit={handleSubmit}
								userType={userType}
								loading={loading}
								handleUploadImage={handleUploadImage}
							/>
						) : (
							<></>
						)}
					</Container>
				</div>
			</section>
			<AccountVerification
				isOpen={isOpen}
				toggle={toggle}
				email={stateData?.email}
			/>
			<PhoneVerify isOpen={isOpen2} toggle={toggle2} />
		</Container>
	);
};

export default Register;

const MainRegister = ({ handleSubmit, stateData, textChange, toggle }) => {
	return (
		<>
			<small className="mb-4 d-block">Enter a valid email address </small>
			<form>
				<div className="form-floating mb-3">
					<input
						type="text"
						required
						name="firstName"
						className="form-control bg-grey borderColor textColor2"
						placeholder="John"
						value={stateData?.firstName}
						onChange={textChange("firstName")}
					/>
					<label htmlFor="firstName">First Name</label>
				</div>
				<div className="form-floating mb-3">
					<input
						type="text"
						required
						name="lastName"
						className="form-control bg-grey borderColor textColor2"
						placeholder="Doe"
						value={stateData?.lastName}
						onChange={textChange("lastName")}
					/>
					<label htmlFor="lastName">Last Name</label>
				</div>
				<div className="form-floating mb-3">
					<input
						type="email"
						required
						name="email"
						className="form-control bg-grey borderColor textColor2"
						placeholder="example@mail.com"
						value={stateData?.email}
						onChange={textChange("email")}
					/>
					<label htmlFor="email">Email</label>
				</div>
				<div className="form-floating mb-3">
					<input
						type="text"
						name="referralCode"
						className="form-control bg-grey borderColor textColor2"
						placeholder="Referral code"
						value={stateData?.referralCode}
						onChange={textChange("referralCode")}
					/>
					<label htmlFor="referralCode">Referral code</label>
				</div>

				<button
					onClick={handleSubmit("user")}
					className="btn btn-primary1 text-capitalize py-3 w-100 my-2">
					Create as user
				</button>
				<button
					onClick={handleSubmit("vendor")}
					className="btn btn-primary1 text-capitalize py-3 w-100 my-2">
					Create as Logistics Operator
				</button>
				<div className="text-center my-3">
					<Link
						to={`/login`}
						className="text-decoration-none text-dark fw-600 text-center">
						I have an account
						<BsArrowLeft className="textColor2 ms-3" />{" "}
					</Link>
				</div>
			</form>
			<div className="my-3 d-flex align-items-center justify-content-between">
				<button type="button" className="btn text-capitalize" onClick={toggle}>
					verify mail
				</button>
				{/* <button
							type="button"
							className="btn text-capitalize"
							onClick={toggle2}>
							verify telephone
						</button> */}
			</div>
		</>
	);
};

export const VerifyMail = ({ code, setCode, loading2, numInputs }) => {
	return (
		<>
			<small className="mb-4 d-block">Enter the OTP sent to your email</small>
			<div className="d-flex justify-content-center my-5 mx-auto">
				<OtpComponent
					stateData={code}
					textChange={data => {
						setCode(data);
					}}
					css="borderColor"
					loading={loading2}
					numInputs={numInputs}
				/>
			</div>
		</>
	);
};

const PersonalInfo = ({
	stateData,
	textChange,
	typePass,
	setTypePass,
	typePass2,
	setTypePass2,
	userType,
	handleSubmit,
	loading,
	handleUploadImage,
}) => {
	return (
		<>
			<small className="mb-4 d-block">Please fill this field correctly</small>
			{userType === "vendor" && (
				<>
					<p>ID type</p>
					<div className="row mb-4">
						<div className="col-6">
							<input
								type="radio"
								name="idType"
								className="form-check-input me-2 borderColor textColor2"
								title="cac"
								id="CAC Number"
								value={stateData?.idType}
								onChange={textChange("idType")}
								checked={stateData?.idType === "cac"}
							/>
							<label htmlFor="CAC Number" className="fontReducePass">
								{" "}
								CAC Number
							</label>
						</div>
						<div className="col-6">
							<input
								type="radio"
								name="idType"
								className="form-check-input me-2 borderColor textColor2"
								title="nin"
								id="NIN"
								value={stateData?.idType}
								onChange={textChange("idType")}
								checked={stateData?.idType === "nin"}
							/>
							<label htmlFor="NIN" className="fontReducePass">
								{" "}
								NIN
							</label>
						</div>
					</div>
					<div className="form-floating mb-3">
						<input
							type="text"
							required={userType === "vendor" ? true : false}
							name="cacNumber"
							className="form-control bg-grey borderColor textColor2"
							placeholder={`${
								stateData?.idType === "cac" ? "CAC Registration Number" : "NIN"
							}`}
							value={
								stateData?.idType === "nin"
									? stateData?.ninNumber
									: stateData?.cacNumber
							}
							onChange={textChange(
								stateData?.idType === "nin" ? "ninNumber" : "cacNumber"
							)}
						/>
						<label htmlFor="cacNumber">
							{stateData?.idType === "cac" ? "CAC Registration Number" : "NIN"}
						</label>
					</div>
				</>
			)}
			<div className="form-floating mb-4">
				<input
					type="tel"
					required
					name="phone"
					className="form-control bg-grey borderColor textColor2"
					placeholder="813 537 3695"
					value={stateData.phone}
					onChange={textChange("phone")}
				/>
				<label className="textColor2" htmlFor="phone">
					Phone
				</label>
			</div>
			<div className="form-floating show-hide position-relative">
				<input
					type={typePass ? "text" : "password"}
					required
					name="password"
					className="form-control bg-grey borderColor textColor2"
					placeholder="@Password123"
					value={stateData?.password}
					onChange={textChange("password")}
				/>
				<label htmlFor="Password">Password</label>
				<span className="" onClick={() => setTypePass(!typePass)}>
					{!typePass ? <BsEye /> : <BsEyeSlash />}
				</span>
			</div>
			<small className="text-muted mb-3 fontReducePass">
				Password must be at least 8 characters long, contains at least one
				number, one uppercase, one lowercase letter and one special character
			</small>
			<div className="form-floating mb-3 show-hide position-relative">
				<input
					type={typePass2 ? "text" : "password"}
					required
					name="confirmpassword"
					className="form-control bg-grey borderColor textColor2"
					placeholder="@Password123"
					value={stateData?.confirmPassword}
					onChange={textChange("confirmPassword")}
				/>
				<label htmlFor="confirmpassword">Confirm Password</label>
				<span className="" onClick={() => setTypePass2(!typePass2)}>
					{!typePass2 ? <BsEye /> : <BsEyeSlash />}
				</span>
			</div>
			{userType === "vendor" && (
				<>
					<div className="mb-5 form-floating">
						<select
							name="mobilityAssetType"
							placeholder="Motornin"
							required={userType === "vendor" ? true : false}
							value={stateData?.mobilityAssetType}
							onChange={textChange("mobilityAssetType")}
							className="text-capitalize form-select form-control borderColor textColor2">
							<option value="">Select a Mobility Assess Type</option>
							{vehicleType?.map((item, ind) => (
								<option value={item} key={ind}>
									{item}
								</option>
							))}
							<option value="fleet">fleet</option>
						</select>
						<label htmlFor="mobilityAssetType">Mobility Assess Type</label>
					</div>
					<VendorDocument
						loading={loading}
						stateData={stateData}
						handleSubmit={handleSubmit}
						setImages={handleUploadImage}
					/>
				</>
			)}
			<Buttons
				onClick={handleSubmit}
				loading={loading}
				title={userType === "user" ? "Looks good!" : "submit"}
				css="btn btn-primary1 text-capitalize py-3 w-100 my-4"
			/>
		</>
	);
};

const VendorDocument = ({ stateData, setImages }) => {
	return (
		<>
			<MiniHead title={"drivers license"} />
			<div className="mb-5">
				<input
					type="file"
					name="driverLicense"
					id=""
					onChange={setImages("driverLicense")}
					className="form-control form-control-file borderColor textColor2"
				/>
				{stateData?.driverLicense?.name}
			</div>
			<MiniHead title={"vehicle registration document"} />
			<div className="mb-5">
				<input
					type="file"
					name="vehicle registration document"
					id=""
					onChange={setImages("vehicleRegistration")}
					className="form-control form-control-file borderColor textColor2"
				/>
				{stateData?.vehicleRegistration?.name}
			</div>
			<MiniHead title={"CAC Document"} />
			<div className="mb-5">
				<input
					type="file"
					name="officeFrontView"
					id=""
					onChange={setImages("officeFrontView")}
					className="form-control form-control-file borderColor textColor2"
				/>
				{stateData?.officeFrontView?.name}
			</div>
		</>
	);
};

export let MiniHead = ({ title }) => {
	return (
		<h6 className="my-2 d-flex align-items-center text-uppercase">
			<span className="bg-light d-flex justify-content-center align-items-center me-3 rounded-circle">
				<BsInfo className="text-muted" />
			</span>{" "}
			<span>{title} </span>
		</h6>
	);
};
