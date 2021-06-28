import React from "react";
import "./css/navbar.css";
import { Link } from "react-router-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";
function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-main">
        <Link className="navbar-link">
          <img src="pictures/logoGrey.png" alt="logo" className="navbar-logo" />
        </Link>
        <AnchorLink href="#hair" className="navbar-link">
          Hair
        </AnchorLink>
        <AnchorLink href="#face" className="navbar-link">
          Face
        </AnchorLink>
        <AnchorLink href="#beard" className="navbar-link">
          Beard
        </AnchorLink>
        <Link className="navbar-link">Blog</Link>
        <i class="fas fa-user navbar-link"></i>
        <i class="fas fa-shopping-bag navbar-link"></i>
      </div>
    </nav>
  );
}

export default NavBar;
