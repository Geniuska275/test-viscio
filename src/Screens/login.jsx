import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { BsArrowLeft, BsEye, BsEyeSlash } from "react-icons/bs";
import { GlobalState } from "../Data/Context";
import { Buttons } from "../Utils";
import AccountVerification, { PhoneVerify } from "../Components/PasswordReset";

const Login = () => {
	const { auth, loginUser } = useContext(GlobalState);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	let [typePass, setTypePass] = useState(false),
		init = {
			username: "",
			password: "",
		},
		[stateData, setStateData] = useState(init),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		navigate = useNavigate(),
		textChange =
			name =>
			({ target: { value } }) => {
				setStateData({ ...stateData, [name]: value });
			},
		[isOpen, setIsOpen] = useState(false),
		[isOpen2, setIsOpen2] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		},
		toggle2 = () => {
			setIsOpen2(!isOpen2);
		};

	let handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		await loginUser(stateData);
		setLoading(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && auth?.isLoggedIn) {
			setSubmit(false);
			navigate("/");
			setStateData(init);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, auth?.isLoggedIn]);

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
						<h3 className="textColor2 text-capitalize">Sign in</h3>
						<small className="mb-4 d-block">Enter your email address </small>
						<form>
							<div className="form-floating mb-3">
								<input
									type="email"
									required
									name="email"
									className="form-control bg-grey borderColor textColor2"
									placeholder="example@mail.com"
									value={stateData.username}
									onChange={textChange("username")}
								/>
								<label htmlFor="email">Email</label>
							</div>
							<div className="form-floating mb-3 show-hide position-relative">
								<input
									type={typePass ? "text" : "password"}
									required
									name="password"
									className="form-control bg-grey borderColor textColor2"
									placeholder="@Password123"
									value={stateData.password}
									onChange={textChange("password")}
								/>
								<label htmlFor="Password">Password</label>
								<span className="" onClick={() => setTypePass(!typePass)}>
									{!typePass ? <BsEye /> : <BsEyeSlash />}
								</span>
							</div>
							<p className="my-4">
								Forgot my login details{" "}
								<Link
									to={`/forget-password`}
									className="text-decoration-none textColor2 fw-600">
									Get help signing in
								</Link>{" "}
							</p>
							<Buttons
								onClick={handleSubmit}
								loading={loading}
								title={"submit"}
								css="btn btn-primary1 text-capitalize py-3 w-100 my-4"
							/>
							<div className="text-center my-3">
								<Link
									to={`/register`}
									className="text-decoration-none text-dark fw-600 text-center">
									Create an account
									<BsArrowLeft className="textColor2 ms-3" />{" "}
								</Link>
							</div>
							<div className="my-3 d-flex align-items-center justify-content-between">
								<button
									type="button"
									className="btn text-capitalize"
									onClick={toggle}>
									verify mail
								</button>
								{/* <button
									type="button"
									className="btn text-capitalize"
									onClick={toggle2}>
									verify telephone
								</button> */}
							</div>
						</form>
					</Container>
				</div>
			</section>
			<AccountVerification
				isOpen={isOpen}
				toggle={toggle}
				type="verification"
				email={stateData?.email}
			/>
			<PhoneVerify isOpen={isOpen2} toggle={toggle2} />
		</Container>
	);
};

export default Login;
