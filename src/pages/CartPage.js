import React, { useState, useEffect } from "react";
import { firestore } from "../helper/firebase";
import { connect } from "react-redux";
import ProductListItem from "../components/ProductListItem";
import "./css/cart_page.css";
function CartPage(props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      var temp = [];
      await firestore
        .collection("products")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            for (let _pro in props.products) {
              const _product = props.products[_pro];
              if (_product.id === doc.id) {
                const { title, feature, price, image } = doc.data();
                temp.push({
                  title,
                  feature,
                  price,
                  image,
                  quantity: _product.quantity,
                  id: doc.id,
                });
                break;
              }
            }
          });
        });
      setProducts(temp);
    }
    fetchProducts();
  }, [props]);
  const totalPrice = () => {
    var sum = 0;
    products.forEach(
      (product) => (sum += parseFloat(product.price) * product.quantity)
    );
    return sum;
  };
  return (
    <div className="card mx-auto">
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
    </div>
  );
}
const mapStateToProps = (state) => {
  return { products: state.cart.products };
};
export default connect(mapStateToProps, null)(CartPage);
