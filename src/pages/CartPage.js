import React, { useState, useEffect } from "react";
import { firestore } from "../helper/firebase";
import { setCart } from "../redux/actions/cartActions";
import { connect } from "react-redux";
import ProductListItem from "../components/ProductListItem";
import { Link } from "react-router-dom";
import "./css/cart_page.css";
function CartPage(props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      console.log("call");
      if (props.isSignedIn) {
        await firestore
          .collection("cart")
          .doc(props.userId)
          .get()
          .then((querySnapshot) => {
            const data = querySnapshot.data().products;
            if (products.length === 0) {
              props.setCart(data);
            }
            setProducts(data);
          });
      } else {
        setProducts(props.products);
      }
    }
    fetchProducts();
    // eslint-disable-next-line
  }, [props]);
  const totalPrice = () => {
    var sum = 0;
    products.forEach(
      (product) => (sum += parseFloat(product.price) * product.quantity)
    );
    return sum;
  };
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
                {products.length}
              </div>
            </div>
          </div>
          {products.map((product) => (
            <ProductListItem
              id={product.id}
              title={product.title}
              subTitle={product.feature}
              price={product.price}
              image={product.image}
              quantity={product.quantity}
            />
          ))}
          <div className="back-to-shop">
            <button
              onClick={() => props.history.goBack()}
              className="cartAnchor"
              href="#"
            >
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
              ITEMS {products.length}
            </div>
            <div className="col text-right">&#8377; {totalPrice()}</div>
          </div>
          <form className="cartForm">
            <p>SHIPPING</p>
            <select className="cartSelect">
              <option className="text-muted">
                Standard-Delivery- &#8377;5.00
              </option>
            </select>
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
            <div className="col text-right">&#8377; {totalPrice()}</div>
          </div>
          <button className="cartBtn">CHECKOUT</button>
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
      {products.length === 0 ? renderEmptyCart() : renderCart()}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    products: state.cart.products,
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
  };
};
export default connect(mapStateToProps, { setCart })(CartPage);
