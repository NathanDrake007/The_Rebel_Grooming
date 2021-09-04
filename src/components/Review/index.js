import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { firestore } from "../../utils/firebase";
import { Avatar, Input, ListItemAvatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  couponText: {
    color: "red",
    fontWeight: 700,
    marginRight: "10px",
  },
  title: {
    marginTop: theme.spacing(2),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: "#3b160e",
    color: "white",
  },
}));

function Review(props) {
  const [products, setProducts] = useState([]);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [appliedCode, setAppliedCode] = useState(null);
  useEffect(() => {
    async function fetchProducts() {
      var temp = [];
      var _totalPrice = 0;
      await firestore
        .collection("products")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const product = props.products.find((p) => p.id === doc.id);
            if (product) {
              const { title, price, size, icon } = doc.data();
              _totalPrice += parseInt(price) * product.quantity;
              temp.push({
                title,
                price,
                size,
                icon,
                ...product,
              });
            }
          });
          setTotalPrice(_totalPrice);
          setOriginalPrice(_totalPrice);
        });
      setProducts(temp);
    }
    fetchProducts();
  }, [props.products]);
  const { shippingDetails, handleBack, handleNext } = props;
  const classes = useStyles();

  const applyCode = async () => {
    if (code !== null && appliedCode !== code) {
      await firestore
        .collection("coupon")
        .doc(code.toUpperCase())
        .get()
        .then((doc) => {
          const { discount } = doc.data();
          setTotalPrice(
            Math.round(originalPrice - originalPrice * (discount / 100))
          );
          props.setDiscount(parseInt(discount));
          props.setCouponCode(code);
          setAppliedCode(code);
        })
        .catch((error) => setCodeError(true));
    }
  };
  return (
    <>
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {products.map((product) => (
            <ListItem className={classes.listItem} key={product.title}>
              <ListItemAvatar>
                <Avatar alt={product.title} src={product.icon} />
              </ListItemAvatar>
              <ListItemText
                primary={product.title}
                secondary={`size: ${product.size}`}
              />
              <Typography variant="body2">&#8377;{product.price}</Typography>
            </ListItem>
          ))}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Coupon Code" />
            <div className="d-flex flex-column mt-4">
              <Input
                placeholder="COUPON CODE"
                error={codeError}
                inputProps={{ "aria-label": "description" }}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              {codeError ? <p className="text-danger">Invalid Code</p> : null}
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={applyCode}
              className={classes.button}
            >
              Apply
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total" />
            {appliedCode !== null ? (
              <Typography variant="subtitle1" className={classes.couponText}>
                coupon applied ({appliedCode})
              </Typography>
            ) : null}
            <Typography variant="subtitle1" className={classes.total}>
              &#8377;{totalPrice}
            </Typography>
          </ListItem>
        </List>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Shipping Address
            </Typography>
            <Typography gutterBottom>{shippingDetails.name}</Typography>
            <Typography gutterBottom>
              {shippingDetails.address.line1},
            </Typography>
            <Typography gutterBottom>
              {shippingDetails.address.line2},
            </Typography>
            <Typography gutterBottom>
              {shippingDetails.address.state}, {shippingDetails.address.city} -
              {shippingDetails.address.postal_code}
            </Typography>
            <Typography gutterBottom>
              {shippingDetails.address.country}
            </Typography>
          </Grid>
        </Grid>
      </React.Fragment>
      <div className={classes.buttons}>
        <Button onClick={handleBack} className={classes.button}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
        >
          Next
        </Button>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    products: state.cart.products,
  };
};
export default connect(mapStateToProps, null)(Review);
