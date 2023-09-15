import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import image from "../../Assets/avatar3.png";
import { ModalComponents } from "../../Components/DefaultHeader";

const Riders = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	let [isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		};

	let riderDetails = [
		{ name: "Adaralegbe Ifeoluwa", status: "verified", image },
		{ name: "Adaralegbe Ifeoluwa", status: "unverified", image },
		{ name: "Adaralegbe Ifeoluwa", status: "suspended", image },
		{ name: "Adaralegbe Ifeoluwa", status: "verified", image },
		{ name: "Adaralegbe Ifeoluwa", status: "unverified", image },
		{ name: "Adaralegbe Ifeoluwa", status: "suspended", image },
		{ name: "Adaralegbe Ifeoluwa", status: "verified", image },
		{ name: "Adaralegbe Ifeoluwa", status: "unverified", image },
		{ name: "Adaralegbe Ifeoluwa", status: "suspended", image },
	];

	return (
		<Container className="px-lg-5  pt-3 pt-lg-0">
			<div className="row g-4 mb-3">
				<h3 className="textColor2 col-lg-4 col-6">Total Riders: 250</h3>
				<div className="col-lg-4 order-lg-1 order-2">
					<input
						type="search"
						name="search"
						className="form-control w-100"
						placeholder="type here to search"
					/>
				</div>
				<div className="col-lg-4 col-6 order-lg-2 order-1">
					<button
						type="button"
						onClick={toggle}
						className="btn btn-primary1 text-capitalize py-3 px-5 ms-auto d-block">
						add rider
					</button>
					<ModalComponents
						isOpen={isOpen}
						toggle={toggle}
						title="add new rider">
						<div className="downH2">
							<div className="form-floating mb-3">
								<input
									type="search"
									name="search"
									className="form-control bg-grey"
									placeholder="type here to search"
								/>
								<label htmlFor="search">type here to search</label>
							</div>
							<div className="bg-notify p-2 rounded">
								<span className="d-flex align-items-center">
									<span className="d-none d-md-flex me-3">
										<img
											src={image}
											alt={"rider"}
											style={{
												height: "3rem",
												width: "3rem",
											}}
											className="rounded-circle img-fluid"
										/>
									</span>
									Adaralegbe Ifeoluwa
								</span>
							</div>
						</div>
					</ModalComponents>
				</div>
			</div>
			<div className="my-3 bg-select-2 text-center text-capitalize py-3 text-white rounded fw-600">
				riders
			</div>
			<div>
				<table className="table">
					<thead className="">
						<tr className="thead align-items-center midAlign">
							<th className="ps-lg-5">Name</th>
							<th>status</th>
							<th>notifcation</th>
						</tr>
					</thead>
					<tbody>
						{riderDetails.map((item, index) => (
							<Fragment key={index}>
								<tr className="shadow rounded tr align-items-center midAlign">
									<td className="text-capitalize">
										<Link
											to={`/riders/${index}`}
											className="text-dark text-decoration-none">
											<span className="d-flex align-items-center">
												<span className="d-none d-md-flex me-3">
													<img
														src={item.image}
														alt={item.name}
														style={{
															height: "3rem",
															width: "3rem",
														}}
														className="rounded-circle img-fluid"
													/>
												</span>
												{item.name}
											</span>
										</Link>
									</td>
									<td className="text-capitalize">{item.status}</td>

									<td className="text-capitalize">
										<button className="btn btn-primary1 text-capitalize text-white">
											send notification
										</button>
									</td>
								</tr>
								<tr className="mustSeperate" />
							</Fragment>
						))}
					</tbody>
				</table>
			</div>
		</Container>
	);
};

export default Riders;
