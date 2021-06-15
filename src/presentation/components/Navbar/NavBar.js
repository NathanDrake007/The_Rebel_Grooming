import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link className="navbar-brand">The Rebel Grooming</Link>
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navMenu"
        type="button"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link">Blog</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link">Store</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
