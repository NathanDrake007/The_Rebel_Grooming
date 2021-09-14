import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { firestore } from "../utils/firebase";
import DataErrorPage from "./DataErrorPage";
function InfluncerPage(props) {
	const history = useHistory();
	const [code, setCode] = useState(null);
	const [orders, setOrders] = useState(null);
	const [hasError, setHasError] = useState(false);
	const [total, setTotal] = useState(0);
	useEffect(() => {
		if (props.isSignedIn) {
			if (props.role !== "influencer") {
				history.replace("/");
			}
		} else {
			history.replace("/signin");
		}
	}, [props.isSignedIn, props.role, history]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (code === null) return;
		var temp = [];
		var _total = 0;
		await firestore
			.collection("orders")
			.where("couponCode", "==", code.toUpperCase())
			.get()
			.then((snapShot) => {
				snapShot.forEach((doc) => {
					const { orderTotal, date } = doc.data();
					temp.push({
						orderId: doc.id,
						date,
						orderTotal,
					});
					_total += parseInt(orderTotal);
				});
			})
			.catch((error) => setHasError(true));
		setOrders(temp);
		setTotal(_total);
	};
	const renderInitial = () => {
		return (
			<div className="d-flex align-items-center h-100 m-5">
				<div className="container h-100">
					<div className="row d-flex justify-content-center align-items-center h-100">
						<div className="col-12 col-md-9 col-lg-7 col-xl-6">
							<div className="container border-container color-1">
								<div className="p-2">
									<h2 className="text-uppercase text-center mb-5">
										View Affiliate
									</h2>
									<form onSubmit={handleSubmit}>
										<div className="form-outline mb-2">
											<label className="form-label" htmlFor="affiliateForm">
												Your Coupon Code
											</label>
											<input
												type="text"
												id="affiliateForm"
												placeholder="enter coupon code"
												className="form-control form-control-lg"
												onChange={(e) => setCode(e.target.value)}
											/>
										</div>
										<div className="d-flex justify-content-center">
											<button
												type="submit"
												className="btn button btn-block btn-lg bgcolor-1 w-100"
											>
												View Affiliate
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};
	const renderOrderList = () => {
		return (
			<div className="container my-5 color-1">
				<div className="d-flex justify-content-between">
					<h1>Your Affiliate Count : {orders.length}</h1>
					<h1>Total Revenue Made : &#8377;{total}</h1>
				</div>
				<div>
					{orders.map((order) => (
						<div className="row color-1 border-1 p-3 align-items-center">
							<div className="col">
								<h4>Order ID : {order.orderId}</h4>
							</div>
							<div className="col">Date : {order.date}</div>
							<div className="col">OrderTotal : &#8377;{order.orderTotal}</div>
							<div className="col">
								Your Cut : &#8377;{order.orderTotal * 0.1}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	};
	return hasError ? (
		<DataErrorPage />
	) : orders !== null ? (
		renderOrderList()
	) : (
		renderInitial()
	);
}
const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
		role: state.auth.role,
		uid: state.auth.userId,
	};
};
export default connect(mapStateToProps, null)(InfluncerPage);
