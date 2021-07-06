import React from "react";
import { Link } from "react-router-dom";
import "./css/product.css";
function Product({ title, description, image }) {
  return (
    <div className="col-md-6">
      <div
        className="product-small"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h3>{title}</h3>
        <h4>{description}</h4>
        <div class="links small-link-margin">
          <Link className="learn-more">
            Learn more &nbsp;<i class="fa fa-angle-right"></i>
          </Link>
          <Link>
            Buy&nbsp;<i class="fa fa-angle-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Product;
