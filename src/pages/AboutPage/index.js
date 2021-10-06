import React, { useState } from "react";
import { Link } from "react-router-dom";
import about1 from "../../assets/pictures/aboutbg-1.jpg";
import about2 from "../../assets/pictures/aboutbg-2.jpg";
import about3 from "../../assets/pictures/aboutbg-3.jpg";
import highlights from "../../assets/pictures/brand-highlights.jpg";
import displayHeading2 from "../../assets/pictures/displayHeading-2.png";
import Popup from "../../components/Popup";
import { firestore } from "../../utils/firebase";
import "./style.css";
function AboutPage() {
	const [email, setEmail] = useState("");
	const [open, setOpen] = useState(false);
	const [emailError, setEmailError] = useState(false);
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
		<>
			<div className="container">
				<h1 className="fs-1">WHY REBEL GROOMING?</h1>
				<p className="fs-4">
					The rebel grooming co aims at delivering premium grooming, styling,
					and self-care products exclusively for men. So, you don't have to feel
					left out, cause we have got you covered.
				</p>
				<p className="fs-4">
					Our products are made from natural ingredients that do not cause any
					side effects. Everything you buy here is uniquely formulated to give
					you the best results. Thus, charming look without any compromise.
				</p>
				<p className="fs-4">
					All the products of the rebel grooming co are easy to use. all it
					takes is a few seconds to look your best for the day. As already said,
					our products are made from natural ingredients, organic methods, and
					we are cruelty-free. So, we do good for you and the environment.
				</p>
			</div>
			<div className="d-none d-xl-block d-md-block">
				<div className="about-container text-white">
					<img src={about1} alt="about1" style={{ width: "100%" }} />
					<div className="wrap">
						<h1>OUR PRODUCTS</h1>
						<p className="fs-3">
							Hair Pomade, Hair Putty, Beard Growth Elixir and More....
						</p>
						<Link to="/" className="button-3 m-0">
							View Products
						</Link>
					</div>
				</div>
				<div className="about-container text-white">
					<img src={about2} alt="about1" style={{ width: "100%" }} />
					<div className="wrap-2">
						<h1>OUR BLOGS</h1>
						<p className="fs-3">
							view our blog for more infomation about styling and grooming
						</p>
						<Link to="/blogs" className="button-3 m-0">
							View Blogs
						</Link>
					</div>
				</div>
				<div className="about-container text-white ">
					<img src={about3} alt="about1" style={{ width: "100%" }} />
					<div className="wrap w-25">
						<h1>NEWSLETTER</h1>
						<p>Sign up and be the first to know about our special offers!</p>
						<form className="d-flex" onSubmit={handleSubmit}>
							<input
								type="email"
								className="form-control w-75"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							{emailError ? <p className="text-danger">Invalid Email</p> : null}
							<button type="submit" className="btn bgcolor-2 button w-25">
								Subcribe
							</button>
						</form>
					</div>
				</div>
			</div>
			<div className="d-block d-xl-none d-md-none">
				<img src={about1} alt="about1" style={{ width: "100%" }} />
				<div className="container p-2">
					<h1>OUR PRODUCTS</h1>
					<p className="fs-3">
						Hair Pomade, Hair Putty, Beard Growth Elixir and More....
					</p>
					<Link to="/" className="button-1 m-0">
						View Products
					</Link>
				</div>
				<img src={about2} alt="about2" style={{ width: "100%" }} />
				<div className="container p-2">
					<h1>OUR BLOGS</h1>
					<p className="fs-3">
						view our blog for more infomation about styling and grooming
					</p>
					<Link to="/blogs" className="button-1 m-0">
						View Blogs
					</Link>
				</div>
				<img src={about3} alt="about3" style={{ width: "100%" }} />
				<div className="container p-2">
					<h1>NEWSLETTER</h1>
					<p>Sign up and be the first to know about our special offers!</p>
					<form className="d-flex" onSubmit={handleSubmit}>
						<input
							type="email"
							className="form-control w-75"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						{emailError ? <p className="text-danger">Invalid Email</p> : null}
						<button type="submit" className="btn bgcolor-2 button w-25">
							Subcribe
						</button>
					</form>
				</div>
			</div>
			<img
				src={displayHeading2}
				alt="displayheading-2"
				className="img-fluid"
				width="100%"
			/>
			<div className="container-fluid bg-white">
				<img
					src={highlights}
					alt="highlights"
					className="img-fluid"
					width="100%"
				/>
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
		</>
	);
}

export default AboutPage;
