import React, { useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../utils/firebase";
import TextModal from "../TextModal";
import Popup from "../Popup";
import "./footer.css";
function Footer() {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState(false);
	const [open, setOpen] = useState(false);
	const [hasError, setHasError] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email.includes("@")) {
			setEmailError(true);
		}
		if (emailError) setEmailError(false);
		await firestore
			.collection("newsletter")
			.add(email)
			.then(() => setOpen(true))
			.catch(() => setHasError(true));
	};
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};
	return (
		<footer>
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="row m-5">
							<div className="accordion d-md-flex" id="accordion">
								<div className="col-md-4 text-white order-md-3 mt-5 mb-4">
									<h1>SIGN UP</h1>
									<h6>
										Sign up and be the first to know about our special offers!
									</h6>
									<form className="d-flex" onSubmit={handleSubmit}>
										<input
											type="email"
											className="form-control newsletter"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
										/>
										{emailError ? (
											<p className="text-danger">Invalid Email</p>
										) : null}
										<button type="submit" className="btn w-25 button bgcolor-2">
											Sign up
										</button>
									</form>
									<div className="text-white d-none d-md-block d-xl-block mt-2">
										<h1>FOLLOW US ON</h1>
										<ul className="list-unstyled d-flex">
											<li>
												<a
													target="_blank"
													rel="noreferrer"
													href="https://www.facebook.com/The-Rebel-Grooming-Co-203645081680899/"
													className="text-decoration-none text-white"
												>
													<i className="fab fa-facebook me-3 fs-3"></i>
												</a>
											</li>
											<li>
												<a
													target="_blank"
													rel="noreferrer"
													href="https://instagram.com/therebelgroomingco?utm_medium=copy_link"
													className="text-decoration-none text-white"
												>
													<i className="fab fa-instagram me-3 fs-3"></i>
												</a>
											</li>
											<li>
												<a
													target="_blank"
													rel="noreferrer"
													href="https://twitter.com/RajkumarEaswar"
													className="text-decoration-none text-white"
												>
													<i className="fab fa-twitter me-3 fs-3"></i>
												</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="col-md-4 order-md-1 mt-5 mb-4">
									<button
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#products"
										className="accord-button p-0 d-block d-md-none d-xl-none"
										aria-expanded="true"
										aria-controls="products"
									>
										<div className="button-flex">
											<h6>PRODUCTS</h6>
											<i className="fas fa-chevron-down"></i>
										</div>
									</button>

									<div className="h1 text-uppercase text-white p-0 d-none d-md-block d-xl-block">
										PRODUCTS
									</div>
									<div
										className="collapse text-white d-md-flex"
										id="products"
										data-parent="#accordion"
									>
										<ul className="list-unstyled">
											<li>
												<Link
													to="/product/pd_1"
													className="nav-link fs-5 p-0 text-white"
												>
													HAIR POMADE
												</Link>
											</li>
											<li>
												<Link
													to="/product/pd_2"
													className="nav-link fs-5 p-0 text-white"
												>
													HAIR PUTTY
												</Link>
											</li>
											<li>
												<Link
													to="/product/pd_6"
													className="nav-link fs-5 p-0 text-white"
												>
													BEARD GROWTH ELIXIR
												</Link>
											</li>
											<li>
												<Link
													to="/product/pd_5"
													className="nav-link fs-5 p-0 text-white"
												>
													BEARD WAX
												</Link>
											</li>
											<li>
												<Link
													to="/product/pd_3"
													className="nav-link fs-5 p-0 text-white"
												>
													LIP BALM
												</Link>
											</li>
											<li>
												<Link
													to="/product/pd_4"
													className="nav-link fs-5 p-0 text-white"
												>
													FACE GLOW CREAM
												</Link>
											</li>
										</ul>
									</div>
								</div>
								<div className="col-md-4 order-md-2 mt-5 mb-4">
									<button
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#quick"
										className="accord-button p-0 d-block d-md-none d-xl-none"
									>
										<div className="button-flex">
											<h6>QUICK LINKS</h6>
											<i className="fas fa-chevron-down"></i>
										</div>
									</button>
									<div className="h1 text-uppercase text-white p-0 d-none d-md-block d-xl-block">
										QUICK LINKS
									</div>
									<div
										className="collapse text-white d-md-flex"
										id="quick"
										data-parent="#accordion"
									>
										<ul className="list-unstyled">
											<li>
												<Link to="/" className="nav-link fs-5 p-0 text-white">
													HOME
												</Link>
											</li>
											<li>
												<Link
													to="/about"
													className="nav-link fs-5 p-0 text-white"
												>
													ABOUT
												</Link>
											</li>
											<li>
												<Link
													to="/blogs"
													className="nav-link fs-5 p-0 text-white"
												>
													BLOGS
												</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 text-white text-center d-block d-md-none d-xl-none">
						<h1>FOLLOW US ON</h1>
						<ul className="list-unstyled d-flex p-3 align-items-center justify-content-center">
							<li>
								<a
									target="_blank"
									rel="noreferrer"
									href="https://www.facebook.com/The-Rebel-Grooming-Co-203645081680899/"
									className="text-decoration-none text-white"
								>
									<i className="fab fa-facebook me-3 fs-3"></i>
								</a>
							</li>
							<li>
								<a
									target="_blank"
									rel="noreferrer"
									href="https://instagram.com/therebelgroomingco?utm_medium=copy_link"
									className="text-decoration-none text-white"
								>
									<i className="fab fa-instagram me-3 fs-3"></i>
								</a>
							</li>
							<li>
								<a
									target="_blank"
									rel="noreferrer"
									href="https://twitter.com/RajkumarEaswar"
									className="text-decoration-none text-white"
								>
									<i className="fab fa-twitter me-3 fs-3"></i>
								</a>
							</li>
						</ul>
					</div>
					<div className="col-md-12 text-white text-center text-md-start">
						<div className="row">
							<div className="col-6 col-md-2 fs-5 order-md-2">
								<button
									type="button"
									className="footer-button"
									data-bs-toggle="modal"
									data-bs-target="#returnPolicy"
								>
									Return Policy
								</button>
								<TextModal
									title="Return Policy"
									content="1"
									id="returnPolicy"
								/>
							</div>
							<div className="col-6 col-md-2 fs-5 order-md-3">
								<button
									type="button"
									className="footer-button"
									data-bs-toggle="modal"
									data-bs-target="#terms"
								>
									Terms and condition
								</button>
								<TextModal title="Terms and condition" content="2" id="terms" />
							</div>
							<div className="col-6 col-md-2 fs-5 order-md-4">
								<button
									type="button"
									className="footer-button"
									data-bs-toggle="modal"
									data-bs-target="#privacyPolicy"
								>
									Privacy Policy
								</button>
								<TextModal
									title="Privacy Policy"
									content="3"
									id="privacyPolicy"
								/>
							</div>
							<p className="col-12 col-md-6 fs-5 text-white order-md-1">
								2021 The Rebel Grooming Co
							</p>
						</div>
					</div>
				</div>
			</div>
			<Popup
				open={open}
				text={
					hasError
						? "Sorry unable to subscribe try again.."
						: "Subcribed sucessfully"
				}
				handleClose={handleClose}
			/>
		</footer>
	);
}

export default Footer;
