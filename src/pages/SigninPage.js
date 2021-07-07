import React, { useState } from "react";
import { connect } from "react-redux";
import { signIn } from "../redux/actions";
import { Link } from "react-router-dom";
import "./css/signin_page.css";
function SignInPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    props.signIn({
      email,
      password,
    });
    console.log(email, password);
  };
  return (
    <div className="signInPage">
      <div class="container border border-4 border-dark rounded my-5 w-25">
        <div class="text-center">
          <h2>Sign In</h2>
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
          <button type="submit" className="btn btn-danger mt-2 text-center">
            Submit
          </button>
        </form>
        {props.authError ? (
          <p className="text-danger">{props.authError}</p>
        ) : null}

        <div className="text-center d-flex flex-column fs-3">
          <Link to="/recovery">Forgot your Apple ID or password?</Link>
          <Link to="/signup">Don't have an Apple ID? Create one now.</Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { authError: state.auth.authError };
};
export default connect(mapStateToProps, { signIn })(SignInPage);
