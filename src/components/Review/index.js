import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { firestore } from "../../utils/firebase";
import { Avatar, Input, ListItemAvatar } from "@material-ui/core";
import axios from "../../utils/axios";
import { clearCart } from "../../redux/actions/cartActions";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import emailjs from "emailjs-com";
// import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
	listItem: {
		padding: theme.spacing(1, 0),
	},
	total: {
		fontWeight: 700,
	},
	couponText: {
		color: "red",
		fontWeight: 700,
		marginRight: "10px",
	},
	title: {
		marginTop: theme.spacing(2),
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end",
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
		backgroundColor: "#3b160e",
		color: "white",
	},
}));

function Review(props) {
	const [products, setProducts] = useState([]);
	const [originalPrice, setOriginalPrice] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [code, setCode] = useState("");
	const [codeError, setCodeError] = useState(false);
	const [appliedCode, setAppliedCode] = useState(null);
	const [selectedValue, setSelectedValue] = useState("cod");
	// const history = useHistory();
	useEffect(() => {
		async function fetchProducts() {
			var temp = [];
			var _totalPrice = 0;
			await firestore
				.collection("products")
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						const product = props.products.find((p) => p.id === doc.id);
						if (product) {
							const { title, price, size, icon } = doc.data();
							_totalPrice += parseInt(price) * product.quantity;
							temp.push({
								title,
								price,
								size,
								icon,
								...product,
							});
						}
					});
					setTotalPrice(_totalPrice);
					setOriginalPrice(_totalPrice);
				});
			setProducts(temp);
		}
		fetchProducts();
	}, [props.products]);
	const { shippingDetails, handleBack } = props;
	const classes = useStyles();

	const handlePay = async (e) => {
		e.preventDefault();

		if (selectedValue === "cod") {
			const date = new Date().toDateString();
			const templateId = "orderNotification-1";
			const newOrder = {
				orderTotal: totalPrice,
				paymentMode: "COD",
				date,
				userId: props.userId,
				orderItems: props.products,
				couponCode: appliedCode,
			};
			props.clearCart();
			await firestore
				.collection("orders")
				.add(newOrder)
				.then((doc) => {
					const templateParams = {
						orderId: doc.id,
						userId: props.userId,
						type: "cash on delivery",
						name: shippingDetails.name,
						address: `${shippingDetails.address.line1} ${shippingDetails.address.line2} ${shippingDetails.address.city} ${shippingDetails.address.state} ${shippingDetails.address.postal_code}`,
					};
					emailjs.send(
						"service_rlyvd3a",
						templateId,
						templateParams,
						"user_WTtmhndlgYGmrjpwDK9HK"
					);
					props.setOrderId(doc.id);
				});
			props.handleNext();
		} else if (selectedValue === "other") {
			const data = await (
				await axios.post("/payment", { amount: totalPrice })
			).data;

			const options = {
				key: "rzp_live_eAWSs1W0UfXgjN",
				currency: "INR",
				amount: (totalPrice * 100).toString(),
				order_id: data.id,
				name: "The Rebel Grooming",
				description: "Thank you for your purchase",
				image:
					"https://firebasestorage.googleapis.com/v0/b/rebel-grooming.appspot.com/o/logo.png?alt=media&token=b62aa0d2-4ea5-427e-8616-dba41f7538cc",
				handler: async function (response) {
					const paymentId = response.razorpay_payment_id;
					const razorOrderId = response.razorpay_order_id;
					const signature = response.razorpay_signature;

					const res = await axios.post("/verification", {
						paymentId,
						razorOrderId,
						orderId: data.id,
						signature,
					});
					if (res.data.payment === "Success") {
						const date = new Date().toDateString();
						const newOrder = {
							orderTotal: totalPrice,
							paymentMode: "CARD",
							payment_Id: paymentId,
							date,
							userId: props.userId,
							orderItems: props.products,
							couponCode: appliedCode,
						};
						props.clearCart();
						props.setOrderId(razorOrderId);
						await firestore
							.collection("orders")
							.doc(razorOrderId)
							.set(newOrder);
						const templateId = "orderNotification-1";
						const templateParams = {
							orderId: razorOrderId,
							type: "online payment",
							userId: props.userId,
							name: shippingDetails.name,
							address: `${shippingDetails.address.line1} ${shippingDetails.address.line2} ${shippingDetails.address.city} ${shippingDetails.address.state} ${shippingDetails.address.postal_code}`,
						};
						emailjs.send(
							"service_rlyvd3a",
							templateId,
							templateParams,
							"user_WTtmhndlgYGmrjpwDK9HK"
						);
						props.handleNext();
					} else if (res.data.payment === "Failed") {
						console.log("order failed");
						// TODO handle order failed
					} else {
						console.log("Undefined");
					}
				},
				prefill: {
					name: shippingDetails.name,
					email: shippingDetails.email,
					phone_number: shippingDetails.phone,
				},
			};
			const paymentObject = new window.Razorpay(options);
			paymentObject.open();
		}
	};
	const applyCode = async () => {
		if (code !== null && appliedCode !== code) {
			await firestore
				.collection("coupon")
				.doc(code.toUpperCase())
				.get()
				.then((doc) => {
					const { discount } = doc.data();
					setTotalPrice(
						Math.round(originalPrice - originalPrice * (discount / 100))
					);
					setAppliedCode(code);
				})
				.catch((error) => setCodeError(true));
		}
	};
	return (
		<>
			<React.Fragment>
				<Typography variant="h6" gutterBottom>
					Order summary
				</Typography>
				<List disablePadding>
					{products.map((product) => (
						<ListItem className={classes.listItem} key={product.title}>
							<ListItemAvatar>
								<Avatar alt={product.title} src={product.icon} />
							</ListItemAvatar>
							<ListItemText
								primary={product.title}
								secondary={`size: ${product.size}`}
							/>
							<Typography variant="body2">&#8377;{product.price}</Typography>
						</ListItem>
					))}
					<ListItem className={classes.listItem}>
						<ListItemText primary="Coupon Code" />
						<div className="d-flex flex-column mt-4">
							<Input
								placeholder="COUPON CODE"
								error={codeError}
								inputProps={{ "aria-label": "description" }}
								value={code}
								onChange={(e) => setCode(e.target.value)}
							/>
							{codeError ? <p className="text-danger">Invalid Code</p> : null}
						</div>
						<Button
							variant="contained"
							color="primary"
							onClick={applyCode}
							className={classes.button}
						>
							Apply
						</Button>
					</ListItem>
					<ListItem className={classes.listItem}>
						<ListItemText primary="Total" />
						{appliedCode !== null ? (
							<Typography variant="subtitle1" className={classes.couponText}>
								coupon applied ({appliedCode})
							</Typography>
						) : null}
						<Typography variant="subtitle1" className={classes.total}>
							&#8377;{totalPrice}
						</Typography>
					</ListItem>
				</List>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h6" gutterBottom>
							Payment Method
						</Typography>
						<FormControl component="fieldset">
							<RadioGroup
								aria-label="payment"
								name="payment1"
								value={selectedValue}
								onChange={(e) => setSelectedValue(e.target.value)}
							>
								<FormControlLabel
									value="cod"
									control={<Radio />}
									label="Cash On Delivery"
								/>
								<FormControlLabel
									value="other"
									control={<Radio />}
									label="Credit / Debit / UPI"
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="h6" gutterBottom className={classes.title}>
							Shipping Address
						</Typography>
						<Typography gutterBottom>{shippingDetails.name}</Typography>
						<Typography gutterBottom>
							{shippingDetails.address.line1},
						</Typography>
						<Typography gutterBottom>
							{shippingDetails.address.line2},
						</Typography>
						<Typography gutterBottom>
							{shippingDetails.address.state}, {shippingDetails.address.city} -
							{shippingDetails.address.postal_code}
						</Typography>
						<Typography gutterBottom>
							{shippingDetails.address.country}
						</Typography>
					</Grid>
				</Grid>
			</React.Fragment>
			<div className={classes.buttons}>
				<Button onClick={handleBack} className={classes.button}>
					Back
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={handlePay}
					className={classes.button}
				>
					Pay
				</Button>
			</div>
		</>
	);
}
const mapStateToProps = (state) => {
	return {
		products: state.cart.products,
		userId: state.auth.userId,
	};
};
export default connect(mapStateToProps, { clearCart })(Review);
