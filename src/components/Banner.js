import React from "react";

function Banner({ title, description }) {
  return (
    <div className="banner">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export default Banner;
