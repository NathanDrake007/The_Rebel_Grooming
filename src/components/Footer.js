import React from "react";
import "./css/footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-banner">
          <img src="pictures/logo.png" alt="logo" className="footer-logo" />
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
          <ul className="footer-item">
            <h3 className="footer-heading">INFORMATION</h3>
            <hr className="footerItem-line" />
            <li>Contact Us</li>
            <li>Store Locator</li>
            <li>Terms & Conditions</li>
            <li>Returns</li>
            <li>FAQs</li>
            <li>About Us</li>
          </ul>
          <ul className="footer-item">
            <h3 className="footer-heading">CUSTOMER CARE</h3>
            <hr className="footerItem-line" />
            <li>Contact Us</li>
            <li>Store Locator</li>
            <li>Terms & Conditions</li>
            <li>Returns</li>
            <li>FAQs</li>
            <li>About Us</li>
          </ul>
          <div className="footer-item">
            <h3 className="footer-heading">GET THE NEW REBEL APP TODAY.</h3>
            <hr className="footerItem-line" />
            <p>Tap into a better shopping experience.</p>
          </div>
          <div className="footer-item">
            <h3 className="footer-heading">NEWSLETTER</h3>
            <hr className="footerItem-line" />
            <p className="footer-input">
              <i class="fa fa-envelope icon"></i>
              <input type="text" placeholder="Your Email Address" />
            </p>
            <button type="button" class="button-1">
              SIGN UP
            </button>
          </div>
        </div>
        <p className="footer-copyright">
          Copyright © 2021 REBEL GROOMING. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
