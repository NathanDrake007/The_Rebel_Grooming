import React, { useEffect, useState } from "react";
import icon from "../../assets/pictures/logo.png";
import { firestore } from "../../utils/firebase";

function OrderTile(props) {
  const { orderTotal, id, paymentMode, date, orderItems } = props.order;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      var temp = [];
      await firestore
        .collection("products")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const product = orderItems.find((p) => p.id === doc.id);
            if (product) {
              const { title, price, size, icon } = doc.data();
              temp.push({
                title,
                size,
                icon,
                ...product,
                price: parseInt(price) * product.quantity,
              });
            }
          });
        });
      setProducts(temp);
    }
    fetchProducts();
  }, [orderItems]);
  return (
    <div className="accordion" id={id}>
      <div className="col-12">
        <button
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#accord${id}`}
          className="accord-button p-0"
        >
          <div className="row color-1">
            <div className="col">
              <img
                src={icon}
                alt="order-icon"
                className="img-fluid"
                width="50"
              />
            </div>
            <div className="col">
              <h4>Order ID : {id}</h4>
              <p>Payment type : {paymentMode}</p>
            </div>
            <div className="col">{date}</div>
            <div className="col">&#8377;{orderTotal}</div>
            <div className="col">
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </button>
        <div
          className="collapse text-center"
          id={`accord${id}`}
          data-parent={`#${id}`}
        >
          {products.map((product) => (
            <div className="row color-1" key={product.id}>
              <div className="col">
                <img
                  src={product.icon}
                  alt="order-icon"
                  className="img-fluid"
                  width="50"
                />
              </div>
              <div className="col">
                <h4>{product.title}</h4>
                <p>Size : {product.size}</p>
              </div>
              <div className="col">&#8377;{product.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// function OrderTile(props) {
//   const { orderTotal, id, paymentMode, date } = props.order;
//   return (
//     <div className="container color-1">
//       <div className="row align-items-center">
//         <div className="col-4 col-md-3">
//           <img src={icon} alt="order-icon" className="img-fluid" width="100" />
//         </div>
//         <div className="col-6 col-md-9">
//           <div className="row align-items-center justify-content-between">
//             <div className="col-md-3 text-center">
//               <h4>Order ID : {id}</h4>
//               <p>Payment type : {paymentMode}</p>
//             </div>
//             <div className="col-md-3 mb-3 text-center">{date}</div>
//             <div className="col-md-3 text-center">
//               <h4>&#8377;{orderTotal}</h4>
//             </div>
//           </div>
//         </div>
//       </div>
//       <hr />
//     </div>
//   );
// }

export default OrderTile;
