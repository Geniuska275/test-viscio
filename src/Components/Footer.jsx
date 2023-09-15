import React from "react";
import logoLight from "../Assets/logo_light.png";
import { Link } from "react-router-dom";
import {
	FaPhone,
	FaInstagramSquare,
	FaFacebook,
	FaTwitter,
	FaEnvelopeSquare,
	FaMapMarker,
	FaWhatsapp,
} from "react-icons/fa";

export let details = [
	{ icon: <FaPhone />, text: "+2348085546073", type: "tel" },
	{ icon: <FaEnvelopeSquare />, text: "support@visco.com.ng", type: "mail" },
	{
		icon: <FaMapMarker />,
		text: "Polystar 2nd Roundabout, Lekki Phase 1 105102, Lagos",
		type: "address",
	},
];
const Footer = () => {
	let quick = [
		{ name: "Home", url: "/" },
		{ name: "About Us", url: "/about" },
		{ name: "Contact Us", url: "/contact" },
		{ name: "Privacy Policy", url: "/privacy-policy" },
		{ name: "Terms and Conditions", url: "/terms-and-conditions" },
	];

	let resources = [
		{ name: "FAQs", url: "/faqs" },
		{ name: "Become an agent", url: "/become-an-agent" },
	];

	let socials = [
		{ icon: <FaWhatsapp />, url: "https://wa.me/message/QNHCJYN6TSZGG1" },
		{
			icon: <FaInstagramSquare />,
			url: "https://instagram.com/viscio_express?igshid=YmMyMTA2M2Y=",
		},
		{
			icon: <FaFacebook />,
			url: "https://www.facebook.com/profile.php?id=100077522783530",
		},
		{
			icon: <FaTwitter />,
			url: "https://twitter.com/ViscioExpress?t=WwN0_bwU-xC_1Qr0PlIc9A&s=09",
		},
	];

	return (
		<footer className="bg-select-2 p-3">
			<div className="container text-white">
				<div className="footerDiv py-5">
					<div>
						<img src={logoLight} alt="VISCIO" className="logo logo2 mb-5" />
						<div className="d-none d-md-block fontReduceMaxhead">
							We are the #MOVEMENT People Your Trusted Logistics Aggregator
						</div>
					</div>
					<div>
						<h5>Quick Links</h5>
						<ul className="list-group border-0">
							{quick.map((item, index) => (
								<li
									key={index}
									className="list-group-item border-0 bg-transparent">
									<Link
										to={item.url}
										className="text-white text-decoration-none fontReduceMaxhead">
										{item.name}
									</Link>{" "}
								</li>
							))}
						</ul>
					</div>
					<div className="d-none d-md-block">
						<h5>Resources</h5>
						<ul className="list-group border-0">
							{resources.map((item, index) => (
								<li
									key={index}
									className="list-group-item border-0 bg-transparent">
									<Link
										to={item.url}
										className="text-white text-decoration-none fontReduceMaxhead">
										{item.name}
									</Link>{" "}
								</li>
							))}
						</ul>
					</div>
					<div className="d-none d-md-block">
						<h5>Get in Touch</h5>
						<ul className="list-group border-0">
							{details.map((item, index) => (
								<li
									key={index}
									className="list-group-item border-0 bg-transparent text-white d-flex align-items-center">
									{item.icon}
									<p className="ms-3">
										{item?.type === "tel" ? (
											<>
												<a
													className="text-white text-decoration-none fontReduceMaxhead"
													href={`tel:${item?.text}`}>
													{item?.text}
												</a>
											</>
										) : item?.type === "mail" ? (
											<>
												<a
													className="text-white text-decoration-none fontReduceMaxhead"
													href={`mail:${item?.text}`}>
													{item?.text}
												</a>
											</>
										) : item?.type === "address" ? (
											<>
												<a
													className="text-white text-decoration-none fontReduceMaxhead"
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
						<h5>Socials</h5>
						<ul className="list-group border-0 list-group-horizontal">
							{socials.map((item, index) => (
								<li
									key={index}
									className="list-group-item border-0 bg-transparent text-white d-flex align-items-center">
									<a
										className="text-white text-decoration-none fontReduceMaxhead"
										target={"_blank"}
										rel="noreferrer"
										href={item?.url}>
										{item?.icon}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="container d-flex justify-content-center align-items-center">
					<p className="m-0 fontReduce text-center fontReduceMaxhead">
						All rights reserved.
						<span className="mx-1">
							&copy; {`${new Date().getFullYear() !== 2022 ? "2022 - " : ""}`}
							{new Date().getFullYear()}
						</span>
						&nbsp; <span className="d-block d-lg-inline">Viscio Express</span>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
