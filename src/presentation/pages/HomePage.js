import React from "react";
import Hair from "../components/Hair";
import Intro from "../components/Intro";
import Face from "../components/Face";
import Beard from "../components/Beard";
import "./page.css";
function HomePage() {
  return (
    <div className="homePage">
      <div className="homePage-banner"></div>
      <Intro />
      <Hair />
      <Face />
      <Beard />
    </div>
  );
}

export default HomePage;
