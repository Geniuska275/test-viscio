import React, { useEffect, useState } from "react";
import banner from "../Assets/image-removebg-preview 1.png";
import { Buttons, MiddleHeader } from "../Utils";
import appstore from "../Assets/playstore.8e81f6ab.png";
import playstore from "../Assets/appstore.d34b0b35.png";
import phoneTab from "../Assets/image 1 (1).png";
import image from "../Assets/avatar3.png";
import { Link } from "react-router-dom";
import "../Styles/AuthStyles.css";
import { OrderStatus } from "../Components/Orders";
import { useContext } from "react";
import { GlobalState } from "../Data/Context";
import Slider from "../Carousel/Slider";

const Home = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<main>
			<HeroBanner />
			<Procedure />
			<HowItWorks />
			<DownloadBanner />
			<OurCoverage />
			<WhatOurCustomerSays />
		</main>
	);
};

export default Home;

const HeroBanner = () => {
	const { getTrackOrder, orders } = useContext(GlobalState),
		[trackingID, setTrackingID] = useState(""),
		[isOpen, setIsOpen] = useState(false),
		[submit, setSubmit] = useState(null),
		toggle = () => {
			setSubmit(false);
			setTrackingID("");
			setIsOpen(false);
		};

	let handleSubmit = async e => {
		e.preventDefault();
		if (!trackingID) return;
		await getTrackOrder(trackingID);
		setSubmit(true);
	};

	useEffect(() => {
		if (orders?.track_order && submit) {
			setIsOpen(true);
			setSubmit(false);
		}
		return () => setSubmit(false);
	}, [orders?.track_order, submit]);

	return (
		<section className="container aboutScreen d-flex hero fullOverflow">
			<section className="row container my-auto">
				<div className="col-lg-6 d-flex h-100 my-auto">
					<div className="my-auto" data-aos="fade-right">
						<h1 className="textColor2 text5 mb-3 mainText">
							Deliver Package with Viscio Express
						</h1>
						<p className="w-75 mb-2 fontReduce fontReduceMaxhead">
							Viscio express is a Reliable Logistics B2C & B2B platform that
							ensures safe delivery of your parcel(s) in real time. A tracking
							ID is attached on all orders, to keep sync with movement of your
							parcel(s).
						</p>
						<div className="d-flex border rounded borderColor p-2 w-75">
							<input
								type="text"
								className="border-0 form-control w-100"
								placeholder="Input tracking ID"
								value={trackingID}
								onChange={e => setTrackingID(e.target.value)}
							/>
							<Buttons
								onClick={handleSubmit}
								loading={orders?.track_loading}
								css="btn btn-primary1 px-4 py-2 text-capitalize"
								title="track"
								width={"auto"}
							/>
							<OrderStatus
								isOpen={isOpen}
								toggle={toggle}
								data={orders?.track_order}
							/>
						</div>
					</div>
				</div>
				<div
					className="col-lg-6 h-100 my-auto"
					// data-aos="fade-left"
					// data-aos-delay="500"
					>
					{/* <img src={banner} alt="Banner" className=" img-fluid" /> */}
					<Slider/>
				</div>
			</section>
		</section>
	);
};

