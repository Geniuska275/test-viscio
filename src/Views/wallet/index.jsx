import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import { MainWallet } from "../../Components";
import { transactionHistory } from "../../Pages/wallet";

const Wallet = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	let [isOpen, setIsOpen] = useState(false),
		[isOpen2, setIsOpen2] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		},
		toggle2 = () => {
			setIsOpen2(!isOpen2);
		},
		handleSubmit = async e => {
			e.preventDefault();
			toggle();
		},
		handleSubmit2 = async e => {
			e.preventDefault();
			toggle2();
		};

	return (
		<Container className="px-lg-5  pt-3 pt-lg-0">
			<MainWallet
				transactionHistory={transactionHistory}
				toggle={toggle}
				toggle2={toggle2}
				isOpen={isOpen}
				isOpen2={isOpen2}
				handleSubmit={handleSubmit}
				handleSubmit2={handleSubmit2}
				userType={"vendor"}
			/>
		</Container>
	);
};

export default Wallet;
