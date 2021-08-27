import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "../../redux/actions/authActions";
import { connect } from "react-redux";

import logo from "../../assets/pictures/logo.png";
import "./navbar.css";

function NavBar(props) {
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container">
        <Link className="nav-link nav-text fs-4" to="/">
          <img
            className="rounded-circle img-fluid"
            src={logo}
            width="70"
            alt="logo"
          />
        </Link>
        <div className="rightNav order-md-2">
          <Link className="nav-link nav-text fs-4" to="/cart">
            <i className="fa fa-shopping-bag"></i>
          </Link>
          <div className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle nav-text fs-4"
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
          </div>
          <button
            data-bs-toggle="collapse"
            className="navbar-toggler"
            data-bs-target="#navcol-1"
          >
            <i className="fas fa-bars nav-text fs-4"></i>
          </button>
        </div>
        <div className="collapse navbar-collapse order-md-1" id="navcol-1">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link to="/" className="nav-text fs-4 nav-link">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-text fs-4 nav-link">
                ABOUT
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/blogs" className="nav-link nav-text fs-4">
                BLOG
              </Link>
            </li>
            <li className="nav-item"></li>
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
