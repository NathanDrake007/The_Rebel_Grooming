import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/actions/cartActions";

function Product(props) {
  const { title, bannerImage, id, feature } = props.product;
  const url = `/product/${id}`;
  const addToCart = () => {
    props.addToCart({ id: id, quantity: 1 });
    props.setOpen(true);
  };
  return (
    <>
      <div
        className={
          props.rev ? "col-md-6 order-md-2 p-0" : "col-md-6 order-md-1 p-0"
        }
      >
        <img src={bannerImage} alt={title} width="100%" />
      </div>
      <div
        className={props.rev ? "col-md-6 order-md-1" : "col-md-6 order-md-2"}
      >
        <div className="container color-1 h-100 ms-2 mt-3  d-flex flex-column justify-content-center align-items-start">
          <h1 className="fs-1">{title.toUpperCase()}</h1>
          <h3 className="fs-3">{feature}</h3>
          <div className="d-flex justify-content-center">
            <Link to={url} className="button-1">
              Learn more
            </Link>
            <button type="button" className="button-2" onClick={addToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return { userId: state.auth.userId };
};
export default connect(mapStateToProps, { addToCart })(Product);
