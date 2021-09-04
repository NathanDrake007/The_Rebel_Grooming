import React, { useState, useEffect } from "react";
import { firestore } from "../../utils/firebase";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import Footer from "../../components/Footer";
import Navbar from "../../components/NavBar";
import htuDisplay from "../../assets/pictures/htuDisplay.jpg";
import Loading from "../../components/Loading";
import Popup from "../../components/Popup";
import DataErrorPage from "../DataErrorPage";
import { useHistory } from "react-router-dom";

function ProductPage(props) {
  const [product, setProduct] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [hasError, setHasError] = useState(false);
  const history = useHistory();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    async function fetchProducts() {
      await firestore
        .collection("products")
        .doc(props.match.params.id)
        .get()
        .then((doc) => {
          setProduct({ id: doc.id, ...doc.data() });
        })
        .catch((error) => {
          setHasError(true);
        });
    }
    fetchProducts();
  }, [props.match.params.id]);

  const addToCart = () => {
    props.addToCart({ id: product.id, quantity: 1 });
    setOpen(true);
  };
  const handleBuy = () => {
    props.addToCart({ id: product.id, quantity: 1 });
    history.push("/checkout");
  };
  const renderPage = () => {
    return (
      <>
        <Navbar />
        <div className="position-fixed bottom-0 p-3 ms-0 bgcolor-2 row w-100 color-1 align-items-center z-index-2">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <h1 className="me-3">{product.title.toUpperCase()}</h1>
            <p className="fs-5 me-2">
              <s className="text-danger">&#8377;{product.mrp}</s>
            </p>
            <p className="fs-2 me-2 text-white fw-bold">
              &#8377;{product.price} only
            </p>
            <p className="fs-5">{product.size}</p>
          </div>
          <div className="col-md-6 justify-content-center d-flex">
            <button type="button" className="button-1" onClick={handleBuy}>
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
              <div className="col-12 d-block d-xl-none mb-3">
                <img
                  src={product.images[1]}
                  alt="img-2"
                  className="image-fluid"
                  width="100%"
                />
              </div>
              <div className="col-md-6 col-12">
                <h1 className="fs-1">{product.subtitles[0]}</h1>
                <p className="fs-4">{product.description_1}</p>
                <h1 className="fs-1">{product.subtitles[1]}</h1>
                <p className="fs-4">{product.description_2}</p>
                <h1 className="fs-1">{product.subtitles[2]}</h1>
                <p className="fs-4">{product.description_3}</p>
                <h1 className="fs-1">{product.subtitles[3]}</h1>
                <p className="fs-4">{product.description_4}</p>
              </div>
              <div className="col-md-6 position-relative d-none d-xl-block">
                <img
                  src={product.images[0]}
                  alt="img-1"
                  className="image-fluid rounded-circle position-absolute top-0 end-0 z-index-2"
                  width="200"
                  height="150"
                />
                <img
                  src={product.images[1]}
                  alt="img-2"
                  className="image-fluid position-absolute top-0 m-5 end-0 z-index-1"
                  width="500"
                />
                <img
                  src={product.images[2]}
                  alt="img-3"
                  className="image-fluid z-index-0"
                  width="300"
                  style={{ position: "absolute", right: "-20px", top: "300px" }}
                />
              </div>
            </div>
          </div>
          <img src={htuDisplay} alt="displayheading-1" className="img-fluid" />
          <div className="container ">
            <div
              className={
                product.HTU.st2 === null
                  ? "row justify-content-center text-center"
                  : "row"
              }
            >
              <div className="col-md-6 color-1 ">
                <h1>ON THE GO STYLING</h1>
                {product.HTU.st1.map((step, index) => (
                  <p className="fs-5" key={`st1-${index}`}>
                    <strong className="fs-4 me-2">Step {index + 1}</strong>
                    {step}
                  </p>
                ))}
              </div>
              {product.HTU.st2 !== null ? (
                <div className="col-md-6 color-1">
                  <h1>PROFESSIONAL STYLING</h1>
                  {product.HTU.st2.map((step, index) => (
                    <p className="fs-5" key={`st2-${index}`}>
                      <strong className="fs-4 me-2">Step {index + 1}</strong>
                      {step}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <div className="container-fluid d-md-flex py-5">
            <img
              src={product.model_1}
              alt="img-2"
              className="image-fluid d-block d-md-none d-xl-none"
              width="100%"
            />
            <img
              src={product.model_1}
              alt="img-2"
              className="image-fluid flex-fill d-none d-md-block d-xl-block"
              width="500"
            />
            <img
              src={product.model_2}
              alt="img-2"
              className="image-fluid flex-fill d-none d-md-block d-xl-block"
              width="500"
            />
          </div>
          <div className="container p-5 d-flex flex-column flex-md-row color-1 my-2 justify-content-center align-items-md-end">
            <h1 className="me-3 ">INGREDIENTS</h1>
            <p className="fs-4">{product.ingredients}</p>
          </div>
        </div>
        <Popup text="Added to Cart" handleClose={handleClose} open={open} />
        <Footer />
      </>
    );
  };

  return hasError ? <DataErrorPage /> : product ? renderPage() : <Loading />;
}

export default connect(null, { addToCart })(ProductPage);
