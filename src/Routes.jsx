import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GlobalState } from "./Data/Context";
import PageRender from "./PageRender";
import Home from "./Screens/home";
import Home2 from "./Pages/home";
import Home3 from "./Views/home";
import { DefaultHeader, Footer, Header, Sidebar } from "./Components";
import SocketClient from "./SocketClient";

const Routers = () => {
	const { auth } = useContext(GlobalState);

	return (
		<div className={auth?.isAuth ? "side-header" : ""}>
			<div id={auth?.isAuth ? "main-wrapper" : ""}>
				<ToastContainer />
				{auth?.isAuth ? (
					<>
						<Sidebar />
						<DefaultHeader />
						<SocketClient />
					</>
				) : (
					<>
						<Header />
					</>
				)}
				<Routes>
					<Route
						path="/"
						element={
							auth?.isAuth && auth?.user?.type === "user" ? (
								<Home2 />
							) : auth?.isAuth && auth?.user?.type === "vendor" ? (
								<Home3 />
							) : (
								<Home />
							)
						}
					/>
					<Route path="/:page" element={<PageRender />} />
					<Route path="/:page/:id" element={<PageRender />} />
					<Route path="/:page/:id/:step" element={<PageRender />} />
				</Routes>
				{auth?.isAuth ? <></> : <Footer />}
			</div>
		</div>
	);
};

export default Routers;
