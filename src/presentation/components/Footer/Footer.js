import React from "react";
import "./footer.css";
function Footer() {
  return (
    <footer className="footer container-fluid bg-dark text-light">
      <div className="footer-banner">
        <img src="pictures/Logo-1.png" alt="logo" className="footer-logo" />
        <ul>
          <li>
            <i class="fab fa-facebook"></i>
          </li>
          <li>
            <i class="fab fa-twitter"></i>
          </li>
          <li>
            <i class="fab fa-instagram"></i>
          </li>
        </ul>
      </div>
      <div className="footer-content">
        <div className="footer-item">
          <ul>
            <h3>INFORMATION</h3>
            <hr />
            <li>Contact Us</li>
            <li>Store Locator</li>
            <li>Terms & Conditions</li>
            <li>Returns</li>
            <li>FAQs</li>
            <li>About Us</li>
          </ul>
        </div>
        <div className="footer-item">
          <ul>
            <h3>CUSTOMER CARE</h3>
            <hr />
            <li>Contact Us</li>
            <li>Store Locator</li>
            <li>Terms & Conditions</li>
            <li>Returns</li>
            <li>FAQs</li>
            <li>About Us</li>
          </ul>
        </div>
        <div className="footer-item">
          <form>
            <h3>NEWSLETTER</h3>
            <hr />
            <div className="footer-input">
              <i class="fa fa-envelope icon"></i>
              <input type="text" placeholder="Your Email Address" />
              <span></span>
            </div>
            <button type="button" class="btn footer-button">
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
