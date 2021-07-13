import React from "react";
import logo from "../../assets/pictures/logo.png";
import { Link } from "react-router-dom";
import "./footer.css";
function Footer() {
  return (
    <footer>
      <div className="footer-wrap">
        <div className="container first_class">
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <h3>BE THE FIRST TO KNOW</h3>
              <p>
                Get all the latest information on Reble Products, Posts and
                Events. Sign up for our newsletter today.
              </p>
            </div>
            <div className="col-md-4 col-sm-6">
              <form className="newsletter">
                <input type="text" placeholder="Email Address" />
                <button className="newsletter_submit_btn" type="submit">
                  <i class="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="col-md-12">
                <div className="standard_social_links">
                  <div>
                    <li className="round-btn btn-facebook">
                      <a href="https://www.instagram.com/">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="round-btn btn-linkedin">
                      <a href="https://www.instagram.com/">
                        <i
                          className="fab fa-linkedin-in"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </li>
                    <li className="round-btn btn-twitter">
                      <a href="https://www.instagram.com/">
                        <i className="fab fa-twitter" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li className="round-btn btn-instagram">
                      <a href="https://www.instagram.com/">
                        <i className="fab fa-instagram" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li className="round-btn btn-whatsapp">
                      <a href="https://www.instagram.com/">
                        <i className="fab fa-whatsapp" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li className="round-btn btn-envelop">
                      <a href="https://www.instagram.com/">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                      </a>
                    </li>
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="col-md-12">
                <h3 style={{ textAlign: "right" }}>Stay Connected</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="second_class">
          <div className="container second_class_bdr">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="footer-logo">
                  <img src={logo} alt="logo" width="75" />
                </div>
                <p>Laborum nostrud ex esse sit exercitation reprehenderit.</p>
              </div>
              <div className="col-md-2 col-sm-6">
                <h3>Quick LInks</h3>
                <ul className="footer-links">
                  <li>
                    <Link>Home</Link>
                  </li>
                  <li>
                    <Link>About us</Link>
                  </li>
                  <li>
                    <Link>Triedge Partners</Link>
                  </li>
                  <li>
                    <Link>Contact Us</Link>
                  </li>
                  <li>
                    <Link target="_blank">Terms &amp; Conditions</Link>
                  </li>
                  <li>
                    <Link target="_blank">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link>Sitemap</Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 col-sm-6">
                <h3>OUR SERVICES</h3>
                <ul className="footer-category">
                  <li>
                    <Link>Fresher Jobs</Link>
                  </li>
                  <li>
                    <Link>InternEdge - Internships &amp; Projects </Link>
                  </li>
                  <li>
                    <Link>Resume Edge - Resume Writing Services</Link>
                  </li>
                  <li>
                    <Link>Readers Galleria - Curated Library</Link>
                  </li>
                  <li>
                    <Link>Trideus - Campus Ambassadors</Link>
                  </li>
                </ul>
                <div className="clearfix"></div>
              </div>
              <div className="col-md-3 col-sm-6">
                <h3>triedge Events</h3>
                <ul className="footer-links">
                  <li>
                    <Link>Triedge Events</Link>
                  </li>

                  <li>
                    <Link>Jobs &AMP; Internship Fair 2019</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="container-fluid">
            <div className="copyright">
              Copyright 2019 | All Rights Reserved by The Rebel Grooming & Co.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
