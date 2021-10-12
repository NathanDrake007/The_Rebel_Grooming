import React, { useState } from "react";
import Popup from "../components/Popup";
import { auth } from "../utils/firebase";
function ResetPasswordPage() {
	const [email, setEmail] = useState("");
	const [open, setOpen] = useState(false);
	var message = "";
	const handleSubmit = () => {
		const config = {
			url: "https://therebelgrooming.com/signin",
		};
		auth
			.sendPasswordResetEmail(email, config)
			.then(() => {
				message = "reset link sent to your mail";
				setOpen(true);
			})
			.catch(() => {
				message = "Email not found. Please try again.";
				setOpen(true);
			});
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};
	return (
		<div className="d-flex align-items-center h-100 m-5">
			<div className="container h-100">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-12 col-md-9 col-lg-7 col-xl-6">
						<div className="container border-container color-1">
							<div className="p-2">
								<h2 className="text-uppercase text-center mb-5">Sign In</h2>
								<form onSubmit={handleSubmit}>
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
									</div>
									<div className="d-flex justify-content-center">
										<button
											type="button"
											className="btn button btn-block btn-lg bgcolor-1 w-100"
										>
											Reset Password
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Popup text={message} handleClose={handleClose} open={open} />
		</div>
	);
}

export default ResetPasswordPage;
