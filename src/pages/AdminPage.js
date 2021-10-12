import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { getAllOrders, getAllUsers } from "../utils/firebase";
function AdminPage(props) {
	const history = useHistory();
	const [showOrders, setShowOrders] = useState(false);
	const [orders, setOrders] = useState([]);

	const [showUsers, setShowUsers] = useState(false);
	const [users, setUsers] = useState([]);
	useEffect(() => {
		if (props.isSignedIn) {
			if (props.role !== "admin") {
				history.replace("/");
			}
		} else {
			history.replace("/signin");
		}
	}, [props.isSignedIn, props.role, history]);

	const handleViewOrders = () => {
		setShowUsers(false);
		getAllOrders().then((data) => {
			setOrders(data);
			setShowOrders(true);
		});
	};
	const handleViewUsers = () => {
		setShowOrders(false);
		getAllUsers().then((data) => {
			console.log(data);
			setUsers(data);
			setShowUsers(true);
		});
	};
	const handleAddBlogs = () => {};
	const handleAddCoupons = () => {};

	const renderShowOrders = () => {
		return (
			<div className="container">
				<h1>Total Orders</h1>
				{orders.map((order) => (
					<>
						<hr />
						<div className="accordion" id={order.id}>
							<div className="col-12">
								<button
									type="button"
									data-bs-toggle="collapse"
									data-bs-target={`#accord${order.id}`}
									className="accord-button p-0"
								>
									<div className="row color-1">
										<div className="col">
											<h4>Order ID : {order.id}</h4>
											<p>Payment type : {order.paymentMode}</p>
										</div>
										<div className="col">
											Coupon used :{" "}
											{order.couponCode ? order.couponCode : "None"}
										</div>
										<div className="col">{order.date}</div>
										<div className="col">&#8377;{order.orderTotal}</div>
										<div className="col">
											<i className="fas fa-chevron-down"></i>
										</div>
									</div>
								</button>
								<div
									className="collapse text-center"
									id={`accord${order.id}`}
									data-parent={`#${order.id}`}
								>
									<h3 className="color-1">User Id : {order.userId}</h3>
									<hr />
									{order.orderItems.map((product, index) => (
										<div className="row color-1" key={product.id}>
											<div className="col">
												<h4>{index + 1}</h4>
											</div>
											<div className="col">
												<h4>{product.id}</h4>
											</div>
											<div className="col">
												<h4>quantity: {product.quantity}</h4>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</>
				))}
			</div>
		);
	};
	const renderShowUsers = () => {
		return (
			<div className="container">
				<h1>Total Users</h1>
				{users.map((user) => (
					<>
						<hr />
						<div className="accordion" id={user.id}>
							<div className="col-12">
								<button
									type="button"
									data-bs-toggle="collapse"
									data-bs-target={`#accord${user.id}`}
									className="accord-button p-0"
								>
									<div className="row color-1">
										<div className="col">
											<h4>User ID : {user.id}</h4>
											<p>User Type : {user.auth}</p>
										</div>
										<div className="col">Role : {user.role}</div>
										<div className="col">
											<i className="fas fa-chevron-down"></i>
										</div>
									</div>
								</button>
								<div
									className="collapse text-center  color-1"
									id={`accord${user.id}`}
									data-parent={`#${user.id}`}
								>
									<div className="row">
										<div className="col">Name : {user.name}</div>
										<div className="col">Email : {user.email}</div>
										<div className="col">Phone : {user.phone}</div>
									</div>
									{user.address
										? user.address.map((address, index) => (
												<>
													<hr />
													<h2>Address - {index + 1}</h2>
													<div className="container" key={`address-${index}`}>
														<h4>{address.line1}</h4>
														<h4>{address.line2}</h4>
														<h4>
															{address.city}-{address.postal_code}
														</h4>
														<h4>
															{address.state} {address.country}
														</h4>
													</div>
												</>
										  ))
										: null}
								</div>
							</div>
						</div>
					</>
				))}
			</div>
		);
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<button className="button-1" onClick={handleViewOrders}>
						View Orders
					</button>
				</div>
				<div className="col">
					<button className="button-1" onClick={handleViewUsers}>
						View Users
					</button>
				</div>
				<div className="col">
					<button className="button-1" onClick={handleAddBlogs}>
						Add Blogs
					</button>
				</div>
				<div className="col">
					<button className="button-1" onClick={handleAddCoupons}>
						Add Coupons
					</button>
				</div>
			</div>
			{showOrders ? renderShowOrders() : null}
			{showUsers ? renderShowUsers() : null}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
		role: state.auth.role,
		uid: state.auth.userId,
	};
};
export default connect(mapStateToProps, null)(AdminPage);
