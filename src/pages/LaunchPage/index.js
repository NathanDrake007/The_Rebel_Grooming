import React from "react";

import "./style.css";
function LaunchPage(props) {
  return (
    <div className="launch-page">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/rebel-grooming.appspot.com/o/Banners%2FLanding%20page.png?alt=media&token=4bea6c71-5fda-41aa-86f0-05cc1751620c"
        alt="background"
        width="100%"
        height="100%"
        style={{ objectFit: "contain" }}
      />
      <button onClick={() => props.setRedirect(true)} className="btn launchBtn">
        Enter The Site
      </button>
    </div>
  );
}

export default LaunchPage;
