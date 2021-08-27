import React from "react";
import HairPomadeIcon from "../../assets/pictures/hairPomadeFront.png";
import { connect } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/actions/cartActions";
function CartTile(props) {
  const { title, size, price, quantity, id } = props.product;
  return (
    <div className="container color-1">
      <div className="row align-items-center">
        <div className="col-4 col-md-2">
          <img
            src={HairPomadeIcon}
            alt={title}
            className="img-fluid"
            width="100"
          />
        </div>
        <div className="col-6 col-md-9">
          <div className="row align-items-center justify-content-between">
            <div className="col-md-3 text-center">
              <h4>{title}</h4>
              <p>SIZE : {size}gm</p>
            </div>
            <div className="col-md-3 mb-3">
              <div className="d-flex bgcolor-4 justify-content-between align-items-center">
                <button
                  type="button"
                  className="btn button bgcolor-3 fw-bolder"
                  onClick={() => props.decreaseQuantity(id)}
                >
                  -
                </button>
                <h4 className="m-1">{quantity}</h4>
                <button
                  type="button"
                  className="btn button bgcolor-3 fw-bolder"
                  onClick={() => props.increaseQuantity(id)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <h4>&#8377;{price}</h4>
            </div>
          </div>
        </div>
        <div className="col-2 col-md-1">
          <button
            type="button"
            className="btn button"
            onClick={() => props.removeFromCart(id)}
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
}
export default connect(null, {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
})(CartTile);
