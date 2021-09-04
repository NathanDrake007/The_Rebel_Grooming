import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { signIn } from "../../redux/actions/authActions";
import { Link } from "react-router-dom";
import "./style.css";
import { signInWithGoogle } from "../../utils/firebase";
import history from "../../utils/history";
import Popup from "../../components/Popup";
import DataErrorPage from "../DataErrorPage";

function SignInPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [mailError, setMailError] = useState(false);
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
    props.signIn({
      email,
      password,
    });
    setOpen(true);
  };
  const googleSignIn = () => {
    signInWithGoogle()
      .then((e) => {
        setOpen(true);
        setTimeout(() => history.replace("/"), 2000);
      })
      .catch((error) => setHasError(true));
  };
  useEffect(() => {
    if (props.authError !== null) {
      setOpen(true);
    }
  }, [props.authError]);
  return hasError ? (
    <DataErrorPage />
  ) : (
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
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn button btn-block btn-lg bgcolor-1 w-100"
                    >
                      Sign in
                    </button>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button
                      type="button"
                      className="btn button btn-block btn-lg bgcolor-1 w-100"
                      onClick={googleSignIn}
                    >
                      Sign in with google
                    </button>
                  </div>
                  <p className="text-center text-muted mt-5 mb-0">
                    New here ?
                    <Link to="/signup" className="fw-bold text-body">
                      <u>Sign up here</u>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popup
        text={props.authError !== null ? props.authError : "Signed In"}
        handleClose={handleClose}
        open={open}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { authError: state.auth.authError };
};
export default connect(mapStateToProps, { signIn })(SignInPage);
