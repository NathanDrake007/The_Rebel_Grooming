import React from "react";
import { connect } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
} from "../redux/actions/cartActions";
function ProductListItem(props) {
  const { title, subTitle, price, image, quantity, id } = props;
  return (
    <div className="row border-top border-bottom">
      <div className="row main align-items-center">
        <div className="col-2">
          <img className="img-fluid cartImage" src={image} alt={title} />
        </div>
        <div className="col">
          <div className="row text-muted">{title}</div>
          <div className="row">{subTitle}</div>
        </div>
        <div className="col">
          <button
            className="cartAnchor"
            onClick={() => props.decreaseQuantity(id)}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="cartAnchor"
            onClick={() => props.increaseQuantity(id)}
          >
            +
          </button>
        </div>
        <div className="col">&#8377; {price * quantity}</div>
      </div>
    </div>
  );
}

export default connect(null, { increaseQuantity, decreaseQuantity })(
  ProductListItem
);
