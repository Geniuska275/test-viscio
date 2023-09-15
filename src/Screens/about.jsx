import React, { useEffect } from "react";
import { MiddleHeader } from "../Utils";
import banner from "../Assets/image 2.png";
import banner1 from "../Assets/Rectangle 366.png";
import banner2 from "../Assets/Rectangle 366 (1).png";
import banner3 from "../Assets/Rectangle 366 (2).png";
import banner4 from "../Assets/Rectangle 366 (3).png";
import { DownloadBanner } from "./home";

const About = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<section className="py-5">
			<HeroBanner />
			<AboutServices />
			<AssortedServices />
			<BecomeAgent />
			<DownloadBanner />
		</section>
	);
};

export default About;

const HeroBanner = () => {
	return (
		<section className="container d-flex aboutScreen hero fullOverflow">
			<section className="row container my-auto">
				<div
					className="col-lg-6 h-100 mb-3 mb-lg-auto"
					data-aos="fade-right"
					data-aos-delay="500">
					<img src={banner} alt="Banner" className="h-75 aboutImg  img-fluid" />
				</div>
				<div className="col-lg-6 d-flex h-100">
					<div className="my-auto" data-aos="fade-left">
						<h1 className="textColor2 text5 mb-3">
							We're here because of you.
						</h1>
						<p className="mb-3 fontReduce">
							Viscio is changing the narrative of efficient logistics in Africa
							by offering ease of access to multiple logistics agents anywhere
							and at any time. The African logistics scene is riddled with
							infrastructure gaps, high operating costs and overly fragmented
							activities.
						</p>
						<p className="mb-3 fontReduce">
							Viscio express platform serves as a reliable collaboration tool
							for various logistics agents across multiple locations leveraging
							on technology tools and a smart operations framework.
						</p>
						<p className="mb-3 fontReduce">
							Our commitment is to facilitate movement of packages and cargo
							from point of origin to the destination desired by the user. We
							are creating Africa's largest logistics marketplace and
							collaboration tool across multiple-modal channels.
						</p>
						<p className="mb-3 fontReduce">
							In ensuring that we keep to our promise of safely moving your
							goods from one point to another, we go the extra mile in providing
							end-to-end logistics efficiency by practically closing the
							infrastructure gaps that limit the deployment of our technology
							tools. Our Key Stakeholders: Logistics Agents, Infrastructure
							partners and various courier organizations.
						</p>
					</div>
				</div>
			</section>
		</section>
	);
};

const AboutServices = () => {
	return (
		<section className="py-5 px-lg-5 px-4 mt-4 my-lg-0" data-aos="zoom-in">
			<div className="container">
				<MiddleHeader
					text={"Our Services"}
					css="textCenter"
					css2="justify-content-lg-center justify-content-start"
				/>
				<p className="w-75 text-center textCenter mx-auto mb-5 fullwidth fontReduce full-justify">
					We facilitate movement of packages and cargo from point of origin to
					the destination desired by the user. We do this by leveraging on
					active logistics agents operating different mobility assets like
					Motorcycles (dispatch), Vehicles or Mini-buses and 1-10tons trucks. We
					employ multiple modal-channels in ensuring end to end logistics
					process efficiency.
				</p>
			</div>
		</section>
	);
};

let AssortedServices = () => {
	let services = [
		{
			image: banner1,
			title: "Exclusive Express delivery",
			paragraph:
				"Using our app, users can order for vehicles or motorcycles for exclusive pick-up and delivery of courier packages with no stop overs from pick point to destination.",
		},
		{
			image: banner2,
			title: "Scheduled Delivery",
			paragraph:
				"This is for same day pick up and deliveries (where scheduling must be done between 6am to 9:59am same day) and next-day only pick-up and delivery. Users can choose their preferred pick up time and choice of vehicle for this affordable delivery option.",
		},
		{
			image: banner3,
			title: "Inter-state Delivery",
			paragraph:
				"This is a scheduled service where users can book for pickup of goods for onward door-step delivery to intended recipient in another city.",
		},
		{
			image: banner4,
			title: "Inter-Country delivery",
			paragraph:
				"This affordable delivery option is a special service for movement of goods from one country to the intended recipient in another country.",
		},
	];
	return (
		<div className="container">
			{services.map((item, index) => (
				<div key={index} className="altAbout my-5" data-aos="zoom-in">
					<div className={`rounded ${index % 2 !== 0 ? "order-1" : ""}`}>
						<img
							src={item.image}
							alt={item.title}
							data-aos="zoom-in"
							className="altImg rounded aboutImg order-lg-0"
						/>
					</div>
					<div className="my-auto px-lg-5 pe-3" data-aos="zoom-in">
						<h3
							className="textColor2 mb-3 fw-600 fontReduce"
							data-aos="zoom-in">
							{item.title}
						</h3>
						<p
							className="fontReduce fontReduceMax text-justify"
							data-aos="zoom-in">
							{item.paragraph}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

const BecomeAgent = () => {
	let listItem = [
		`Viscio provides improved market access to a large pool of
						prospective customers.`,
		`For fleet operators, Viscio increases sales prospects and overall
						operational efficiency with access to customized tools. `,
		`Viscio will provide improved visibility and tracking of your
						mobility asset leveraging on our telematics framework To begin,
						download our Viscio Express Driver App and follow the steps below:`,
		`Registration and Otp Verification (with a fully completed profile)`,
		`Prospective Logistics Agents are required to select mobility asset
						type (motorbike, vehicle or truck), year of production, plate number
						and uploads of documents (driver license, vehicle registration
						document and complete )`,
		`Our Quality Assessment Agent will verify/screen your application
						after which you become verified on the Viscio express platform;
						which means you can start receiving requests.`,
		`For complete information about required documents, click here for
						checklist.`,
		`For more information kindly send an email to: support@viscio.com.ng`,
	];

	return (
		<section className="py-5 container" data-aos="zoom-in">
			<MiddleHeader
				text={"Become a logistics agent"}
				css="textCenter"
				css2="justify-content-lg-center justify-content-start"
			/>
			<p
				className="w-75 text-center mx-auto mb-5 fontReduce fullwidth full-justify textCenter"
				data-aos="zoom-in">
				You can truly become your own boss as a Viscio express logistics agent
				whether as an owner of a motorcycle, vehicle or a fleet of mobility
				assets. Viscio is a collaborative tool that depends on logistics agents
				and logistics infrastructure partners. As our logistics agent you can
				earn by fulfilling logistics requests in any of the cities we operate.
			</p>
			<div data-aos="zoom-in">
				<h6 className="text-decoration-underline text-black">
					Benefits our Logistics Agent Enjoy
				</h6>
				<ul className="" data-aos="zoom-in">
					{listItem.map((item, index) => (
						<li key={index} className="py-1 fontReduce" data-aos="zoom-in">
							{item}
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};
