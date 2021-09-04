import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/pictures/logo.png";
function PageError() {
  return (
    <div className="container vh-100 d-flex flex-column justify-content-center color-1 align-items-center">
      <img src={logo} alt="logo" width="150" className="img-fluid" />

      <h1>404 - The page cannot be found</h1>
      <h2>Looks like you have reached uncharted area of the west</h2>
      <Link to="/" className="fs-3">
        Back To Home
      </Link>
    </div>
  );
}

export default PageError;
