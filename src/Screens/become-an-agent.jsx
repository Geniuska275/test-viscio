import React, { useEffect } from "react";
import { MiddleHeader } from "../Utils";
import { Container } from "reactstrap";

const BecomeAnAgent = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	let becomeEnjoy = [
			`Viscio provides improved market access to a large pool of prospective customers.`,
			`For fleet operators, Viscio increases sales prospects and overall operational efficiency with access to customized tools.`,
			`Viscio will provide improved visibility and tracking of your mobility asset leveraging on our telematics framework`,
		],
		becomeEnjoy2 = [
			`Registration and Otp Verification (with a fully completed profile)`,
			`Prospective Logistics Agents are required to select mobility asset type (motorbike, vehicle or truck), year of production, plate number and uploads of documents (driver license, vehicle registration document and complete )`,
			`Our Quality Assessment Agent will verify/screen your application after which you become verified on the Viscio express platform; which means you can start receiving requests.`,
			`For complete information about required documents, click here for checklist.`,
			`For more information kindly send an email to: support@viscio.com.ng`,
		];

	return (
		<Container className="py-5">
			<section className="py-5" data-aos="zoom-in">
				<MiddleHeader text={"Become a logistics agent"} />
				<p className="mx-auto mb-5">
					You can truly become your own boss as a Viscio express logistics agent
					whether as an owner of a motorcycle, vehicle or a fleet of mobility
					assets. Viscio is a collaborative tool that depends on logistics
					agents and logistics infrastructure partners. As our logistics agent
					you can earn by fulfilling logistics requests in any of the cities we
					operate.
				</p>
				<div className="py-4" data-aos="zoom-in">
					<h6>Benefits our Logistics Agent Enjoy</h6>
					<ol className="">
						{becomeEnjoy.map((item, index) => (
							<li key={index} className="py-1">
								{item}
							</li>
						))}
					</ol>
				</div>
				<div className="py-4" data-aos="zoom-in">
					<h6>
						To begin, sign up as a vendor on our website or download our Viscio
						Express Driver App and follow the steps below:
					</h6>
					<ol className="">
						{becomeEnjoy2.map((item, index) => (
							<li key={index} className="py-1">
								{item}
							</li>
						))}
					</ol>
				</div>
			</section>
		</Container>
	);
};

export default BecomeAnAgent;
