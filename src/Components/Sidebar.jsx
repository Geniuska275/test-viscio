import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GlobalState } from "../Data/Context";
import { BiLogIn, BiBell } from "react-icons/bi";
import logo from "../Assets/logo_light.png";
import "../Styles/Sidebar.css";
import { FaTimes, FaBars } from "react-icons/fa";
import { Buttons } from "../Utils";
import { MainNotification, ModalComponents } from "./DefaultHeader";
import { CheckPrice } from "../Pages/pricing";

export let CapitalizeFirst = text => {
	return text.replace(/\b\w/g, m => {
		return m.toUpperCase();
	});
};

const Sidebar = () => {
	const {
		sidebarList,
		sidebarList2,
		LogoutToken,
		auth,
		getPriceChecker,
		priceChecker,
		setContextPage,
	} = useContext(GlobalState);
	let location = useLocation(),
		navigate = useNavigate(),
		[loading, setLoading] = useState(false),
		[loading2, setLoading2] = useState(false),
		[sidebarState, setSidebarState] = useState(null),
		[shouldOpen, setShouldOpen] = useState(false),
		[isOpen, setIsOpen] = useState(false),
		[isOpen2, setIsOpen2] = useState(false),
		[isOpen3, setIsOpen3] = useState(false),
		[submit, setSubmit] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		},
		toggle2 = () => {
			setIsOpen2(!isOpen2);
		},
		toggle3 = () => {
			setIsOpen3(!isOpen3);
		},
		handleSubmit3 = async (data, e) => {
			e.preventDefault();
			setLoading2(true);
			await getPriceChecker(data);
			setLoading2(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (submit && priceChecker?.isFound) {
			setIsOpen3(false);
			setSubmit(false);
			navigate("/pricing");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, priceChecker?.isFound]);

	useEffect(() => {
		if (auth?.isAuth) {
			if (auth?.user?.type === "user") setSidebarState(sidebarList);
			else setSidebarState(sidebarList2);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth?.isAuth, auth?.user?.type]);

	useEffect(() => {
		setShouldOpen(
			document.body.clientWidth < 992 &&
				document?.getElementById("sidebarSmall")?.classList?.contains("visible")
		);
	}, [isOpen2]);

	useEffect(() => {
		if (shouldOpen)
			if (isOpen2) {
				document.body.style.overflow = "hidden";
			}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen2, shouldOpen]);

	let menuList = (item, index) => (
		<li
			className={`${
				location.pathname.includes(item.url) ? "headerActive" : ""
			}`}
			key={index}>
			{item.button ? (
				<span
					className="text-capitalize genSansFont myCursor"
					onClick={() => {
						toggle3();
						toggle2();
					}}>
					<span className="mx-3">{item.icon}</span>
					{item.name}
				</span>
			) : (
				<Link
					className="text-capitalize genSansFont"
					onClick={toggle2}
					to={item.url}>
					<span className="mx-3">{item.icon}</span>
					{item.name}
				</Link>
			)}
		</li>
	);

	let handleLogOut = async e => {
		e.preventDefault();
		setLoading(true);
		await LogoutToken();
		setLoading(false);
		navigate("/");
	};

	useEffect(() => {
		document.title = CapitalizeFirst(
			`Viscio ${location.pathname.split("/").join(" ").substring(1)}`
		);
		setContextPage(location?.pathname);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname]);

	if (!sidebarState) return <></>;

	return (
		<aside id="header" className="mainHeader sticky-top">
			<nav className="sidebar-menu bg-dark1 shadow">
				<div className="d-flex justify-content-lg-center justify-content-between mx-3 mx-lg-0 align-items-center">
					<Link to={"/"}>
						<img src={logo} alt="Viscio" className="img-fluid logoOrg" />
					</Link>
					{isOpen2 ? (
						<FaTimes
							color="white"
							onClick={toggle2}
							className="navbar-close rounded d-lg-none"
						/>
					) : (
						<FaBars
							data-bs-toggle="collapse"
							data-bs-target="#header-nav"
							color="white"
							onClick={toggle2}
							className="navbar-close rounded d-lg-none"
						/>
					)}
				</div>
				<ul
					id="sidebarSmall"
					className={`navbar-nav sidebarSmall ${isOpen2 ? "visible" : ""}`}>
					{sidebarState.map((item, index) => menuList(item, index))}
					<li className="d-lg-none">
						<span
							className="text-capitalize genSansFont myCursor"
							onClick={() => {
								toggle();
								toggle2();
							}}>
							<span className="mx-3">
								<BiBell className="myCursor" size={24} />
							</span>
							Notification
						</span>
					</li>
					<li>
						<Buttons
							loading={loading}
							loadCss="textColor"
							title={"logout"}
							onClick={handleLogOut}
							width="mx-auto"
							css="btn-white text-capitalize genSansFont textColor logout">
							<BiLogIn size={24} className="mx-3" />
						</Buttons>
					</li>
				</ul>
			</nav>
			<ModalComponents
				title={"Price Checker"}
				toggle={toggle3}
				isOpen={isOpen3}>
				<CheckPrice handleSubmit={handleSubmit3} loading={loading2} />
			</ModalComponents>
			<MainNotification isOpen={isOpen} toggle={toggle} />
		</aside>
	);
};

export default Sidebar;
