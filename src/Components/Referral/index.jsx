import React, { Fragment, useContext, useEffect, useState } from "react";
import moment from "moment";
import { DefaultBoxing } from "../Error";
import { GlobalState } from "../../Data/Context";
import { EmptyComponent } from "../../Utils";
import { toast } from "react-toastify";

const ReferralHistory = () => {
	const { auth, referrals } = useContext(GlobalState),
		[stateReferrals, setStateReferrals] = useState(null);

	useEffect(() => {
		setStateReferrals(referrals.referral);
	}, [referrals.referral]);

	if (!stateReferrals) return;
	return (
		<>
			<DefaultBoxing>
				<div>
					<h4>Referral Bonus</h4>
					<p
						className="myCursor my-0 py-1"
						onClick={
							auth?.user?.referralCode
								? () => {
										navigator.clipboard
											.writeText(auth?.user?.referralCode)
											.then(
												() => {
													toast.info(`Copied: ${auth?.user?.referralCode}`, {
														autoClose: 2000,
													});
												},
												err => {
													toast.warn(`Could not copy: ${err}`, {
														autoClose: 2000,
													});
												}
											);
								  }
								: null
						}>
						Referral code: {auth?.user?.referralCode}
					</p>
					<h1 className="">{referrals?.properties?.totalDocs}</h1>
					<button
						type="button"
						className="btn btn-white text-capitalize py-3 px-5 mt-5">
						Withdraw to wallet
					</button>
				</div>
			</DefaultBoxing>
			<p className="my-3 text-center text5 fw-normal">Referral history</p>
			{stateReferrals?.length === 0 ? (
				<EmptyComponent />
			) : (
				<table className="table">
					<thead className="">
						<tr className="thead">
							<th>Amount</th>
							<th>Date</th>
							<th>Details</th>
						</tr>
					</thead>
					<tbody>
						{stateReferrals.map((item, index) => (
							<Fragment key={index}>
								<tr className="py-1">
									<td className="text-capitalize">{item?.amount}</td>
									<td className="text-capitalize">{moment().format("L")}</td>
									<td className="text-capitalize">{item?.detail}</td>
								</tr>
								<tr className="mustSeperate" />
							</Fragment>
						))}
					</tbody>
				</table>
			)}
		</>
	);
};

export default ReferralHistory;
