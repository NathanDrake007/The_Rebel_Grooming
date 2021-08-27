import React, { useState, useEffect } from "react";
import { firestore } from "../../utils/firebase";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import Footer from "../../components/Footer";
import Navbar from "../../components/NavBar";
import hairPutty from "../../assets/pictures/hairPutty-1.jpg";
import htuDisplay from "../../assets/pictures/htuDisplay.jpg";
import "./product_page.css";
import Loading from "../../components/Loading";

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

  const addToCart = () => {
    props.addToCart({ ...product, quantity: 1 });
  };
  const renderPage = () => {
    return (
      <>
        <Navbar />
        <div className="position-fixed bottom-0 p-3 bgcolor-2 row w-100 color-1 align-items-center">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <h1 className="me-3">{product.title.toUpperCase()}</h1>
            <p className="fs-5 me-2">
              <s className="text-danger">&#8377;750</s>
            </p>
            <p className="fs-2 me-2 text-white fw-bold">
              &#8377;{product.price} only
            </p>
            <p className="fs-5">{product.size}gms</p>
          </div>
          <div className="col-md-6 justify-content-center d-flex">
            <button type="button" className="button-1">
              BUY NOW
            </button>
            <button type="button" className="button-2" onClick={addToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="container">
          <div className="container-fluid my-5">
            <div className="row">
              <div className="col-12 d-block d-md-none d-xl-none mb-3">
                <img
                  src={hairPutty}
                  alt="img-2"
                  className="image-fluid"
                  width="100%"
                />
              </div>
              <div className="col-md-6 col-12">
                <h1 className="fs-1">NATURAL SHINE</h1>
                <p className="fs-4">{product.description_1}</p>
                <h1 className="fs-1">MADE WITH..</h1>
                <p className="fs-4">{product.description_2}</p>
                <h1 className="fs-1">SMOOTH HAIR</h1>
                <p className="fs-4">{product.description_3}</p>
                <h1 className="fs-1">EFFORTLESS STYLE</h1>
                <p className="fs-4">{product.description_4}</p>
              </div>
              <div className="col-md-6 position-relative d-none d-md-block d-xl-block">
                <img
                  src={hairPutty}
                  alt="img-1"
                  className="image-fluid rounded-circle position-absolute top-0 end-0 z-index-2"
                  width="150"
                  height="150"
                />
                <img
                  src={hairPutty}
                  alt="img-2"
                  className="image-fluid position-absolute top-0 m-5 end-0 z-index-1"
                  width="500"
                />
                <img
                  src={hairPutty}
                  alt="img-3"
                  className="image-fluid position-absolute top-50 end-0 mt-5 z-index-0"
                  width="200"
                />
              </div>
            </div>
          </div>
          <img src={htuDisplay} alt="displayheading-1" className="img-fluid" />
          <div className="container">
            <div className="row">
              <div className="col-md-6 color-1">
                <h1>ON THE GO STYLING</h1>
                {product.HTU.st1.map((step, index) => (
                  <p className="fs-5">
                    <strong className="fs-4 me-2">Step {index + 1}</strong>
                    {step}
                  </p>
                ))}
              </div>
              <div className="col-md-6 color-1">
                <h1>PROFESSIONAL STYLING</h1>
                {product.HTU.st2.map((step, index) => (
                  <p className="fs-5">
                    <strong className="fs-4 me-2">Step {index + 1}</strong>
                    {step}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="container-fluid d-md-flex py-5">
            <img
              src={hairPutty}
              alt="img-2"
              className="image-fluid d-block d-md-none d-xl-none"
              width="100%"
            />
            <img
              src={hairPutty}
              alt="img-2"
              className="image-fluid flex-fill d-none d-md-block d-xl-block"
              width="500"
            />
            <img
              src={hairPutty}
              alt="img-2"
              className="image-fluid flex-fill d-none d-md-block d-xl-block"
              width="500"
            />
          </div>
          <div className="container p-5 d-flex flex-column flex-md-row color-1 my-2 justify-content-center align-items-md-end">
            <h1 className="me-3 ">INGREDIENTS</h1>
            <p className="fs-4">
              beeswax,kaolin clay, shea butter, jojoba oil, vitamin e oil
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  };

  return product ? renderPage() : <Loading />;
}

export default connect(null, { addToCart })(ProductPage);
