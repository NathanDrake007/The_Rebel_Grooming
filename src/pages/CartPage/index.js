import React from "react";
import { connect } from "react-redux";
import ProductListItem from "../../components/ProductListItem";
import { Link, useHistory } from "react-router-dom";
import "./cart_page.css";
function CartPage(props) {
  const history = useHistory();
  const renderCart = () => {
    return (
      <div className="row">
        <div className="col-md-8 cart">
          <div className="title">
            <div className="row">
              <div className="col">
                <h4>
                  <b>Shopping Cart</b>
                </h4>
              </div>
              <div className="col align-self-center text-right text-muted">
                {props.products.length}
              </div>
            </div>
          </div>
          {props.products.map((product) => (
            <ProductListItem
              id={product.id}
              title={product.title}
              subTitle={product.feature}
              price={product.price}
              image={product.image}
              quantity={product.quantity}
              key={product.id}
            />
          ))}
          <div className="back-to-shop">
            <button onClick={() => history.goBack()} className="cartAnchor">
              <i class="fas fa-arrow-left"></i>
            </button>
            <span className="text-muted">Back to shop</span>
          </div>
        </div>
        <div className="col-md-4 summary">
          <div>
            <h5>
              <b>Summary</b>
            </h5>
          </div>
          <hr className="cartHr" />
          <div className="row">
            <div className="col" style={{ paddingLeft: "0px" }}>
              ITEMS {props.products.length}
            </div>
            <div className="col text-right">&#8377; {props.totalPrice}</div>
          </div>
          <form className="cartForm">
            <p>SHIPPING</p>
            <p>GIVE CODE</p>
            <input
              className="cartInput"
              id="code"
              placeholder="Enter your code"
            />
          </form>
          <div
            className="row"
            style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}
          >
            <div className="col">TOTAL PRICE</div>
            <div className="col text-right">&#8377; {props.totalPrice}</div>
          </div>
          <Link to="/checkout" className="cartBtn">
            CHECKOUT
          </Link>
        </div>
      </div>
    );
  };
  const renderEmptyCart = () => {
    return (
      <div className="text-center p-5">
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
          <h5 className="fs-5 fw-light">continue shopping.</h5>
        )}
        <Link to="/" className="btn btn-secondary btn-lg">
          Continue Shopping
        </Link>
      </div>
    );
  };
  return (
    <div className="card mx-auto">
      {props.products.length === 0 ? renderEmptyCart() : renderCart()}
    </div>
  );
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
