import React from "react";
import { Link } from "react-router-dom";
import about1 from "../../assets/pictures/aboutbg-1.jpg";
import about2 from "../../assets/pictures/aboutbg-2.jpg";
import about3 from "../../assets/pictures/aboutbg-3.jpg";
import highlights from "../../assets/pictures/brand-highlights.jpg";
import displayHeading2 from "../../assets/pictures/displayHeading-2.jpg";
import "./style.css";
function AboutPage() {
  return (
    <>
      <div className="container">
        <h1 className="fs-1">WHY REBEL GROOMING?</h1>
        <p className="fs-4">
          the reble grooming co aims at delivering premium grooming,
          stylingOfficia eu et proident nostrud occaecat officia consequat
          adipisicing est est consectetur culpa. Excepteur dolor elit pariatur
          laboris et exercitation cillum consectetur excepteur et do. Duis magna
          ad labore amet dolore anim ea voluptate occaecat non. Nostrud dolor
          amet exercitation nostrud ad fugiat adipisicing reprehenderit
          voluptate ex quis. Veniam incididunt ad officia incididunt laborum do
          et sunt commodo Lorem esse veniam. Cillum magna pariatur proident
          nostrud deserunt quis sit ipsum.
        </p>
        <p className="fs-4">
          the reble grooming co aims at delivering premium grooming, styling
          Consequat ullamco voluptate nisi fugiat esse sit. Dolor culpa magna
          duis ut esse nulla ex ut sint ex reprehenderit ea duis. Ea occaecat
          consequat nostrud cupidatat deserunt culpa pariatur eu aute incididunt
          ut est est. Irure ad tempor ad ullamco Lorem ad.
        </p>
        <p className="fs-4">
          the reble grooming co aims at delivering premium grooming, styling
          Veniam dolor eu anim velit mollit sunt sunt voluptate enim pariatur
          in. Est consectetur commodo irure ex ipsum ipsum do ea sunt incididunt
          ad magna. Ut qui duis ex occaecat ea irure labore cillum nostrud nisi
          voluptate consectetur.
        </p>
        <p className="fs-4">
          the reble grooming co aims at delivering premium grooming, styling
          Quis aliquip dolor id amet quis dolore in consectetur eiusmod ex
          officia proident dolor. Proident nostrud dolore dolor laboris qui
          reprehenderit magna aliqua quis. Quis ad ut est veniam deserunt
          nostrud. Duis ut duis officia anim elit nisi aliquip consequat
          deserunt. Sint incididunt est aute reprehenderit adipisicing enim
          adipisicing. Anim dolor dolore esse culpa excepteur velit in amet
          nostrud esse.
        </p>
      </div>
      <div className="d-none d-xl-block d-md-block">
        <div className="about-container text-white">
          <img src={about1} alt="about1" style={{ width: "100%" }} />
          <div className="wrap">
            <h1>OUR PRODUCTS</h1>
            <p className="fs-3">
              Hair Pomade, Hair Putty, Beard Growth Elixir and More....
            </p>
            <button className="button-3 m-0">View Products</button>
          </div>
        </div>
        <div className="about-container text-white">
          <img src={about2} alt="about1" style={{ width: "100%" }} />
          <div className="wrap-2">
            <h1>OUR BLOGS</h1>
            <p className="fs-3">
              view our blog for more infomation about styling and grooming
            </p>
            <button className="button-3 m-0">View Products</button>
          </div>
        </div>
        <div className="about-container text-white ">
          <img src={about3} alt="about1" style={{ width: "100%" }} />
          <div className="wrap w-25">
            <h1>NEWSLETTER</h1>
            <p>Sign up and be the first to know about our special offers!</p>
            <form className="d-flex">
              <input type="email" className="form-control w-75" />
              <button className="btn bgcolor-2 button w-25">
                View Products
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="d-block d-xl-none d-md-none">
        <img src={about1} alt="about1" style={{ width: "100%" }} />
        <div className="container p-2">
          <h1>OUR PRODUCTS</h1>
          <p className="fs-3">
            Hair Pomade, Hair Putty, Beard Growth Elixir and More....
          </p>
          <Link to="/home" className="button-1 m-0">
            View Products
          </Link>
        </div>
        <img src={about2} alt="about2" style={{ width: "100%" }} />
        <div className="container p-2">
          <h1>OUR BLOGS</h1>
          <p className="fs-3">
            view our blog for more infomation about styling and grooming
          </p>
          <Link to="/blogs" className="button-1 m-0">
            View Blogs
          </Link>
        </div>
        <img src={about3} alt="about3" style={{ width: "100%" }} />
        <div className="container p-2">
          <h1>NEWSLETTER</h1>
          <p>Sign up and be the first to know about our special offers!</p>
          <form className="d-flex">
            <input type="email" className="form-control w-75" />
            <button className="btn bgcolor-2 button w-25">Sign up</button>
          </form>
        </div>
      </div>
      <img src={displayHeading2} alt="displayheading-2" className="img-fluid" />
      <div className="container-fluid bg-white">
        <img src={highlights} alt="highlights" className="img-fluid" />
      </div>
    </>
  );
}

export default AboutPage;
