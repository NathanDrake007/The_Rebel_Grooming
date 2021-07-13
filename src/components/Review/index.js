import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
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
  },
}));

function Review(props) {
  const { shippingDetails, totalPrice, handleBack, products, handleNext } =
    props;
  const classes = useStyles();

  return (
    <>
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {products.map((product) => (
            <ListItem className={classes.listItem} key={product.title}>
              <ListItemText
                primary={product.title}
                secondary={product.description_1}
              />
              <Typography variant="body2">&#8377;{product.price}</Typography>
            </ListItem>
          ))}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total" />
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
    totalPrice: state.cart.totalPrice,
  };
};
export default connect(mapStateToProps, null)(Review);
