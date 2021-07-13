import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";

import "./product.css";
function Product(props) {
  const { title, image, id, description } = props.product;
  const url = `/product/${id}`;
  const handleBuy = () => {
    props.addToCart({ ...props.product, quantity: 1 });
    console.log({ userId: props.userId, product: title });
  };
  return (
    <div className="col-md-6">
      <div
        className="product-small"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h3>{title}</h3>
        <h4>{description}</h4>
        <div class="links small-link-margin">
          <Link to={url} className="learn-more">
            Learn more &nbsp;<i class="fa fa-angle-right"></i>
          </Link>
          <span
            onClick={handleBuy}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Buy&nbsp;<i class="fa fa-angle-right"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { userId: state.auth.userId };
};
export default connect(mapStateToProps, { addToCart })(Product);
