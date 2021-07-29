import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Banner from "../../components/Banner";
import Product from "../../components/Product";
import { firestore } from "../../utils/firebase";
import "./home_page.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function HomePage(props) {
  const [products, setProducts] = useState([]);
  const classes = useStyles();
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
        image="https://firebasestorage.googleapis.com/v0/b/rebel-grooming.appspot.com/o/Banners%2FLanding%20page.png?alt=media&token=4bea6c71-5fda-41aa-86f0-05cc1751620c"
      />
      <div className={classes.root}>
        <Grid container spacing={3}>
          {products.map((_product) => (
            <Grid key={_product.id} item xs={12} sm={6}>
              <Product product={_product} />
            </Grid>
          ))}
        </Grid>
        {/* <div class="row no-gutters products-grid">
        {products.map((_product) => (
          <Product product={_product} key={_product.id} />
        ))}
      </div> */}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps)(HomePage);
