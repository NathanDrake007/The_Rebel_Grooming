import React from "react";
import { connect } from "react-redux";
import Banner from "../components/Banner";
import "./css/home_page.css";
import data from "../helper/data";
import Product from "../components/Product";
function HomePage(props) {
  return (
    <div className="homePage">
      <Banner
        title="Rebel Gromming"
        description="Sint et irure sunt aute officia mollit. Sint veniam sint amet minim sunt duis incididunt minim laborum laborum. Do duis ad quis ea consequat."
      />
      <div class="row no-gutters products-grid">
        {data.map((product) => (
          <Product
            title={product.title}
            description={product.description}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps)(HomePage);
