import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Banner from "../components/Banner";
import "./css/home_page.css";
import Product from "../components/Product";
import { firestore } from "../helper/firebase";
function HomePage(props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      var temp = [];
      await firestore
        .collection("products")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            temp.push({
              ...doc.data(),
              id: doc.id,
            });
          });
        });
      setProducts(temp);
    }
    fetchProducts();
  }, []);
  return (
    <div className="homePage">
      <Banner
        title="Rebel Gromming"
        description="Sint et irure sunt aute officia mollit. Sint veniam sint amet minim sunt duis incididunt minim laborum laborum. Do duis ad quis ea consequat."
      />
      <div class="row no-gutters products-grid">
        {products.map((_product) => (
          <Product product={_product} key={_product.id} />
        ))}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps)(HomePage);
