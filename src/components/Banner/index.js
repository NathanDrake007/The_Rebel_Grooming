import React from "react";

import "./banner.css";

function Banner({ title, description }) {
  return (
    <section className="banner">
      <div className="container-fluid">
        <img
          className="img-fluid"
          src="https://firebasestorage.googleapis.com/v0/b/rebel-grooming.appspot.com/o/Banners%2FLanding%20page.png?alt=media&token=4bea6c71-5fda-41aa-86f0-05cc1751620c"
          alt="banner"
        />
      </div>
    </section>
  );
}

export default Banner;
