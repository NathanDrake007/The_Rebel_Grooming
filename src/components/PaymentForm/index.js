import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { CardElement, useElements } from "@stripe/react-stripe-js";
import apiInstance from "../../utils/axios";
import { useStripe } from "@stripe/react-stripe-js";
import { connect } from "react-redux";
import { placeOrder } from "../../redux/actions/orderAction";
import { clearCart } from "../../redux/actions/cartActions";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));
function PaymentForm(props) {
  const classes = useStyles();
  const elements = useElements();
  const stripe = useStripe();

  const { handleBack } = props;
  const [save, setSave] = useState(false);

  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  const handleSubmit = () => {
    const cardElement = elements.getElement("card");
    const { totalPrice, shippingDetails, save } = props;
    apiInstance
      .post("/payments/create", {
        amount: totalPrice * 100,
        shipping: {
          ...shippingDetails,
        },
      })
      .then(({ data: clientSecret }) => {
        stripe
          .createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
              ...shippingDetails,
            },
          })
          .then(({ paymentMethod }) => {
            stripe
              .confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
              })
              .then(() => {
                const configOrder = {
                  orderTotal: totalPrice,
                  paymentMode: "CARD",
                  orderItems: props.products.map((item) => {
                    const { id, title, price, quantity } = item;
                    return {
                      id,
                      title,
                      price,
                      quantity,
                    };
                  }),
                };
                props.clearCart();
                props.placeOrder(configOrder);
                props.handleNext();
              });
          });
      });
  };
  return (
    <>
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          Payment method
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Credit / Debit Card
            </Typography>
            <CardElement options={configCardElement} />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  name="saveCard"
                  value={save}
                  onChange={(e) => setSave(!save)}
                />
              }
              label="Remember credit card details for next time"
            />
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
          onClick={handleSubmit}
          className={classes.button}
        >
          Place Order
        </Button>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    totalPrice: state.cart.totalPrice,
    products: state.cart.products,
  };
};
export default connect(mapStateToProps, { placeOrder, clearCart })(PaymentForm);
