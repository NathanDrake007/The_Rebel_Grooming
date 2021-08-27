import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./style.css";
import CartTile from "../../components/CartTile";
function CartPage(props) {
  // const history = useHistory();
  const renderCart = () => {
    return (
      <div className="container my-5">
        <h1>Shopping Cart</h1>
        <hr />
        {[props.products.map((product) => <CartTile product={product} />)]}
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
export default connect(mapStateToProps, null)(CartPage);
