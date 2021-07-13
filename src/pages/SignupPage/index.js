import React, { useState } from "react";
import { connect } from "react-redux";
import { signUp } from "../../redux/actions/authActions";

import "./signup_page.css";

function SignUpPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signUp({
      email,
      password,
      confirmPassword,
    });
  };
  return (
    <div className="signInPage">
      <div class="container border border-4 border-dark rounded my-5 w-25">
        <div class="text-center">
          <h2>Sign Up</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label for="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="email...."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label for="password" className="form-label">
              password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="password....."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label for="confirmPassword" className="form-label">
              password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="re-enter password....."
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-danger my-2 text-center">
            Submit
          </button>
        </form>
        {props.authError ? (
          <p className="text-danger">{props.authError}</p>
        ) : null}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { authError: state.auth.authError };
};
export default connect(mapStateToProps, { signUp })(SignUpPage);
