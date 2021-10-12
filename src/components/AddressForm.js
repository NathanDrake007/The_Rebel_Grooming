import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { firestore } from "../utils/firebase";
import Loading from "./Loading";
const useStyles = makeStyles((theme) => ({
	buttons: {
		display: "flex",
		justifyContent: "flex-end",
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
}));
function AddressForm(props) {
	const classes = useStyles();

	const [fieldError, setFieldError] = useState(false);
	const [line1, setline1] = useState("");
	const [line2, setline2] = useState("");
	const [phone, setPhone] = useState("");
	const [city, setCity] = useState("");
	const [postal_code, setPostalCode] = useState("");
	const [state, setState] = useState("");
	const [save, setSave] = useState(false);
	const [newAddress, setNewAddress] = useState(false);
	const [addressList, setAddressList] = useState([]);
	const [name, setName] = useState(null);
	const [email, setEmail] = useState(null);
	const [index, setIndex] = useState("0");
	const [loading, setLoading] = useState(true);
	function isNormalInteger(str) {
		return /^\+?(0|[1-9]\d*)$/.test(str);
	}
	const validate = () => {
		if (
			line1.length === 0 ||
			city.length === 0 ||
			postal_code.length === 0 ||
			state.length === 0 ||
			phone.length !== 10 ||
			!isNormalInteger(phone)
		) {
			setFieldError(true);
			return false;
		} else {
			setFieldError(false);
			return true;
		}
	};
	useEffect(() => {
		async function fetchAddress() {
			await firestore
				.collection("users")
				.doc(props.userId)
				.get()
				.then((doc) => {
					const _address = doc.data().address;
					if (_address) {
						setAddressList(doc.data().address);
					}
					setName(doc.data().name);
					setEmail(doc.data().email);
					setPhone(doc.data().phone);
				})
				.catch((error) => {
					console.log("Error getting document:", error);
				});
		}
		if (props.isSignedIn) {
			fetchAddress();
			setLoading(false);
		}
	}, [props.userId, props.isSignedIn]);

	const handleNext = () => {
		if (newAddress) {
			if (!validate()) return;
			props.setShippingDetails({
				name,
				email,
				phone,
				address: {
					line1,
					line2,
					city,
					postal_code,
					state,
					country: "IN",
				},
			});
			if (save) {
				addressList.push({
					line1,
					line2,
					city,
					postal_code,
					state,
					country: "IN",
				});
				firestore.collection("users").doc(props.userId).update({
					address: addressList,
					phone,
				});
			}
			props.handleNext();
		} else {
			props.setShippingDetails({
				name,
				email,
				phone,
				address: addressList[parseInt(index)],
			});
			props.handleNext();
		}
	};
	const renderSavedAddress = () => {
		return (
			<React.Fragment>
				<Typography variant="h6" gutterBottom>
					Select Shipping Address
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						{addressList.map((address, _index) => (
							<div className="form-check" key={`addressKey-${_index}`}>
								<input
									className="form-check-input"
									type="radio"
									name={`address-${_index}`}
									id={`addressId-${_index}`}
									value={_index.toString()}
									checked={_index.toString() === index}
									onChange={(e) => {
										setIndex(e.target.value);
										setNewAddress(false);
									}}
								/>
								<label
									className="form-check-label"
									htmlFor={`addressId-${_index}`}
								>
									{address.line1}
								</label>
							</div>
						))}
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								value="-1"
								checked={index === "-1"}
								onChange={(e) => {
									setIndex(e.target.value);
									setNewAddress(true);
								}}
							/>
							<label className="form-check-label">New Address</label>
						</div>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	};
	const renderNewAddress = () => {
		return (
			<>
				<Typography variant="h6" gutterBottom>
					Shipping address
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							required
							error={fieldError && line1.length === 0}
							id="address1"
							name="address1"
							label="Address line 1"
							fullWidth
							onChange={(e) => setline1(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							error={fieldError && line2.length === 0}
							id="address2"
							name="address2"
							label="Address line 2"
							fullWidth
							onChange={(e) => setline2(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="phoneNumber"
							name="phoneNumber"
							label="Phone Number"
							error={
								fieldError && (phone.length !== 10 || !isNormalInteger(phone))
							}
							fullWidth
							inputMode="numeric"
							onChange={(e) => setPhone(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							error={fieldError && city.length === 0}
							id="city"
							name="city"
							label="City"
							fullWidth
							autoComplete="shipping address-level2"
							onChange={(e) => setCity(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							error={fieldError && state.length === 0}
							id="state"
							name="state"
							label="State/Province/Region"
							fullWidth
							onChange={(e) => setState(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							error={fieldError && postal_code.length === 0}
							id="zip"
							name="zip"
							label="Zip / Postal code"
							fullWidth
							autoComplete="shipping postal-code"
							onChange={(e) => setPostalCode(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							control={
								<Checkbox
									color="secondary"
									name="saveAddress"
									value={save}
									onChange={(e) => setSave(!save)}
								/>
							}
							label="Use this address for payment details"
						/>
					</Grid>
				</Grid>
			</>
		);
	};
	return loading ? (
		<Loading />
	) : (
		<>
			{renderSavedAddress()}
			{newAddress ? renderNewAddress() : null}
			<div className={classes.buttons}>
				<Button
					variant="contained"
					color="primary"
					onClick={handleNext}
					className={classes.button}
				>
					Next
				</Button>
			</div>
		</>
	);
}
const mapStateToProps = (state) => {
	return {
		userId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn,
		products: state.cart.products,
	};
};
export default connect(mapStateToProps, null)(AddressForm);
