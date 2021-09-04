import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import OrderTile from "../../components/OrderTile";
import { firestore } from "../../utils/firebase";
import DataErrorPage from "../DataErrorPage";

function OrderPage(props) {
  const [orders, setOrders] = useState([]);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    async function fetchProducts() {
      var temp = [];
      await firestore
        .collection("orders")
        .where("userId", "==", props.userId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            temp.push({ id: doc.id, ...doc.data() });
          });
        })
        .catch((error) => setHasError(true));
      setOrders(temp);
    }
    fetchProducts();
  }, [props.userId]);
  const renderOrderPage = () => {
    return (
      <div className="container">
        <h1>Your Orders</h1>
        <hr />
        {orders.map((order) => (
          <OrderTile order={order} key={order.id} />
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
  return hasError ? (
    <DataErrorPage />
  ) : orders.length !== 0 ? (
    renderOrderPage()
  ) : (
    renderEmptyPage()
  );
}
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
  };
};
export default connect(mapStateToProps, null)(OrderPage);
