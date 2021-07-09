import React, { useState, useEffect } from "react";
import { firestore } from "../helper/firebase";
import Banner from "../components/Banner";

import "./css/product_page.css";
function ProductPage(props) {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    async function fetchProducts() {
      await firestore
        .collection("products")
        .doc(props.match.params.id)
        .get()
        .then((doc) => {
          setProduct(doc.data());
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
    fetchProducts();
  }, [props.match.params.id]);

  const renderPage = () => {
    return (
      <div className="productPage">
        <Banner title={product.title} description={product.feature} />
        <div className="feature">
          <img src={product.image} alt="feature-1" className="feature-image" />
          <p>{product.description_1}</p>
        </div>
        <div className="feature right">
          <img src={product.image} alt="feature-1" className="feature-image" />
          <p>{product.description_2}</p>
        </div>
        <div className="feature">
          <img src={product.image} alt="feature-1" className="feature-image" />
          <p>{product.description_3}</p>
        </div>
        <div className="feature right">
          <img src={product.image} alt="feature-1" className="feature-image" />
          <p>{product.description_4}</p>
        </div>
      </div>
    );
  };
  return product ? renderPage() : <div>Loading......</div>;
}

export default ProductPage;
