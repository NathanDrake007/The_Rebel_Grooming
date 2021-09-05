import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { removeFromCart, setProducts } from "../../redux/actions/cartActions";
import { firestore } from "../../utils/firebase";
import DataErrorPage from "../DataErrorPage";

function CartPage(props) {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [hasError, setHasError] = useState(false);
  const history = useHistory();
  useEffect(() => {
    async function fetchProducts() {
      var temp = [];
      var _totalPrice = 0;
      await firestore
        .collection("products")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const product = props.products.find((p) => p.id === doc.id);
            if (product) {
              const { title, price, size, icon } = doc.data();
              _totalPrice += parseInt(price) * product.quantity;
              temp.push({ title, price, size, icon, ...product });
            }
          });
          setTotalPrice(_totalPrice);
        })
        .catch((error) => setHasError(true));
      setProducts(temp);
    }
    fetchProducts();
  }, [props.products]);

  const handleCheckout = (e) => {
    e.preventDefault();
    var temp = [];
    products.forEach((product) => {
      temp.push({
        id: product.id,
        quantity: product.quantity,
      });
    });
    props.setProducts(temp);
    history.push("/checkout");
  };
  const increaseQuantity = (productId) => {
    var temp = products;
    const index = temp.findIndex((p) => p.id === productId);
    temp[index].quantity += 1;
    setTotalPrice(parseInt(temp[index].price) + totalPrice);
    setProducts(temp);
  };
  const decreaseQuantity = (productId) => {
    var temp = products;
    const index = temp.findIndex((p) => p.id === productId);
    temp[index].quantity -= 1;
    setTotalPrice(totalPrice - parseInt(temp[index].price));
    if (temp[index].quantity === 0) {
      props.removeFromCart(temp[index].id);
    } else {
      setProducts(temp);
    }
  };
  const renderCart = () => {
    return (
      <div className="container my-5">
        <h1>Shopping Cart</h1>
        <hr />
        {products.map((product, index) => (
          <div key={index} className="container color-1">
            <div className="row align-items-center">
              <div className="col-4 col-md-2">
                <img
                  src={product.icon}
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
                        onClick={() => decreaseQuantity(product.id)}
                      >
                        -
                      </button>
                      <h4 className="m-1">{product.quantity}</h4>
                      <button
                        type="button"
                        className="btn button bgcolor-3 fw-bolder"
                        onClick={() => increaseQuantity(product.id)}
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
              <strong className="fs-5">&#8377;{totalPrice}</strong>
            </div>
            <button
              onClick={handleCheckout}
              className="btn button bgcolor-1 w-100"
            >
              Proceed to Checkout
            </button>
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
  return hasError ? (
    <DataErrorPage />
  ) : products.length === 0 ? (
    renderEmptyCart()
  ) : (
    renderCart()
  );
}
const mapStateToProps = (state) => {
  return {
    products: state.cart.products,
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
  };
};
export default connect(mapStateToProps, {
  removeFromCart,
  setProducts,
})(CartPage);
