import React from "react";
import "./banner.css";

function Banner(props) {
  return (
    <section className="banner">
      <div className="">
        <img className="banner-image" src={props.image} alt="banner" />
      </div>
    </section>
  );
}

export default Banner;
