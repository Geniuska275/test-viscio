import React, { useEffect, useContext, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { GlobalState } from "../Data/Context";
import { Navbar, Collapse, Nav, NavItem } from "reactstrap";
import logo from "../Assets/logo.png";
import { CapitalizeFirst } from "./Sidebar";
import { FaTimes, FaBars } from "react-icons/fa";

const Header = () => {
	const { headerList } = useContext(GlobalState);
	let location = useLocation(),
		[isOpen, setIsOpen] = useState(false),
		[isShadow, setIsShadow] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		},
		navigate = useNavigate();

	useEffect(() => {
		document.title = CapitalizeFirst(
			`Viscio ${location.pathname.split("/").join(" ").substring(1)}`
		);
	}, [location.pathname]);

	let handleScroll = () => {
		window.onscroll = () => {
			if (window.scrollY > 100) setIsShadow(true);
			else setIsShadow(false);
		};
	};

	useEffect(() => {
		handleScroll();
	}, []);
	let classCss = list =>
		`menuItem text-decoration-none ${
			location.pathname.length > 1 &&
			list.url.length > 1 &&
			location.pathname.includes(list.url)
				? "fw-bold headerActive"
				: location.pathname.length === 1 && list.url.length === 1
				? "fw-bold headerActive"
				: "text-dark"
		} text-capitalize hug`;

	return (
		<Navbar
			expand="lg"
			sticky="top"
			className={`container-fluid px-3 header bg-white headerScroll w-100 ${
				isShadow ? "shadow" : ""
			}`}
			light>
			<Link to="/">
				<img src={logo} alt="Viscio" className="logo" />
			</Link>
			{isOpen ? (
				<FaTimes
					color="white"
					onClick={toggle}
					className="navbar-close rounded d-lg-none textColor2"
				/>
			) : (
				<FaBars
					color="white"
					onClick={toggle}
					className="navbar-close rounded d-lg-none textColor2"
				/>
			)}
			<Collapse isOpen={isOpen} navbar>
				<Nav className="mx-auto d-flex align-items-center" navbar>
					{headerList.map((list, index) => (
						<NavItem key={index} className="mx-2 mx-lg-3 my-2 my-lg-auto">
							{list.type === "button" ? (
								<span
									onClick={() => {
										navigate("/login");
										if (isOpen) setIsOpen(false);
									}}
									className={`${classCss(list)} myCursor`}>
									{list.name}
								</span>
							) : (
								<Link
									to={list.url}
									onClick={() => (isOpen ? setIsOpen(false) : null)}
									className={classCss(list)}>
									{list.name}
								</Link>
							)}
						</NavItem>
					))}
				</Nav>
				<div className="d-flex align-items-center justify-content-center me-lg-0">
					<NavItem className="myCursor list-unstyled me-lg-4 me-2">
						<Link
							to={"/login"}
							onClick={() => (isOpen ? setIsOpen(false) : null)}
							className="text-decoration-none btn btn-primary1 text-capitalize px-4 hug">
							sign in
						</Link>
					</NavItem>
					<NavItem className="myCursor list-unstyled ms-lg-4 ms-2">
						<Link
							to={"/register"}
							onClick={() => (isOpen ? setIsOpen(false) : null)}
							className="text-decoration-none btn btn-outline-primary1 text-capitalize px-4 hug">
							sign up
						</Link>
					</NavItem>
				</div>
			</Collapse>
		</Navbar>
	);
};

export default Header;
