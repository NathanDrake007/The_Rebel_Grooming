import React from "react";
import bg from "../assets/pictures/banner.jpeg";
import "./css/banner.css";
function Banner({ title, description }) {
  return (
    <section className="product">
      <h1>{title}</h1>
      <h2>{description}</h2>
      <img className="img-fluid" src={bg} />
    </section>
  );
}

export default Banner;
