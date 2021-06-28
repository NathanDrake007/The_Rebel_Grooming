import React from "react";
import Banner from "../components/Banner";
function ProductPage() {
  return (
    <div className="productPage">
      <Banner
        title="Lip Balm"
        description={
          "Reprehenderit cillum fugiat ipsum nostrud reprehenderit cillum Lorem sint fugiat eiusmod ullamco mollit sint. Ipsum laborum sit in minim sit deserunt reprehenderit cillum qui tempor laboris aliqua qui sint. Exercitation anim velit aliquip aliquip veniam exercitation anim sit. Sunt fugiat ullamco elit ullamco cupidatat exercitation aliquip magna pariatur Lorem pariatur mollit duis irure. Sint mollit elit aute ex. Eiusmod officia nulla reprehenderit amet exercitation voluptate deserunt."
        }
      />
      <div className="feature">
        <img src="" alt="feature-1" />
        <p></p>
      </div>
      <div className="feature right">
        <img src="" alt="feature-1" />
        <p></p>
      </div>
      <div className="feature">
        <img src="" alt="feature-1" />
        <p></p>
      </div>
      <div className="feature right">
        <img src="" alt="feature-1" />
        <p></p>
      </div>
    </div>
  );
}

export default ProductPage;
