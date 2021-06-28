import React from "react";
import "./css/intro.css";
function Intro() {
  return (
    <section id="intro">
      <div className="services">
        <p>
          <i class="fas fa-bolt"></i> <h1>CONVENIENT SUBSCRIPTION OPTIONS</h1>
        </p>
        <p>
          <i class="far fa-star"></i>
          <h1>1 MILLION+ HAPPY CUSTOMERS</h1>
        </p>
        <p>
          <i class="far fa-clock"></i>
          <h1>24/7 SUPPORT</h1>
        </p>
      </div>
      <div className="intro-banner">
        <div className="banner-content">
          <h1>Formulated For Guys, By Guys</h1>
          <p>
            Rebel Grooming products are formulated based on the input of
            thousands of guys all over the world. Carefully crafted, tested and
            perfected for your styling needs.
          </p>
          <button className="button-1">Shop Now</button>
        </div>
      </div>
    </section>
  );
}

export default Intro;
