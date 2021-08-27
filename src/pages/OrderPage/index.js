import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import OrderTile from "../../components/OrderTile";
function OrderPage(props) {
  const renderOrderPage = () => {
    return (
      <div className="container">
        <h1>Your Orders</h1>
        <hr />
        {props.orders.map((order) => (
          <OrderTile order={order} />
        ))}
      </div>
    );
  };
  const renderEmptyPage = () => {
    return (
      <div className="container text-center p-5">
        <h1 className="fs-1">No Orders Yet.</h1>
        {!props.isSignedIn ? (
          <>
            <h5 className="fs-5 fw-light">
              Sign in to see if you have any orders. Or continue shopping.
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
  return props.orders.length !== 0 ? renderOrderPage() : renderEmptyPage();
}
const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    isSignedIn: state.auth.isSignedIn,
  };
};
export default connect(mapStateToProps, null)(OrderPage);
