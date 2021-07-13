import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const MainLayout = (props) => {
  return (
    <div>
      <NavBar {...props} />
      <div className="main">{props.children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
