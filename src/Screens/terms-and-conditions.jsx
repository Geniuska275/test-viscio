import React, { useEffect } from "react";
import { MiddleHeader } from "../Utils";
import { Container } from "reactstrap";

const TermsAndConditions = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	let definition = [
			{
				tag: `"Parties"`,
				detail: `means both You (the user of the Service) and the Owner of this Service.`,
			},
			{
				tag: `"Content"`,
				detail: `means any content, writing, images, audiovisual content or other information published on this Service.`,
			},
			{
				tag: `"Your Content"`,
				detail: `means any audio, video, text, images or other material You choose to display on this Application subject to the restrictions provided in this Agreement.`,
			},
			{
				tag: `"Materials"`,
				detail: `means any materials, information or documentation that we may provide to You in connection with Your use of the Products including documentation, data, information developed any use and other materials which may assist in Your use of the Goods or Service.`,
			},
			{
				tag: `"Terms"`,
				detail: `means these terms and conditions.`,
			},
			{
				tag: `"Service"`,
				detail: `means the application, which is known as: Viscio Express including all pages, sub pages, all blogs, forums and other connected internet content whatsoever.`,
			},
			{
				tag: `"Third Party Goods/Services"`,
				detail: `means goods, products and services of third party that may be advertised on the Application.`,
			},
			{
				tag: `"Services"`,
				detail: `means the services offered on the Application.`,
			},
		],
		aboutApp = [
			`The Application is an online store that engages in the sale of the following Services: Logistics`,
			`This Application is comprised of various pages operated by Viscio Technologies LTD.`,
			`This Service is offered to You upon Your acceptance of the Terms, conditions, notices hereinafter contained. Your use of this Service constitutes Your agreement to all the Terms contained herein.`,
		],
		agreement = [
			`By using this Application, You acknowledge that You have reviewed, considered the Terms of this Agreement and understand same and agree to be bound by it. If You u do not agree with these Terms or do not intend to be bound by it, You must quit the use of this Application immediately. In addition, when using these Service, You shall be subject to any posted guidelines or rules applicable to such services. Accordingly, any participation in this Service shall constitute acceptance of this Agreement.`,
			`By using this Application and agreeing to these Terms, You represent and warrant that You have the legal capacity to accept these Terms.`,
		],
		acceptableUse = [
			`We may provide You with other items in connection with Your use of this Service.`,
			`We hereby grant You the license to use our Service for Your personal, non-commercial use to retrieve, display and view the Content on a computer screen.`,
			`The license created under these Terms is limited, non-exclusive, non-transferable and revocable.`,
			`You agree that You will not use the Contents or Materials for any other purpose which may be contrary to your license to use this Service.`,
			`Any unauthorized use by You shall terminate the permission or license granted by this Application.`,
		],
		prohibit1 = [
			`to harass, abuse or threaten others or otherwise violate any person's legal rights;`,
			`to perpetrate fraud;`,
			`to create or transmit unnecessary spam to any person or URL;`,
			`to post, transmit or cause to be posted or transmitted, any communication or solicitation designed to obtain password, account, or private information of other Users or persons;`,
			`to post copyrighted content which does not belong to You and without obtaining the prior consent of the author;`,
			`to use robot, spider, scraper or other automated means to access this Service without obtaining the prior consent of the Owner;`,
			`to engage in or create any unlawful gambling, sweepstakes, or scheme;`,
			`publishing or distributing any obscene or defamatory material;`,
			`using this Service in any way that impacts user access to the Application;`,
			`to engage in advertisement or solicit any User to buy or sell products or services without obtaining the prior consent of the Owner;`,
			`disseminating computer viruses or other software;`,
			`violating any intellectual property rights of the Owner or any third party;`,
			`to use the Application or any of the Services for illegal spam activities.`,
		],
		propOwner = [
			`You agree that we retain ownership of all Content included on the Application (text, graphics, video, software, data, page layout, images, and any other information capable of being stored in a computer) other than the contents uploaded by users.`,
			`You are granted a limited license only, subject to the restrictions provided in this Terms, nothing on this Application shall be construed as granting any license or right to use any trademark or logo displayed on the Application without obtaining the prior written consent of the Owner.`,
			`You hereby agree not to reproduce or distribute the Owner's intellectual property or use the intellectual property for any unlawful purpose.`,
		],
		prohibit2 = [
			`interfere or attempt to interfere with the proper working of this Application; or`,
			`by pass any measures we may use to prevent or restrict access to this Application;`,
			`to interfere with or circumvent the security features of this Service;`,
			`to damage, disable, overburden or impair this Service or any other person's use of this Service.`,
			`to use this Service contrary to the applicable laws and regulations or in a way that causes, or may cause harm to this Application, any person or business entity.`,
		],
		yourContent = [
			`You undertake that You retain the exclusive right and ownership of Your Content and You are not infringing on any third party rights.`,
			`You retain all rights and ownership to Your Content. However, when You upload Your Content, You grant the Owner a worldwide license to communicate, distribute, host, make modification or derivative works (solely for the purpose of showcasing Your work), reproduce, publicly display, publicly perform and use such content. The license granted by You is for the purposes of marketing, promoting, and improving our services.`,
			`The Owner reserves the right to remove any of Your Content or any content that is unlawful, offensive, defamatory, or otherwise objectionable or violates any intellectual property rights or thees Terms.`,
		],
		userAccount = [
			`You may be required to register with us to have access to our Service.`,
			`You will be required to provide certain personal information, which includes but not limited to Your name, user name, email address and password. The information provided must be correct and accurate.`,
			`This personal information must not be disseminated to anyone and when You discover that Your information has been compromised, You agree to notify us immediately. You also acknowledge that You are responsible for the security of Your personal information and that the Owner does not accept liability for the security of Your account as You agree to be responsible for maintaining the confidentiality of Your passwords or other account identifiers which You choose and all activities under Your account.`,
			`The Owner reserves the right to terminate Your account where You have provided false inaccurate or incorrect information.`,
			`It is at the sole discretion of the Owner to terminate the account or refuse to sell any Services to any User at any time and for any reason.`,
		],
		salesService = [
			`The Application may offer Services for sale. The Owner undertakes to give accurate information about the description of the Services. However, the Owner does not guarantee the reliability of any information relating to the Services.`,
			`The Owner does not guarantee the accuracy or reliability of any services and You agree that any purchase made by You is done at Your own risk.`,
			`We reserve the right to refuse to sell the Services provided on the Application at our sole discretion.`,
			`Subject to the terms of our return policy, if You are not satisfied with Your purchase, we offer replacement of services sold on the Application.`,
			`All replacements will be made using the same means of payment as You used for the initial transaction, unless You have expressly agreed otherwise.`,
		],
		paymentBilling = [
			`If You register for our Service or to purchase any Services offered on this Application, You agree to pay the full price for the Services when the purchase is made.`,
			`The total price will also include the taxes applicable on the date of purchase.`,
			`The total price of the Services provided including all applicable taxes is included upon the confirmation of Your order.`,
		],
		general = [
			{
				tag: `Assignment`,
				detail: `The Owner shall be permitted to assign, transfer its rights and/or obligations under these Terms. However, You shall not be permitted to assign, transfer any rights and/or obligations under these Terms.`,
			},
			{
				tag: `Entire Agreement`,
				detail: `These Terms, disclaimers and any other agreement relating to the use of this Application constitutes the entire agreement and shall supersede any other agreement.`,
			},
			{
				tag: `Separate Agreements`,
				detail: `You may have other legal agreements with us. Those agreements are separate from these Terms. These Terms are not intended to alter, amend, revise or replace the terms of the other agreement.`,
			},
			{
				tag: `Applicable law`,
				detail: `These Terms may be governed and construed in accordance with the Laws, regulations or guidelines of the Federal Republic of Nigeria and other treaties, or regulations which is applicable in Nigeria.`,
			},
			{
				tag: `Variation`,
				detail: `The Owner may revise these Terms at any time as it sees fit, and by using this Application, You undertake that You shall review the terms of the revised Terms before accepting same. If any part of the of the Terms or any modification thereof is considered invalid or unenforceable, the remaining parts shall be considered valid and enforceable.`,
			},
			{
				tag: `Waiver`,
				detail: `Failure to exercise any right in these Terms shall not operate as a waiver. The right or remedies herein provided are cumulative and not exclusive of any right or remedies provided by law.`,
			},
			{
				tag: `Severability`,
				detail: `Every provision contained herein is intended to be severable. If any provision is invalid for any reason whatsoever, such invalidity shall not affect the validity of other clauses of these Terms.`,
			},
		];

	return (
		<Container className="pt-5">
			<section className="py-5" data-aos="zoom-in">
				<MiddleHeader text={"Terms and Conditions"} />
				<div className="py-4" data-aos="zoom-in">
					<h6 className="fw-600">Effective date: August 18, 2021</h6>
					<small>
						{" "}
						These terms and conditions apply to You, the the user of this
						application, and Viscio Technologies LTD, the Owner and operator of
						the following application: Viscio Express (the "Application").
					</small>
					<small className="d-block textColor2 my-3">
						PLEASE READ THE TERMS AND CONDITIONS CAREFULLY as they affect your
						legal right
					</small>
				</div>
				<ol data-aos="zoom-in">
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600">Definitions</h6>
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
						<h6 className="fw-600">About this Application</h6>
						<ul data-aos="zoom-in">
							{aboutApp.map((item, index) => (
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
						<h6 className="fw-600">Agreement</h6>
						<ul data-aos="zoom-in">
							{agreement.map((item, index) => (
								<li key={index} className="my-1 fontReduce" data-aos="zoom-in">
									{item}
								</li>
							))}
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600">Acceptable Use</h6>
						<ul data-aos="zoom-in">
							{acceptableUse.map((item, index) => (
								<li key={index} className="my-1 fontReduce" data-aos="zoom-in">
									{item}
								</li>
							))}
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600">Prohibited Use</h6>
						<ul data-aos="zoom-in">
							<li className="my-1 fontReduce" data-aos="zoom-in">
								You are expressly prohibited from collecting, downloading,
								copying or otherwise communicating with other Users from the
								Application.
							</li>
							<li className="my-1 fontReduce" data-aos="zoom-in">
								You agree not to use the Service in the following manner:
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
								Additionally, you agree that You will not do as follows:
								<ol className="listStyleRoman" data-aos="zoom-in">
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
								The Owner has the authority to review all content posted by the
								Users on this Application and we reserve the right to terminate
								Your use of the Service for violating any of the prohibited
								uses.
							</li>
							<li data-aos="zoom-in">
								You acknowledge that the Application does not control the
								content or any information that may be posted by other users.
								Consequently, it is not responsible or liable for those contents
								or information.
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600">Intellectual Property Ownership</h6>
						<ol data-aos="zoom-in">
							{propOwner.map((item, index) => (
								<li key={index} className="my-1 fontReduce" data-aos="zoom-in">
									{item}
								</li>
							))}
						</ol>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600">Your Content</h6>
						<ul data-aos="zoom-in">
							{yourContent.map((item, index) => (
								<li key={index} className="my-1 fontReduce" data-aos="zoom-in">
									{item}
								</li>
							))}
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600">User Account</h6>
						<ul data-aos="zoom-in">
							{userAccount.map((item, index) => (
								<li key={index} className="my-1 fontReduce" data-aos="zoom-in">
									{item}
								</li>
							))}
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600">Sale of Services</h6>
						<ul data-aos="zoom-in">
							{salesService.map((item, index) => (
								<li key={index} className="my-1 fontReduce list-group-item">
									{item}
								</li>
							))}
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600">Payment and Billing</h6>
						<ul data-aos="zoom-in">
							{paymentBilling.map((item, index) => (
								<li key={index} className="my-1 fontReduce" data-aos="zoom-in">
									{item}
								</li>
							))}
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600">Performance of Services</h6>
						<ul data-aos="zoom-in">
							<li
								className="my-1 fontReduce list-group-item"
								data-aos="zoom-in">
								Upon payment for our Services, We may offer You the opportunity
								to book a time and date for the performance of the Services. The
								Services will be performed within a reasonable time. If You have
								any questions regarding the time and date for the performance,
								contact us.
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600">Privacy Policy</h6>
						<ul data-aos="zoom-in">
							<li
								className="my-1 fontReduce list-group-item"
								data-aos="zoom-in">
								Our privacy policy explains how we treat Your personal data and
								protect Your privacy when You use our Service. By using our
								Service, You agree that the Owner can use such data in the
								manner described in the our Privacy Policy. 13. Electronic
								Communications
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600">Electronic Communications</h6>
						<ul data-aos="zoom-in">
							<li
								className="my-1 fontReduce list-group-item"
								data-aos="zoom-in">
								You consent to receive electronic communications and You agree
								that all agreements, notices, disclosures and other
								communications we provide to You electronically, via email and
								on this Application, satisfy any legal requirements that
								communications must be in writing.
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600">Reverse Engineering and Security</h6>
						<ul data-aos="zoom-in">
							<li className="my-1 fontReduc list-group-item">
								You hereby agree as follows:
								<ul className="listStyleRoman">
									<li className="my-1 fontReduce ">
										not to reverse engineer or permit the reverse engineering or
										dissemble any code or software from or on the Application or
										Services; and
									</li>
									<li className="my-1 fontReduce ">
										not to violate the Security of the Application or other
										Services through any unauthorized access, circumvention of
										encryption or other security tools, data mining or
										interference with any host or User or network.
									</li>
								</ul>
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600">Affiliate Marketing and Advertisement</h6>
						<ul data-aos="zoom-in">
							<li
								className="my-1 fontReduce list-group-item"
								data-aos="zoom-in">
								We may engage in affiliate marketing and advertisement whereby
								we receive commission on the sale of Third Party Goods and/or
								Services through our Service. We may also accept advertising and
								sponsorship from commercial businesses or receive other forms of
								advertising compensation.
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600">Change to Service</h6>
						<ul data-aos="zoom-in">
							<li className="my-1 fontReduce" data-aos="zoom-in">
								You accept that the Owner may vary, alter, amend, or update the
								Content or Service, Services at any time and without Your
								consent.
							</li>
							<li className="my-1 fontReduce" data-aos="zoom-in">
								You also agree that the Services may not be available at all
								times and this may be as a result of the maintenance or for any
								other reason and we shall not be held liable for the failure to
								provide this Service.
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600">Indemnification</h6>
						<ul data-aos="zoom-in">
							<li
								className="my-1 fontReduce list-group-item"
								data-aos="zoom-in">
								You hereby agree to indemnify the Owner, its employees, agents;
								and third parties from and against all liabilities, cost,
								demands, cause of action, damages; and expenses (including
								reasonable attorney's fees) arising out of Your use or inability
								to use, any uploads made by You, Your violation of any rights of
								a third party and Your violation of applicable laws, rules or
								regulation.
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600">No Warranties</h6>
						<ul data-aos="zoom-in">
							<li
								className="my-1 fontReduce list-group-item"
								data-aos="zoom-in">
								You agree that You use this Application solely at Your risk as
								the Owner does not warrant the accuracy of the contents in this
								Application. You assume all the risk of viewing, reading, or
								downloading the contents of this Application.
							</li>
							<li
								className="my-1 fontReduce list-group-item"
								data-aos="zoom-in">
								The Owner expressly disclaims all express and implied warranties
								such as implied warranty of merchantability as the Owner makes
								no warranties that the Application or other Services will be
								accurate, error free, secure or uninterrupted.
							</li>
							<li
								className="my-1 fontReduce list-group-item"
								data-aos="zoom-in">
								You also agree that the Owner and its affiliates shall not be
								liable for any direct, indirect, punitive and all consequential
								damages or any damages whatsoever including, but not limited to
								damages for loss of use, data or profits, the failure to provide
								Services or for any information, software, Products, Services,
								related graphics and materials obtained through this
								Application, or otherwise arising out of the use of this
								Application, whether based on contract, negligence, strict
								liability, or otherwise.
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600">Service Interruptions</h6>
						<ul data-aos="zoom-in">
							<li
								className="my-1 fontReduce list-group-item"
								data-aos="zoom-in">
								The Owner may from time to time interrupt Your access or use of
								this Application to perform some maintenance or emergency
								services and You agree that the Owner shall not be held liable
								for any damage, loss which may arise thereof.
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600">Termination/Restriction of Access</h6>
						<ul data-aos="zoom-in">
							<li
								className="my-1 fontReduce list-group-item"
								data-aos="zoom-in">
								The Owner reserves the right to, at its sole discretion,
								terminate Your access to this Application and the related
								Service or any part thereof at any time, for any reason and
								without notice. The Owner shall have the right to terminate or
								terminate/suspend Your account for violating the Terms of this
								Service.
							</li>
							<li
								className="my-1 fontReduce list-group-item"
								data-aos="zoom-in">
								If You register with us, You may terminate this Service at
								anytime by issuing a prior notice to us. Once this is done, You
								will no longer be bound by the provisions of this Terms.
							</li>
						</ul>
					</li>
					<li className="my-3" data-aos="zoom-in">
						<h6 className="fw-600">General Provisions</h6>
						<ul data-aos="zoom-in">
							{general.map((item, index) => (
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
				</ol>
			</section>
		</Container>
	);
};

export default TermsAndConditions;
