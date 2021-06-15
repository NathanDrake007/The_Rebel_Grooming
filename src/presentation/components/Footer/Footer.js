import React from "react";
import "./footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-banner">
        <img src="" alt="logo" className="footer-logo" />
        <ul>
          <li>
            <span className=""></span>
          </li>
          <li>
            <span className=""></span>
          </li>
          <li>
            <span className=""></span>
          </li>
        </ul>
      </div>
      <div className="footer-content">
        <div className="footer-item">
          <h3>INFORMATION</h3>
          <hr />
          <ul>
            <li>Contact Us</li>
            <li>Store Locator</li>
            <li>Terms & Conditions</li>
            <li>Returns</li>
            <li>FAQs</li>
            <li>About Us</li>
          </ul>
        </div>
        <div className="footer-item">
          <h3>CUSTOMER CARE</h3>
          <hr />
          <ul>
            <li>Contact Us</li>
            <li>Store Locator</li>
            <li>Terms & Conditions</li>
            <li>Returns</li>
            <li>FAQs</li>
            <li>About Us</li>
          </ul>
        </div>
        <div className="footer-item">
          <h3>NEWSLETTER</h3>
          <hr />
          <form>
            <input type="text" placeholder="Your Email Address" />
            <button type="submit">SIGN UP</button>
          </form>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
