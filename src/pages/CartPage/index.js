import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./style.css";
import HairPomadeIcon from "../../assets/pictures/hairPomadeFront.png";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/actions/cartActions";
function CartPage(props) {
  const renderCart = () => {
    console.log("rr", props.products);
    return (
      <div className="container my-5">
        <h1>Shopping Cart</h1>
        <hr />
        {props.products.map((product, index) => (
          <div key={index} className="container color-1">
            <div className="row align-items-center">
              <div className="col-4 col-md-2">
                <img
                  src={HairPomadeIcon}
                  alt={product.title}
                  className="img-fluid"
                  width="100"
                />
              </div>
              <div className="col-6 col-md-9">
                <div className="row align-items-center justify-content-between">
                  <div className="col-md-3 text-center">
                    <h4>{product.title}</h4>
                    <p>SIZE : {product.size}gm</p>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="d-flex bgcolor-4 justify-content-between align-items-center">
                      <button
                        type="button"
                        className="btn button bgcolor-3 fw-bolder"
                        onClick={() => props.decreaseQuantity(product.id)}
                      >
                        -
                      </button>
                      <h4 className="m-1">{product.quantity}</h4>
                      <button
                        type="button"
                        className="btn button bgcolor-3 fw-bolder"
                        onClick={() => props.increaseQuantity(product.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-md-3 text-center">
                    <h4>&#8377;{product.price}</h4>
                  </div>
                </div>
              </div>
              <div className="col-2 col-md-1">
                <button
                  type="button"
                  className="btn button"
                  onClick={() => props.removeFromCart(product.id)}
                >
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
            <hr />
          </div>
        ))}
        <div className="row">
          <div className="col-md-8 d-none d-md-block d-xl-block" />
          <div className="container border-bottom border-secondary border-2 p-3 col-md-4">
            <div className="d-flex mb-3">
              <h4 className="me-3">TOTAL :</h4>
              <strong className="fs-5">&#8377;{props.totalPrice}</strong>
            </div>
            <Link to="/checkout" className="btn button bgcolor-1 w-100">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    );
  };
  const renderEmptyCart = () => {
    return (
      <div className="container text-center p-5">
        <h1 className="fs-1">Your Cart Empty.</h1>
        {!props.isSignedIn ? (
          <>
            <h5 className="fs-5 fw-light">
              Sign in to see if you have any saved items. Or continue shopping.
              Sign In
            </h5>
            <Link to="/signin" className="btn btn-primary m-4 btn-lg">
              Sign In
            </Link>
          </>
        ) : (
          <h5 className="fs-5 fw-light">Shop for products</h5>
        )}
        <Link to="/" className="button-1">
          Continue Shopping
        </Link>
      </div>
    );
  };
  return props.products.length === 0 ? renderEmptyCart() : renderCart();
}
const mapStateToProps = (state) => {
  return {
    products: state.cart.products,
    totalPrice: state.cart.totalPrice,
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
  };
};
export default connect(mapStateToProps, {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
})(CartPage);
