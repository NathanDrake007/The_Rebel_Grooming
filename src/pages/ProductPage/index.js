import React, { useState, useEffect } from "react";
import { firestore } from "../../utils/firebase";
import Banner from "../../components/Banner";

import "./product_page.css";
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

  const handleBuy = () => {
    // props.addToCart({ ...props.product, quantity: 1 });
    // console.log({ userId: props.userId, product: title });
  };
  const renderPage = () => {
    return (
      <div className="productPage">
        <Banner title={product.title} description={product.feature} />
        <div className="row">
          <div className="col-md-12">
            <div className="container my-3 d-flex align-items-center flex-row-reverse bg-white justify-content-around">
              <img src={product.image} alt="feature-1" width="500" />
              <div className="text-center">
                <h1 className="fs-1">{product.title}</h1>
                <p className="fs-5">{product.description_1}</p>
                <span
                  onClick={handleBuy}
                  style={{ cursor: "pointer", color: "lightblue" }}
                >
                  Buy&nbsp;<i class="fa fa-angle-right"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="container">
              <div className="row">
                <div
                  className="col p-4 bg-white me-3"
                  style={{ height: "600px" }}
                >
                  <div
                    className="h-100 text-center"
                    style={{
                      backgroundImage: `url(${product.image})`,
                      backgroundPosition: "top",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <h2 className="fs-2">{product.title}</h2>
                    <h5 className="fs-5">{product.description_2}</h5>
                    <div class="links small-link-margin">
                      <span
                        onClick={handleBuy}
                        style={{ cursor: "pointer", color: "blue" }}
                      >
                        Buy&nbsp;<i class="fa fa-angle-right"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col p-4 bg-white" style={{ height: "600px" }}>
                  <div
                    className="h-100 text-center"
                    style={{
                      backgroundImage: `url(${product.image})`,
                      backgroundPosition: "top",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <h2 className="fs-2">{product.title}</h2>
                    <h5 className="fs-5">{product.description_3}</h5>
                    <div class="links small-link-margin">
                      <span
                        onClick={handleBuy}
                        style={{ cursor: "pointer", color: "blue" }}
                      >
                        Buy&nbsp;<i class="fa fa-angle-right"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="container my-3 d-flex align-items-center flex-row-reverse bg-white justify-content-around">
              <img src={product.image} alt="feature-1" width="500" />
              <div className="text-center">
                <h1 className="fs-1">{product.title}</h1>
                <p className="fs-5">{product.description_1}</p>
                <span
                  onClick={handleBuy}
                  style={{ cursor: "pointer", color: "lightblue" }}
                >
                  Buy&nbsp;<i class="fa fa-angle-right"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return product ? renderPage() : <div>Loading......</div>;
}

export default ProductPage;
