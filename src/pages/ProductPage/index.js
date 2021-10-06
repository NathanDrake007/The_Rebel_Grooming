import React, { useState, useEffect } from "react";
import { firestore } from "../../utils/firebase";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import Footer from "../../components/Footer";
import Navbar from "../../components/NavBar";
import htuDisplay from "../../assets/pictures/htuDisplay.png";
import displayHeading from "../../assets/pictures/displayHeading-3.jpg";
import Loading from "../../components/Loading";
import Popup from "../../components/Popup";
import DataErrorPage from "../DataErrorPage";
import { useHistory } from "react-router-dom";

function ProductPage(props) {
	const [product, setProduct] = useState(null);
	const [open, setOpen] = React.useState(false);
	const [hasError, setHasError] = useState(false);
	const history = useHistory();
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	useEffect(() => {
		async function fetchProducts() {
			await firestore
				.collection("products")
				.doc(props.match.params.id)
				.get()
				.then((doc) => {
					setProduct({ id: doc.id, ...doc.data() });
				})
				.catch((error) => {
					setHasError(true);
				});
		}
		fetchProducts();
	}, [props.match.params.id]);

	const addToCart = () => {
		props.addToCart({ id: product.id, quantity: 1 });
		setOpen(true);
	};
	const handleBuy = () => {
		props.addToCart({ id: product.id, quantity: 1 });
		history.push("/checkout");
	};
	const renderPage = () => {
		return (
			<>
				<Navbar />
				<div className="position-fixed bottom-0 p-3 ms-0 bgcolor-2 row w-100 color-1 align-items-center z-index-2">
					<div className="col-md-6 d-flex align-items-center justify-content-center">
						<h1 className="me-3">{product.title.toUpperCase()}</h1>
						<p className="fs-5 me-2">
							<s className="text-danger">&#8377;{product.mrp}</s>
						</p>
						<p className="fs-2 me-2 text-white fw-bold">
							&#8377;{product.price} only
						</p>
						<p className="fs-5">{product.size}</p>
					</div>
					<div className="col-md-6 justify-content-center d-flex">
						<button type="button" className="button-1" onClick={handleBuy}>
							BUY NOW
						</button>
						<button type="button" className="button-2" onClick={addToCart}>
							ADD TO CART
						</button>
					</div>
				</div>
				<div className="container-fluid">
					<div className="container-fluid my-5">
						<img
							src={product.productBanner}
							alt="img-2"
							className="image-fluid"
							width="100%"
						/>
						<img
							src={displayHeading}
							alt="img-2"
							className="image-fluid"
							width="100%"
						/>
						<div className="row">
							{product.details.map((detail, index) => (
								<div className="col-md-6 my-5" key={`details-${index}`}>
									<div className="d-flex align-items-center">
										<img
											src={detail.image}
											className="image-fluid rounded-circle border border-dark border-3"
											alt="sub-1"
											width="150"
											height="150"
										/>
										<div className="ms-5">
											<h1 className="fs-1 color-1">{detail.subtitle}</h1>
											<p className="fs-4 color-3">{detail.description}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<img src={htuDisplay} alt="displayheading-1" className="img-fluid" />
					<div className="container ">
						<div
							className={
								product.HTU.st2 === null
									? "row justify-content-center text-center"
									: "row"
							}
						>
							<div className="col-md-6 color-1 ">
								<h1>ON THE GO STYLING</h1>
								{product.HTU.st1.map((step, index) => (
									<p className="fs-5" key={`st1-${index}`}>
										<strong className="fs-4 me-2">Step {index + 1}</strong>
										{step}
									</p>
								))}
							</div>
							{product.HTU.st2 !== null ? (
								<div className="col-md-6 color-1">
									<h1>PROFESSIONAL STYLING</h1>
									{product.HTU.st2.map((step, index) => (
										<p className="fs-5" key={`st2-${index}`}>
											<strong className="fs-4 me-2">Step {index + 1}</strong>
											{step}
										</p>
									))}
								</div>
							) : null}
						</div>
					</div>
					<div className="container-fluid d-md-flex py-5">
						<img
							src={product.model_1}
							alt="img-2"
							className="image-fluid d-block d-md-none d-xl-none"
							width="100%"
						/>
						<img
							src={product.model_1}
							alt="img-2"
							className="image-fluid flex-fill d-none d-md-block d-xl-block"
							width="500"
						/>
						<img
							src={product.model_2}
							alt="img-2"
							className="image-fluid flex-fill d-none d-md-block d-xl-block"
							width="500"
						/>
					</div>
					<div className="container p-5 d-flex flex-column flex-md-row color-1 my-2 justify-content-center align-items-md-center">
						<h1 className="me-3 ">INGREDIENTS</h1>
						<p className="fs-4">{product.ingredients}</p>
					</div>
				</div>
				<Popup text="Added to Cart" handleClose={handleClose} open={open} />
				<Footer />
			</>
		);
	};

	return hasError ? <DataErrorPage /> : product ? renderPage() : <Loading />;
}

export default connect(null, { addToCart })(ProductPage);
