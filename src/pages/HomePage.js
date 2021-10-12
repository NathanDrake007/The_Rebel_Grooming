import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Banner from "../components/Banner";
import Product from "../components/Product";
import { firestore } from "../utils/firebase";
import highlights from "../assets/pictures/brand-highlights.jpg";
import DataErrorPage from "./DataErrorPage";
import Popup from "../components/Popup";

import displayHeading2 from "../assets/pictures/displayHeading-2.png";
import displayHeading1 from "../assets/pictures/displayHeading-1.png";
import Loading from "../components/Loading";
import NewsLetterModal from "../components/NewsLetterModal";

function HomePage() {
	const [products, setProducts] = useState([]);
	const [hasError, setHasError] = useState(false);
	const [openNews, setOpenNews] = useState(false);
	const [open, setOpen] = useState(false);
	useEffect(() => {
		async function fetchProducts() {
			var temp = [];
			await firestore
				.collection("products")
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						temp.push({
							...doc.data(),
							id: doc.id,
						});
					});
				})
				.catch((error) => {
					setHasError(true);
				});
			setProducts(temp);
		}
		fetchProducts();
		setTimeout(() => {
			setOpenNews(true);
			// console.log(openNews);
		}, 5000);
	}, []);
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const renderPage = () => {
		return (
			<div>
				{openNews ? <NewsLetterModal setOpenNews={setOpenNews} /> : null}
				<Banner />
				<img
					src={displayHeading1}
					alt="displayheading-1"
					width="100%"
					height="50%"
				/>
				<div id="main" className="container-fluid">
					{products.map((_product, index) => (
						<div className="row" key={_product.id}>
							<Product
								product={_product}
								rev={index % 2 === 1 ? true : false}
								setOpen={setOpen}
							/>
						</div>
					))}
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
				<Popup text="Added to Cart" handleClose={handleClose} open={open} />
			</div>
		);
	};
	return hasError ? (
		<DataErrorPage />
	) : products.length !== 0 ? (
		renderPage()
	) : (
		<Loading />
	);
}
const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps)(HomePage);
