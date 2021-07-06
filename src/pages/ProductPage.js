import React from "react";
import data from "../helper/data";
import Banner from "../components/Banner";

import "./css/product_page.css";
function ProductPage(props) {
  console.log(props);
  const product = data.find((item) => item.id === props.match.params.id);
  return (
    <div className="productPage">
      <Banner title={product.title} description={product.description} />
      <div className="feature">
        <img src={product.image} alt="feature-1" className="feature-image" />
        <p>{product.feature1}</p>
      </div>
      <div className="feature right">
        <img src={product.image} alt="feature-1" className="feature-image" />
        <p>{product.feature2}</p>
      </div>
      <div className="feature">
        <img src={product.image} alt="feature-1" className="feature-image" />
        <p>{product.feature3}</p>
      </div>
      <div className="feature right">
        <img src={product.image} alt="feature-1" className="feature-image" />
        <p>{product.feature4}</p>
      </div>
    </div>
  );
}

export default ProductPage;
