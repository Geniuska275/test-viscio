import React, { useEffect } from "react";
import { MiddleHeader } from "../Utils";
import { Container } from "reactstrap";

const PrivacyPolicy = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	let definition = [
			{
				tag: `"Parties"`,
				detail: `means both You and the operator of the Application: Viscio Technologies LTD.`,
			},
			{
				tag: `"Operator"`,
				detail: `means the owner, publisher and administrator of the Application.`,
			},
			{
				tag: `"Personal Data"`,
				detail: `means any personal information collected for You in relation with your use of this service which is capable of identifying You.`,
			},
			{
				tag: `"Service"`,
				detail: `means the application, which is known as: Viscio Express including all pages, sub pages, all blogs, forums and other connected internet content whatsoever.`,
			},
			{
				tag: `"Services"`,
				detail: `means these terms and conditions.`,
			},
			{
				tag: `"You, Yours"`,
				detail: `means the user of this Application.`,
			},
		],
		introduction = [
			`This Privacy Policy is designed to inform You about the Personal Data we collect, how we collect this data, the uses of the data, and Your rights relating to the Personal Data when You use this Service or purchase the Services offered on the Application.`,
			`We are committed to protecting your Personal Data while You use this Application.`,
			`By continuing to use our Application, You acknowledge that You have reviewed the Privacy Policy and agree to its terms. This also means that You have consented to the use of Your Personal Data and have accepted the applicable disclosures.`,
		],
		prohibit1 = [
			`Full name`,
			`Email address`,
			`Phone number`,
			`Date of birth`,
			`Gender`,
		],
		prohibit2 = [
			`Your interaction with our representatives;`,
			`receiving notifications by text message or email about marketing;`,
			`receiving general emails from us.`,
			`commenting on our Content on our Application.`,
			`the purchases You make.`,
		],
		logData = [
			`the domain and host from which You access the Application;`,
			`name of the Internet Service Provider (ISP);`,
			`date and time of visit;`,
			`Your computer operating system and browser software;`,
			`Your Internet Protocol (IP) address.`,
		],
		purpose = [
			`to provide our Service and to maintain and make improvements to the Service we provide to You;`,
			`to develop new Services on the Application;`,
			`to provide personalized Service to You, including making recommendations and providing personalized content;`,
			`to provide customer service to You;`,
			`to provide You with updates on the Application and related items;`,
			`to provide analytics to understand how our Service is used.`,
		];

	return (
		<Container className="py-5">
			<section className="py-5" data-aos="zoom-in">
				<MiddleHeader text={"Privacy Policy"} />
				<div className="py-4" data-aos="zoom-in">
					<h6 className="fw-600 text-uppercase">
						Effective date: August 18, 2021
					</h6>
					<small>Applicable to: Viscio Express</small>
				</div>
				<ol data-aos="zoom-in">
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600 text-uppercase">Definitions</h6>
						<ul data-aos="zoom-in">
							{definition.map((item, index) => (
								<li key={index} className="my-1 fontReduce" data-aos="zoom-in">
									<span>
										<span className="fw-600">
											<strong>{item.tag}:</strong>
										</span>{" "}
										{item.detail}
									</span>
								</li>
							))}
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600 text-uppercase">Introduction</h6>
						<ul data-aos="zoom-in">
							{introduction.map((item, index) => (
								<li
									key={index}
									className="my-1 list-group-item"
									data-aos="zoom-in">
									{item}
								</li>
							))}
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600 text-uppercase">
							THE PERSONAL DATA WE COLLECT FROM YOU
						</h6>
						<ul data-aos="zoom-in">
							<li className="my-1 fontReduce" data-aos="zoom-in">
								We collect various information to enable us provide good Service
								to all our users. Depending on how our Service will be used, the
								different types of Personal Data we collect are as follows:
							</li>
							<li className="my-1 fontReduce" data-aos="zoom-in">
								For registered users: During the process of Your registration we
								may collect the following information:
								<ol className="listStyleRoman" data-aos="zoom-in">
									{prohibit1.map((item, index) => (
										<li
											key={index}
											className="my-1 fontReduce "
											data-aos="zoom-in">
											{item}
										</li>
									))}
								</ol>
							</li>
							<li data-aos="zoom-in">
								We may also require other information in relation to:
								<ol className="listStyleRoman">
									{prohibit2.map((item, index) => (
										<li
											key={index}
											className="my-1 fontReduce "
											data-aos="zoom-in">
											{item}
										</li>
									))}
								</ol>
							</li>
							<li data-aos="zoom-in">
								For unregistered users: We will collect passive information from
								all registered and unregistered users. These information include
								cookies, IP address information, location information and
								certain browser information.
							</li>
							<li data-aos="zoom-in">
								User Experience: From time to time we may also request certain
								Personal Data that may be necessary to improve our Service and
								the Services we offer for sale on the Application.
							</li>
							<li data-aos="zoom-in">
								By using this Application and agreeing to these Terms, You
								represent and warrant that You have the legal capacity to accept
								these Terms.
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600 text-uppercase">
							THE PERSONAL DATA WE COLLECT AS YOU USE OUR SERVICE
						</h6>
						<ul data-aos="zoom-in">
							<li data-aos="zoom-in">
								We use the following to collect Personal Data from You:
							</li>
							<li data-aos="zoom-in">
								<span>
									<span className="fw-600">
										<strong>Log Data:</strong>
									</span>{" "}
									We also use log files which store automatic information
									collected when users visit this Application. The log data
									which may be collected are as follows:
								</span>
								<ul data-aos="zoom-in">
									{logData.map((item, index) => (
										<li key={index} className="my-1" data-aos="zoom-in">
											{item}
										</li>
									))}
								</ul>
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600 text-uppercase">
							PURPOSE OF PROCESSING PERSONAL DATA
						</h6>
						<ul data-aos="zoom-in">
							<li data-aos="zoom-in">
								We collect and use Your Personal Data for the following reasons:
								<ul data-aos="zoom-in">
									{purpose.map((item, index) => (
										<li key={index} className="my-1" data-aos="zoom-in">
											{item}
										</li>
									))}
								</ul>
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600 text-uppercase">STORAGE OF PERSONAL DATA</h6>
						<ul data-aos="zoom-in">
							<li className="list-group-item" data-aos="zoom-in">
								We take the security of the Personal Data we collect very
								seriously, and we take reasonable measures to reduce the risk of
								accidental destruction, loss or unauthorized access to such
								information. However, please note that no system involving the
								transmission of information via electronic storage systems or
								the internet is completely secure.
							</li>
							<li className="list-group-item" data-aos="zoom-in">
								The Personal Data and any other information we have about You
								may be stored for such period as we may determine until You
								terminate Your account with us or You withdraw Your consent.
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600 text-uppercase">
							PROTECTION OF PERSONAL DATA
						</h6>
						<ul data-aos="zoom-in">
							<li className="list-group-item" data-aos="zoom-in">
								Our Service is built with strong security features that
								continuously protects Your Personal Data. Our security features
								help us detect and block security threats. If we detect any
								security risk, we may inform You and guide You through steps to
								stay protected.
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600 text-uppercase">
							DISCLOSURE OF PERSONAL DATA
						</h6>
						<p>
							We do not disclose Your Personal Data except for any of the
							following reasons:
						</p>
						<ul data-aos="zoom-in">
							<li data-aos="zoom-in">
								if You have granted us the permission to do so: We will disclose
								Your Personal Data where we have received Your unequivocal
								consent and permission to do so. However, such consent may be
								withdrawn at anytime;
							</li>
							<li data-aos="zoom-in">
								for the purposes of processing Your Personal Data: We may
								disclose Your Personal Data to our affiliates and other trusted
								businesses or persons for the purpose of processing Your
								Personal Data for us, based on our instruction and in compliance
								with our Privacy Policy;
							</li>
							<li data-aos="zoom-in">
								if we are required to do so by an existing law or regulation: We
								may also disclose and share Your Personal Data for the following
								reasons:
							</li>
							<ol data-aos="zoom-in">
								<li data-aos="zoom-in">
									to meet any applicable law, regulation, legal process, or any
									legal request, such as subpoenas, court orders, requests for
									administrative or government bodies;
								</li>
								<li data-aos="zoom-in">
									to enforce our applicable Terms of Use;
								</li>
								<li data-aos="zoom-in">
									to detect, prevent, or address any fraud, security or
									technical issues;
								</li>
								<li data-aos="zoom-in">
									to prosecute or bring any legal action against any user who
									has violated any law or our Terms of Use.
								</li>
							</ol>
							<li data-aos="zoom-in">
								For any other other reason that may be necessary for the
								operation of our Application.
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600 text-uppercase">
							ACCESSING, MODIFYING AND DELETING YOUR PERSONAL DATA
						</h6>
						<ul data-aos="zoom-in">
							<li className="list-group-item" data-aos="zoom-in">
								If you wish to access, review, modify any information we have
								about You, You may do so by editing your profile on Viscio
								Express or simply contacting us on the following email address:
								<strong>
									<a
										href="mailto:admin@viscio.com.ng"
										className="text-decoration-none ms-2">
										admin@viscio.com.ng
									</a>
								</strong>
							</li>
							<li data-aos="zoom-in">
								You may also delete any information belonging to you that we
								have stored by simply deactivating your account or request that
								we delete any information belonging to You that we have stored
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600 text-uppercase">YOUR RIGHTS</h6>
						<p>Your rights in relation to Your Personal Data are as follows:</p>
						<ul data-aos="zoom-in">
							<li data-aos="zoom-in">
								the right to have access to Your Personal Data;
							</li>
							<li data-aos="zoom-in">
								the right to be informed about the processing of Your Personal
								Data;
							</li>
							<li data-aos="zoom-in">
								the right to rectify any inaccurate Personal Data or any
								information about You;
							</li>
							<li data-aos="zoom-in">
								the right to review, modify or erase Your Personal Data and any
								other information we have about You;
							</li>
							<li data-aos="zoom-in">
								the right to restrict the processing of Your Personal Data;
							</li>
							<li data-aos="zoom-in">
								the right to block Personal Data processing in violation of any
								law;
							</li>
							<li data-aos="zoom-in">
								the right to be informed about any rectification or erasure of
								Personal Data or restriction of any processing carried out;
							</li>
							<li data-aos="zoom-in">
								the right to the portability of Your Personal Data; and
							</li>
							<li data-aos="zoom-in">
								the right to lodge a complaint to a supervisory authority within
								Nigeria.
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600 text-uppercase">CONTACT INFORMATION</h6>
						<ul data-aos="zoom-in">
							<li className="list-group-item" data-aos="zoom-in">
								If You have any questions regarding this Privacy Policy or the
								Personal Data we collect, or if You wish to make any comments,
								enquires, complaints or feedback about anything related to this
								Privacy Policy, please contact us at the following email
								address:
								<strong>
									<a
										href="mailto:admin@viscio.com.ng"
										className="text-decoration-none ms-2">
										admin@viscio.com.ng
									</a>
								</strong>
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600 text-uppercase">
							REVISIONS AND MODIFICATIONS
						</h6>
						<ul data-aos="zoom-in">
							<li className="list-group-item" data-aos="zoom-in">
								We reserve the right to modify and revise this Privacy Policy
								from time to time without Your explicit consent. If we make any
								fundamental change, we will notify You and obtain Your consent
								to the revised version.
							</li>
						</ul>
					</li>
				</ol>
			</section>
		</Container>
	);
};

export default PrivacyPolicy;
