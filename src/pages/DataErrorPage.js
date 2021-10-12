import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/pictures/logo.png";
function DataErrorPage() {
	return (
		<div className="container vh-100 d-flex flex-column justify-content-center color-1 align-items-center">
			<img src={logo} alt="logo" width="150" className="img-fluid" />
			<h1>OOPS SOMETHING WENT WORNG</h1>
			<h2>
				Sorry for the inconvenience please check your internet connectivity and
				refresh the page...
			</h2>
			<h2>
				If this problem Continues there may be error in our side, please come
				back later.
			</h2>
			<Link to="/" className="fs-3">
				Back To Home
			</Link>
		</div>
	);
}

export default DataErrorPage;
