import React from "react";
import HairPomadeIcon from "../../assets/pictures/hairPomadeFront.png";

function OrderTile(props) {
  const { title, size, price } = props.product;
  return (
    <div className="container color-1">
      <div className="row align-items-center">
        <div className="col-4 col-md-3">
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
            <div className="col-md-3 mb-3">date</div>
            <div className="col-md-3 text-center">
              <h4>&#8377;{price}</h4>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default OrderTile;
