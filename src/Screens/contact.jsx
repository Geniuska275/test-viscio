import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { details } from "../Components/Footer";
import { Buttons, MiddleHeader } from "../Utils";
import map from "../Assets/Map.png";
import { toast } from "react-toastify";
import axios from "axios";
import { DownloadBanner } from "./home";

const Contact = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	let init = {
			firstName: "",
			lastName: "",
			email: "",
			message: "",
		},
		[stateData, setStateData] = useState(init);

	let [loading, setLoading] = useState(false);

	let handleSubmit = async e => {
		e.preventDefault();
		if (
			!stateData.firstName ||
			!stateData.lastName ||
			!stateData.email ||
			!stateData.message
		) {
			return toast.warn("Please fill out all fields");
		}
		setLoading(true);
		try {
			let res = await axios.post("/users/contact", { ...stateData });
			toast.success(res.data.msg, { autoClose: 5000 });
			setLoading(false);
			setStateData(init);
		} catch (err) {
			toast.error(err?.response ? err?.response?.data?.message : err?.message);
			setLoading(false);
		}
	};

	let textChange =
		name =>
		({ target: { value } }) => {
			setStateData({ ...stateData, [name]: value });
		};

	return (
		<Container className="py-5">
			<section className="py-5">
				<MiddleHeader text={"Contact Us"} />
				<div className="">
					<div className="row g-4 p-5">
						<div
							className="col-md-6 my-auto order-1 order-lg-0 my-5 my-md-auto"
							data-aos="zoom-in">
							<h4>Get in touch today</h4>
							<ul className="list-group border-0">
								{details.map((item, index) => (
									<li
										key={index}
										className="list-group-item border-0 bg-transparent textColor2 d-flex align-items-center">
										{item.icon}
										<p className="ms-3">
											{item?.type === "tel" ? (
												<>
													<a
														className="textColor2 text-decoration-none"
														href={`tel:${item?.text}`}>
														{item?.text}
													</a>
												</>
											) : item?.type === "mail" ? (
												<>
													<a
														className="textColor2 text-decoration-none"
														href={`mail:${item?.text}`}>
														{item?.text}
													</a>
												</>
											) : item?.type === "address" ? (
												<>
													<a
														className="textColor2 text-decoration-none"
														target={"_blank"}
														rel="noreferrer"
														href={`https://www.google.com/maps/place/?q=place_id=${
															details?.[details?.length - 1]?.text
														}`}>
														{item?.text}
													</a>
												</>
											) : (
												<></>
											)}
										</p>
									</li>
								))}
							</ul>
						</div>
						<form
							className="col-md-6 shadow shadow2 rounded py-5 px-4 my-5 my-md-auto"
							data-aos="zoom-in">
							<div className="row mb-4">
								<div className="col-lg-6 mb-3">
									<label htmlFor="firstName" className="textColor2 mb-1 hug">
										Firstname
									</label>
									<input
										type="text"
										className="form-control shadow shadow2 py-3 border-0 hug"
										placeholder="Firstname"
										value={stateData.firstName}
										onChange={textChange("firstName")}
									/>
								</div>
								<div className="col-lg-6 mb-3">
									<label htmlFor="lastName" className="textColor2 mb-1 hug">
										Lastname
									</label>
									<input
										type="text"
										className="form-control shadow shadow2 py-3 border-0 hug"
										placeholder="Lastname"
										value={stateData.lastName}
										onChange={textChange("lastName")}
									/>
								</div>
							</div>
							<div className="mb-4">
								<label htmlFor="email" className="textColor2 mb-1 hug">
									E-mail
								</label>
								<input
									type="email"
									className="form-control shadow shadow2 py-3 border-0 hug"
									placeholder="example@mail.com"
									value={stateData.email}
									onChange={textChange("email")}
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="message" className="textColor2 mb-1 hug">
									Message
								</label>
								<textarea
									className="form-control shadow shadow2 py-3 border-0 hug"
									placeholder="Message"
									style={{ resize: "none", height: "12rem" }}
									value={stateData.message}
									onChange={textChange("message")}
								/>
							</div>
							<Buttons
								onClick={handleSubmit}
								loading={loading}
								title={"Send Message"}
								css="text-decoration-none btn btn-primary1 text-capitalize px-4 hug"
								width="auto"
							/>
						</form>
					</div>
					<div
						data-aos="zoom-in"
						className="mb-5"
						style={{ background: `url(${map})`, height: "80vh" }}></div>
					<div className="d-md-none">
						<DownloadBanner />
					</div>
				</div>
			</section>
		</Container>
	);
};

export default Contact;
