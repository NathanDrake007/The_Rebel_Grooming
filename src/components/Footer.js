import React from "react";
import logo from "../assets/pictures/logo.png";
import "./css/footer.css";
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
                      <a href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="round-btn btn-linkedin">
                      <a href="#">
                        <i
                          className="fab fa-linkedin-in"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </li>
                    <li className="round-btn btn-twitter">
                      <a href="#">
                        <i className="fab fa-twitter" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li className="round-btn btn-instagram">
                      <a href="#">
                        <i className="fab fa-instagram" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li className="round-btn btn-whatsapp">
                      <a href="#">
                        <i className="fab fa-whatsapp" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li className="round-btn btn-envelop">
                      <a href="#">
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
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">About us</a>
                  </li>
                  <li>
                    <a href="#">Triedge Partners</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#">Sitemap</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 col-sm-6">
                <h3>OUR SERVICES</h3>
                <ul className="footer-category">
                  <li>
                    <a href="#">Fresher Jobs</a>
                  </li>
                  <li>
                    <a href="#">InternEdge - Internships &amp; Projects </a>
                  </li>
                  <li>
                    <a href="#">Resume Edge - Resume Writing Services</a>
                  </li>
                  <li>
                    <a href="#">Readers Galleria - Curated Library</a>
                  </li>
                  <li>
                    <a href="#">Trideus - Campus Ambassadors</a>
                  </li>
                </ul>
                <div className="clearfix"></div>
              </div>
              <div className="col-md-3 col-sm-6">
                <h3>triedge Events</h3>
                <ul className="footer-links">
                  <li>
                    <a href="#">Triedge Events</a>
                  </li>

                  <li>
                    <a href="#">Jobs &AMP; Internship Fair 2019</a>
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
