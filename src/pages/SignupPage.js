import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { signUp } from "../redux/actions/authActions";
import { Link } from "react-router-dom";
import Popup from "../components/Popup";

function SignUpPage(props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [mailError, setMailError] = useState(false);
	const [open, setOpen] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!email.includes("@")) {
			setMailError(true);
			return;
		}
		setMailError(false);
		if (password !== confirmPassword || password.length < 8) {
			setPasswordError(true);
			return;
		}
		setPasswordError(false);
		props.signUp({
			name,
			email,
			password,
		});
		setOpen(true);
	};
	useEffect(() => {
		if (props.authError !== null) {
			setOpen(true);
		}
	}, [props.authError]);
	return (
		<div className="d-flex align-items-center h-100 m-5">
			<div className="container h-100">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-12 col-md-9 col-lg-7 col-xl-6">
						<div className="container border-container color-1">
							<div className="p-2">
								<h2 className="text-uppercase text-center mb-5">
									Create an account
								</h2>
								<form onSubmit={handleSubmit}>
									<div className="form-outline mb-2">
										<label className="form-label" htmlFor="form3Example1cg">
											Your Name
										</label>
										<input
											type="text"
											id="form3Example1cg"
											className="form-control form-control-lg"
											onChange={(e) => setName(e.target.value)}
										/>
									</div>
									<div className="form-outline mb-2">
										<label className="form-label" htmlFor="form3Example3cg">
											Your Email
										</label>
										<input
											type="email"
											id="form3Example3cg"
											className="form-control form-control-lg"
											onChange={(e) => setEmail(e.target.value)}
										/>
										<div
											className={mailError ? "d-block text-danger" : "d-none"}
										>
											invalid mail
										</div>
									</div>
									<div className="form-outline mb-2">
										<label className="form-label" htmlFor="form3Example4cg">
											Password
										</label>
										<input
											type="password"
											id="form3Example4cg"
											className="form-control form-control-lg"
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
									<div className="form-outline mb-2">
										<label className="form-label" htmlFor="form3Example4cdg">
											Confirm your password
										</label>
										<input
											type="password"
											id="form3Example4cdg"
											className="form-control form-control-lg"
											onChange={(e) => setConfirmPassword(e.target.value)}
										/>
										<div
											className={
												passwordError ? "d-block text-danger" : "d-none"
											}
										>
											password doesn't match or length is too short
										</div>
									</div>
									<div className="d-flex justify-content-center">
										<button
											type="submit"
											className="btn button btn-block btn-lg bgcolor-1 w-100"
										>
											Sign up
										</button>
									</div>
									<p className="text-center text-muted mt-5 mb-0">
										already have an account ?
										<Link to="/signin" className="fw-bold text-body">
											<u>Sign in here</u>
										</Link>
									</p>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Popup
				text={props.authError !== null ? props.authError : "Signed Up"}
				handleClose={handleClose}
				open={open}
			/>
		</div>
	);
}

const mapStateToProps = (state) => {
	return { authError: state.auth.authError };
};
export default connect(mapStateToProps, { signUp })(SignUpPage);
