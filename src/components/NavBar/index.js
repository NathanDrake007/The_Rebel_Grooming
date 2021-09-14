import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "../../redux/actions/authActions";
import { clearCart } from "../../redux/actions/cartActions";
import { connect } from "react-redux";

import logo from "../../assets/pictures/logo.png";
import Popup from "../Popup";

function NavBar(props) {
	const [open, setOpen] = React.useState(false);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};
	const handleSignOut = () => {
		setOpen(true);
		props.signOut();
		props.clearCart();
	};
	return (
		<nav className="navbar navbar-expand-md">
			<div className="container">
				<Link className="nav-link color-1 fs-4" to="/">
					<img
						className="rounded-circle img-fluid"
						src={logo}
						width="70"
						alt="logo"
					/>
				</Link>
				<div className="d-flex order-md-2">
					<Link className="nav-link color-1 fs-4" to="/cart">
						<i className="fas fa-shopping-cart"></i>
					</Link>
					<div className="nav-item dropdown">
						<span
							className="nav-link dropdown-toggle color-1 fs-4"
							id="navbarDropdown"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<i className="fa fa-user"></i>
						</span>
						<ul
							className="dropdown-menu bgcolor-3"
							aria-labelledby="navbarDropdown"
						>
							<li>
								<Link to="/orders" className="dropdown-item">
									Orders
								</Link>
							</li>
							{props.role === "admin" ? (
								<li>
									<Link to="/admin-easwar2001" className="dropdown-item">
										Admin Panel
									</Link>
								</li>
							) : null}
							{props.role === "influencer" ? (
								<li>
									<Link to="/influencer" className="dropdown-item">
										My Affiliate
									</Link>
								</li>
							) : null}
							<li>
								{props.isSignedIn ? (
									<button className="dropdown-item" onClick={handleSignOut}>
										Sign out
									</button>
								) : (
									<Link className="dropdown-item" to="/signin">
										Sign In
									</Link>
								)}
							</li>
						</ul>
					</div>
					<button
						data-bs-toggle="collapse"
						className="navbar-toggler"
						data-bs-target="#navcol-1"
					>
						<i className="fas fa-bars color-1 fs-4"></i>
					</button>
				</div>
				<div className="collapse navbar-collapse order-md-1" id="navcol-1">
					<ul className="navbar-nav align-items-center">
						<li className="nav-item">
							<Link to="/" className="color-1 fs-4 nav-link">
								HOME
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/about" className="color-1 fs-4 nav-link">
								ABOUT
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/blogs" className="nav-link color-1 fs-4">
								BLOG
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<Popup text="Signed Out" handleClose={handleClose} open={open} />
		</nav>
	);
}
const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn, role: state.auth.role };
};
export default connect(mapStateToProps, { signOut, clearCart })(NavBar);
