import React, { useEffect } from "react";
import { Container } from "reactstrap";
import { MiddleHeader } from "../Utils";

const Faqs = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	let frequentlyAsked = [
		{
			summary: "What is Viscio?",
			details:
				"Viscio express practically leverages on the domain strengths of various logistics agents and niche courier companies across Africa. With the simple convenience of a smartphone, we have smartly eliminated traditional logistics operations barriers that make movement of goods from one point to another in Africa seem like rocket science. Our operational model, harmonized with our deployed technology tools enables us to seamlessly address your logistics needs affordably, reliably and with utmost peace of mind.",
		},
		{
			summary: "How to make a delivery order",
			details:
				"Simply download the Viscio express app and register, then proceed to select type of transaction (city or intercity); then provide required details and available agents will be matched with your request in real time.",
		},
		{
			summary: "How do i make payment?",
			details:
				"Payment is required on the app before you are matched with any logistics agent, however, this payment is captured in our escrow system and logistics agents only get paid after successful completion of your delivery. Our payment channels are secure and safe.",
		},
		{
			summary: "How safe are my goods to be delivered?",
			details:
				"Viscio is fully committed to ensuring seamless and safe movement of goods from pickup to destination. Our platform ensures transparency of goods in-transit by prescreened logistics agents via our mapping systems and telematics framework. In addition to this, Viscio ensures end-to-end operational efficiency in all our logistics transactions which are fully insured (by our NAICOM licensed provider) and smartly tracked.",
		},
		{
			summary: "How can i become a logistics agent",
			details:
				"You can begin the amazing journey of becoming your own boss by earning on the Viscio platform when you fulfill delivery requests as our logistics agent. All that is simply required are your personal details and details of your mobility asset. Follow the link and learn more about our criteria and on-boarding process.",
		},
	];

	return (
		<Container className="py-5 minFullHeight">
			<section className="py-5">
				<MiddleHeader text={"Frequently Asked Questions"} />
				<div className="accordion">
					{frequentlyAsked.map((item, index) => (
						<div
							key={index}
							data-aos="zoom-in"
							className="bg-white shadow borderColor borderColor2 borderColor3 p-4 text-capitalize my-5 myCursor accordion-item">
							<div
								className="accordion-header accordion-button bg-white border-0 textColor2 fw-600"
								data-bs-toggle="collapse"
								data-bs-target={`#collapse${index}`}
								aria-expanded="true"
								aria-controls={`collapse${index}`}>
								{item.summary}
							</div>
							<div
								id={`collapse${index}`}
								className="accordion-collapse collapse py-3 border-0"
								aria-labelledby="headingOne">
								<div className="accordion-body">{item.details}</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</Container>
	);
};

export default Faqs;
