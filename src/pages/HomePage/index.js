import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Banner from "../../components/Banner";
import Product from "../../components/Product";
import { firestore } from "../../utils/firebase";
import highlights from "../../assets/pictures/brand-highlights.jpg";

import bannerImage from "../../assets/pictures/homeBanner.jpg";
import displayHeading2 from "../../assets/pictures/displayHeading-2.jpg";
import displayHeading1 from "../../assets/pictures/displayHeading-1.jpg";
import Loading from "../../components/Loading";

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

  const renderPage = () => {
    return (
      <div className="homePage">
        <Banner
          title="Rebel Gromming"
          description="Sint et irure sunt aute officia mollit. Sint veniam sint amet minim sunt duis incididunt minim laborum laborum. Do duis ad quis ea consequat."
          image={bannerImage}
        />
        <img
          src={displayHeading1}
          alt="displayheading-1"
          className="img-fluid"
        />
        <div id="main" className="container-fluid">
          {products.map((_product, index) => (
            <div className="row">
              <Product
                product={_product}
                key={_product.id}
                rev={index % 2 === 1 ? true : false}
              />
            </div>
          ))}
        </div>
        <img
          src={displayHeading2}
          alt="displayheading-2"
          className="img-fluid"
        />
        <div className="container-fluid bg-white">
          <img src={highlights} alt="highlights" className="img-fluid" />
        </div>
      </div>
    );
  };
  return products.length !== 0 ? renderPage() : <Loading />;
}
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps)(HomePage);
