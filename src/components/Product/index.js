import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./product.css";

function Product(props) {
  const { title, image, id, feature } = props.product;
  const url = `/product/${id}`;
  return (
    <>
      <div
        className={
          props.rev
            ? "col-md-6 order-md-2 product-image-background"
            : "col-md-6 order-md-1 product-image-background"
        }
      >
        <img src={image} alt={title} className="product-image" />
      </div>
      <div
        className={props.rev ? "col-md-6 order-md-1" : "col-md-6 order-md-2"}
      >
        <div className="container color-1 h-100 ms-2 mt-3  d-flex flex-column justify-content-center align-items-start">
          <h1 className="fs-1">{title.toUpperCase()}</h1>
          <h3 className="fs-3">{feature}</h3>
          <Link to={url} className="btn button bgcolor-1 fs-3 mb-4">
            Learn more
          </Link>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return { userId: state.auth.userId };
};
export default connect(mapStateToProps, null)(Product);
