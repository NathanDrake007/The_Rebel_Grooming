import React from "react";
import logo from "../assets/pictures/logo.png";
import "./css/footer.css";
function Footer() {
  return (
    <footer className="bg-dark">
      <div className="container d-flex d-sm-flex d-xxl-flex flex-column align-items-center align-items-sm-center justify-content-xxl-center align-items-xxl-center">
        <img className="img-fluid" src={logo} width="100px" alt="logo" />
        <div className="social-icons text-white">
          <a href="https://twitter.com" className="me-4 text-white fs-3">
            <i className="icon fab fa-twitter"></i>
          </a>
          <a href="https://twitter.com" className="me-4 text-white fs-3">
            <i className="icon fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" className="me-4 text-white fs-3">
            <i className="icon fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com" className="me-4 text-white fs-3">
            <i className="icon fab fa-youtube"></i>
          </a>
        </div>
      </div>
      <div className="container text-white p-5">
        <div className="row row-cols-lg-4 row-cols-2">
          <div className="col">
            <h2>INFORMATION</h2>
            <ul className="footer-list">
              <li className="footer-list-item">Contact Us</li>
              <li className="footer-list-item">Store Locator</li>
              <li className="footer-list-item">Terms & Conditions</li>
              <li className="footer-list-item">Returns</li>
              <li className="footer-list-item">FAQs</li>
              <li className="footer-list-item">About Us</li>
            </ul>
          </div>
          <div className="col">
            <h2>INFORMATION</h2>
            <ul className="footer-list">
              <li className="footer-list-item">Contact Us</li>
              <li className="footer-list-item">Store Locator</li>
              <li className="footer-list-item">Terms & Conditions</li>
              <li className="footer-list-item">Returns</li>
              <li className="footer-list-item">FAQs</li>
              <li className="footer-list-item">About Us</li>
            </ul>
          </div>
          <div className="col">
            <h2>GET THE NEW REBEL APP TODAY.</h2>
            <h3>Tap into a better shopping experience.</h3>
          </div>
          <div className="col">
            <h2>NEWSLETTER</h2>
            <form>
              <i className="fa fa-envelope icon"></i>
              <input
                type="text"
                placeholder="Your Email Address"
                className="form-control mb-2"
              />
              <button type="button" className="btn btn-danger btn-lg">
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container w-75 text-white text-center border-top border-4 pb-5 pt-2 fs-6">
        Copyright © 2021 REBEL GROOMING. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