const Procedure = () => {
	let values = [
		{
			title: "price checker",
			paragraph: `Check estimated price of delivery`,
		},
		{
			title: "create order",
			paragraph: `Make a logistics order`,
		},
		{
			title: "fulfil order",
			paragraph: `Fulfil a logistics order as a certified logistics operator.`,
		},
	];
	return (
		<section className="mt-lg-5 mt-3">
			<div className="container">
				<MiddleHeader
					text={"what you can do with viscio?"}
					css="textCenter"
					css2="justify-content-lg-center justify-content-start"
				/>
			</div>
			<div className="borderDash my-lg-5 my-3 mb-5">
				<div className="container row g-lg-5 mx-auto">
					{values.map((item, index) => (
						<div
							className="position-relative topTransition col-md-4"
							key={index}>
							<div className="borderDash2"></div>
							<div className="position-absolute midTransition text-center">
								{index + 1}
							</div>
							<div className="text-center textCenter ms-5 ms-md-0 py-md-5 pt-0 px-lg-3 pb-3">
								<Link to={`/login`} className=" text-decoration-none text-dark">
									<h4 className="py-2 mb-0 mb-md-auto text-capitalize textDefault">
										{item.title}
									</h4>
									<p className="m-0 textTrunc textTrunc5 pb-3 pb-lg-0 fontReduceMax w50">
										{item.paragraph}
									</p>
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

const HowItWorks = () => {
	let values = [
		{
			paragraph: `We simply connect you to pre-screened and active logistics agents that match your cargo movement requirements and location.`,
		},
		{
			paragraph: `Our systems ensure your goods are moved from point of receipt to your desired destination on-time.`,
		},
		{
			paragraph: `Our processes are secure, insured, and transparent and we guarantee end-to-end logistics efficiency.`,
		},
	];
	return (
		<section className="mt-lg-5 mt-3 mb-5">
			<div className="container">
				<MiddleHeader text={"how it works"} />
				<div className="row g-lg-5 g-3 mx-auto">
					{values.map((item, index) => (
						<div className="col-md-4" key={index}>
							<div className="text-center py-lg-5 py-2 py-md-3 px-lg-3">
								<p className="textTrunc textTrunc5 fontReduceMax">
									{item.paragraph}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export const DownloadBanner = () => {
	return (
		<section
			className="container mainDownH d-flex flex-column mainDownH2"
			data-aos="zoom-in">
			<section className="bg-select-2 p-4 rounded downH text-white d-flex position-relative my-auto bigBox pb-1 pb-md-4 mainDownH3">
				<div className="abs1 abs2"></div>
				<div className="abs1 abs2"></div>
				<div className="abs1 abs2"></div>
				<div className="abs3"></div>
				<div className="abs3"></div>
				<div className="abs3"></div>
				<div className="my-auto container downLoadDown">
					<h2 data-aos="fade-right" data-aos-delay="1000" className="text2">
						Download Viscio Express
					</h2>
					<p className="fw-100 fontReduce">
						To Send your packgage and Become a driver
					</p>
					<div className="downCover">
						<a
							href="https://apps.apple.com/us/app/viscio/id1591767811"
							target="_blank"
							rel="noopener noreferrer">
							<img
								src={appstore}
								alt="Apple playstore"
								width={"100"}
								className="mx-2"
							/>
						</a>
						<a
							href="https://play.google.com/store/apps/details?id=ng.com.viscio.viscio"
							target="_blank"
							rel="noopener noreferrer">
							<img
								src={playstore}
								alt="Google appstore"
								width={"100"}
								className="mx-2"
							/>
						</a>
					</div>
				</div>
				<img
					src={phoneTab}
					alt="Phone map"
					className="position-absolute phoneTab"
				/>
			</section>
		</section>
	);
};

const OurCoverage = () => {
	let cities2 = [
		{ state: "Lagos", city: "" },
		{ state: "Abuja", city: "Utako, Maraba, Nyanya, Gwagalada, Jabi" },
		{ state: "Rivers", city: "Port-Harcourt" },
		{ state: "Abia", city: "Umuahia" },
		{ state: "Adamawa", city: "Yola" },
		{ state: "Akwa Ibom", city: "Uyo, Ikot Ekpene, Abak" },
		{ state: "Anambra", city: "Onitsha, Akwa, Nnewi" },
		{ state: "Bayelsa", city: "Yenegoa" },
		{ state: "Benue", city: "Markudi, Gboko" },
		{ state: "Bauchi", city: "" },
		{ state: "Borno", city: "" },
		{ state: "Cross-river", city: "Calabar" },
		{ state: "Delta", city: "Warri, Asaba, Ughelli, Sapele" },
		{ state: "Ebonyi", city: "Abakiliki, Afikpo" },
		{ state: "Edo", city: "Benin, Auchi" },
		{ state: "Ekiti", city: "Ado-Ekiti" },
		{
			state: "Enugu",
			city: "Nsukka, Enugu",
			sub: (
				<span>
					9<sup>th</sup> mile
				</span>
			),
		},
		{ state: "Gombe", city: "" },
		{ state: "Imo", city: "Orlu, Owerri, Okigwe, Mbiase" },
		{ state: "Jigawa", city: "Dutse" },
		{ state: "Kaduna", city: "Kaduna, Zaria" },
		{ state: "Kano", city: "" },
		{ state: "Kebbi", city: "Benin Kebbi" },
		{ state: "Kogi", city: "Lokoja, Okene" },
		{ state: "Kwara", city: "Ilorin" },
		{ state: "Niger", city: "Minna" },
		{ state: "Ogun", city: "Abeoukuta, Mowe, Shagamu, Ifo" },
		{ state: "Ondo", city: "Akure" },
		{ state: "Osun", city: "Ife, Oshogbo" },
		{ state: "Oyo", city: "Ogbomoso, Ibadan" },
		{ state: "Plateau", city: "Jos" },
		{ state: "Sokoto", city: "Sokoto" },
		{ state: "Taraba", city: "Jalingo" },
		{ state: "Yobe", city: "" },
		{ state: "Zamfara", city: "" },
	];
	return (
		<section className="py-5 container covercities">
			<MiddleHeader text={"Our Coverage Cities"} />
			<p className="w-75 text-center mx-auto mb-5 fullwidth fontReduceMax">
				Our commitment to serve you constantly propels us to enlarge our
				coverage locations to ensure efficient service delivery and proximity to
				our priority channels. Our model affords us ease of spreading our reach
				efficiently as a super logistics aggregator.
			</p>
			<div className="marqueeformat d-flex align-items-center flex-grow">
				{cities2.map((item, index) => (
					<div
						key={index}
						className="btn btn-light rounded-pill px-4 py-2 mx-3">
						<strong>
							{item?.state} {item?.city ? ": " : ""}
						</strong>{" "}
						<span>
							{item?.city} {item?.sub && item?.sub}
						</span>
					</div>
				))}
			</div>
		</section>
	);
};

const WhatOurCustomerSays = () => {
	let testimonies = [
		{
			image,
			name: "Zinny's outfit",
			comment: `Has been my go-to zone for logistics and i have never been disappointed.`,
		},
		{
			image,
			name: "Mrs Eki",
			comment: `Love the fact that i have access to numerous offers and can negotiate.`,
		},
		{
			image,
			name: "Esthy Collections",
			comment: `Don't worry, i'm stuck here and never leaving`,
		},
		{
			image,
			name: "Mr Oluwatobi",
			comment: `Happy about the speed of delivery and support team availability.`,
		},
		{
			image,
			name: "Ademola Ajala",
			comment: `One of the most functional and detailed website I have seen in a while.`,
		},
		{
			image,
			name: "Zoe Fashion Hub",
			comment: `This will really save a lot of us small business owners from Logistics people wahala. At least we can hold them accountable now.`,
		},
		{
			image,
			name: "Ifeoluwa",
			comment: `This is fantastic, Thanks for the simplicity and the ease of use`,
		},
	];

	return (
		<section className="py-5" data-aos="zoom-in">
			<div className="container">
				<MiddleHeader text={"What our customers say"} />
				<p
					className="w-75 text-center mx-auto mb-5 fullwidth"
					data-aos="zoom-in">
					Take a dive into the reviews of what our user have to say about their
					experience at with Viscio Express
				</p>
			</div>
			<section className="mainGoal" data-aos="zoom-in">
				<div className="ourGoal ps-5" data-aos="zoom-in">
					{testimonies.map((item, index) => (
						<div
							data-aos="zoom-in"
							className="shadow rounded bg-white p-lg-3 py-3 offerBox mx-3 my-5"
							key={index}>
							<img
								data-aos="zoom-in"
								src={item.image}
								alt={`Testifier ${item.name}`}
								className="img-fluid imgTestimony"
							/>
							<p
								className="w-75 mx-auto textTrunc textTrunc3 fontReduce2 my-3"
								data-aos="zoom-in">
								{item.comment}
							</p>
							<div className="my-2 border-top w-25 mx-auto borderColor"></div>
							<h6 data-aos="zoom-in">{item.name}</h6>
						</div>
					))}
				</div>
			</section>
		</section>
	);
};
