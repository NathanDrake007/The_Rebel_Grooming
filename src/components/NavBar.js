import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/pictures/logo.png";
import "./css/navbar.css";
import { signOut } from "../redux/actions/authActions";
import { connect } from "react-redux";
function NavBar(props) {
  return (
    <nav className="navbar navbar-dark navbar-expand-md fixed-top bg-dark">
      <div className="container">
        <button
          data-bs-toggle="collapse"
          className="navbar-toggler"
          data-bs-target="#navcol-1"
        >
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="navbar-nav flex-grow-1 justify-content-between">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                <img
                  className="rounded-circle img-fluid"
                  src={logo}
                  width="25"
                  height="25"
                  alt="logo"
                />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link text-white">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link text-white">
                BLOG
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/cart">
                <i className="fa fa-shopping-bag"></i>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-user"></i>
              </span>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link to="/orders" className="dropdown-item">
                    Orders
                  </Link>
                </li>
                <li>
                  {props.isSignedIn ? (
                    <button className="dropdown-item" onClick={props.signOut}>
                      Sign out
                    </button>
                  ) : (
                    <Link className="dropdown-item" to="/signin">
                      Sign In
                    </Link>
                  )}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, { signOut })(NavBar);
