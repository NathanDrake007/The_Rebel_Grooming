import React from "react";
import "./banner.css";

function Banner(props) {
  return (
    <section className="banner">
      <img className="banner-image" src={props.image} alt="banner" />
    </section>
  );
}

export default Banner;
