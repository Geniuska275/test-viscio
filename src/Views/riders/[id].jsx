import React, { useEffect } from "react";
import { Container } from "reactstrap";
import user from "../../Assets/avatar3.png";
import app from "../../Data/Counties";

const SingleRider = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	let folders = [
		"Driver License",
		"Car Document",
		"Medical Clearance",
		"Qulity Check",
	];
	return (
		<Container className="px-lg-5  pt-3 pt-lg-0">
			<div className="row g-4">
				<div className="col-lg-6">
					<div className="mx-auto">
						<img
							src={user}
							alt={"User"}
							style={{
								height: "15rem",
								width: "15rem",
							}}
							className="rounded-circle img-fluid mx-auto"
						/>
					</div>
				</div>
				<form className="col-lg-6">
					<div className="w-75">
						<div className="btn-group w-100 mb-4">
							<button
								type="button"
								className="btn btn-success2 text-capitalize w-50 py-3">
								Active
							</button>
							<button
								type="button"
								className="btn btn-primary1 text-capitalize py-3 w-50">
								send notification
							</button>
						</div>
						<div className="form-floating mb-4">
							<input
								type="email"
								required
								name="email"
								className="form-control bg-grey borderColor textColor2"
								placeholder="Email"
							/>
							<label className="textColor2" htmlFor="email">
								Email
							</label>
						</div>
						<div className="form-floating mb-4">
							<input
								type="text"
								required
								name="fullname"
								className="form-control bg-grey borderColor textColor2"
								placeholder="Fullname"
							/>
							<label className="textColor2" htmlFor="fullname">
								Fullname
							</label>
						</div>
						<div className="mb-3">
							<div className="input-group mt-3 borderColor">
								<div className="input-group-prepend borderColor">
									<div className="input-group-text bg-grey borderColor">
										<select
											name="dailing_code"
											id="dailing_code"
											value={"+234"}
											className="form-control form-select bg-grey border-0 borderColor textColor2">
											{app.map((item, index) => (
												<option value={item.dial_code} key={index}>
													{item.code} {item.dial_code}
												</option>
											))}
										</select>
									</div>
								</div>
								<input
									type="tel"
									name="telephone"
									className="form-control  bg-grey borderColor textColor2"
									placeholder="813 537 3695"
								/>
							</div>
						</div>
						<div className="form-floating mb-4">
							<input
								type="date"
								required
								name="date of birth"
								className="form-control bg-grey borderColor textColor2"
								placeholder="Date of birth"
							/>
							<label
								className="textColor2 text-capitalize"
								htmlFor="date of birth">
								date of birth
							</label>
						</div>
						<div className="form-floating mb-4">
							<input
								type="text"
								required
								name="Delivery mode"
								className="form-control bg-grey borderColor textColor2"
								placeholder="Delivery mode"
							/>
							<label className="textColor2" htmlFor="Delivery mode">
								Delivery mode
							</label>
						</div>
						<div className="form-floating mb-4">
							<input
								type="number"
								required
								name="Vehicle number"
								className="form-control bg-grey borderColor textColor2"
								placeholder="Vehicle number"
							/>
							<label className="textColor2" htmlFor="Vehicle number">
								Vehicle number
							</label>
						</div>
						<div className="form-floating mb-4">
							<input
								type="number"
								required
								name="Vehicle year"
								className="form-control bg-grey borderColor textColor2"
								placeholder="Vehicle year"
							/>
							<label className="textColor2" htmlFor="Vehicle year">
								Vehicle year
							</label>
						</div>
					</div>
				</form>
			</div>
			<div className="row g-4 py-5">
				{folders.map((item, index) => (
					<div className="col-6 col-lg-3" key={index}>
						<div
							className="rounded bg-grey"
							style={{
								height: "15rem",
								width: "15rem",
							}}></div>
						<p className="pt-3 text-center text-capitalize">{item}</p>
					</div>
				))}
			</div>
		</Container>
	);
};

export default SingleRider;
