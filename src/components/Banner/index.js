import React from "react";
import bg from "../../assets/pictures/banner.jpeg";

import "./banner.css";

function Banner({ title, description }) {
  return (
    <section className="product">
      <h1>{title}</h1>
      <h2>{description}</h2>
      <img className="img-fluid" src={bg} alt="banner" />
    </section>
  );
}

export default Banner;