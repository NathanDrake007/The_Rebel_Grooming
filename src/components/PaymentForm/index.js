import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { CardElement, useElements } from "@stripe/react-stripe-js";
import apiInstance from "../../utils/axios";
import { useStripe } from "@stripe/react-stripe-js";
import { connect } from "react-redux";
import { clearCart } from "../../redux/actions/cartActions";
import { firestore } from "../../utils/firebase";
import Loading from "../Loading";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import emailjs from "emailjs-com";
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
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("cod");

  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  useEffect(() => {
    async function fetchProducts() {
      var _totalPrice = 0;
      await firestore
        .collection("products")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const product = props.products.find((p) => p.id === doc.id);
            if (product) {
              const { price } = doc.data();
              _totalPrice += parseInt(price) * product.quantity;
            }
          });
          setTotalPrice(
            Math.round(_totalPrice - _totalPrice * (props.discount / 100))
          );
        });
    }
    fetchProducts();
  }, [props.products, props.discount]);

  const handleSubmit = async () => {
    setLoading(true);
    const { shippingDetails } = props;
    if (selectedValue === "card") {
      const cardElement = elements.getElement("card");
      apiInstance
        .post("/payments/create", {
          amount: totalPrice * 100,
          shipping: {
            ...shippingDetails,
          },
        })
        .catch((error) => console.log(error))
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
                .then(async () => {
                  const date = new Date().toDateString();
                  const newOrder = {
                    orderTotal: totalPrice,
                    paymentMode: "CARD",
                    payment_Id: paymentMethod.id,
                    date,
                    userId: props.userId,
                    orderItems: props.products,
                    couponCode: props.couponCode,
                  };
                  props.clearCart();
                  await firestore.collection("orders").add(newOrder);
                  setLoading(false);
                  props.handleNext();
                });
            });
        });
    } else if (selectedValue === "cod") {
      const date = new Date().toDateString();
      const templateId = "orderNotification-1";
      const newOrder = {
        orderTotal: totalPrice,
        paymentMode: "COD",
        date,
        userId: props.userId,
        orderItems: props.products,
        couponCode: props.couponCode,
      };
      props.clearCart();
      await firestore
        .collection("orders")
        .add(newOrder)
        .then((doc) => {
          const templateParams = {
            orderId: doc.id,
            userId: props.userId,
            name: shippingDetails.name,
            address: `${shippingDetails.address.line1} ${shippingDetails.address.line2} ${shippingDetails.address.city} ${shippingDetails.address.state} ${shippingDetails.address.postal_code}`,
          };
          emailjs.send(
            "service_rlyvd3a",
            templateId,
            templateParams,
            "user_WTtmhndlgYGmrjpwDK9HK"
          );
        });
      setLoading(false);
      props.handleNext();
    }
  };

  const renderNewCard = () => {
    return (
      <>
        <Typography variant="h5" gutterBottom>
          Payment method
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Cash On Delivery
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="payment"
                name="payment1"
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
              >
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label="Cash On Delivery"
                />
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Credit / Debit"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {selectedValue === "card" ? (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Credit / Debit Card
              </Typography>
              <CardElement options={configCardElement} />
            </Grid>
          ) : null}
        </Grid>
      </>
    );
  };
  return (
    <>
      {loading ? <Loading /> : null}
      {renderNewCard()}
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
    products: state.cart.products,
    userId: state.auth.userId,
  };
};
export default connect(mapStateToProps, { clearCart })(PaymentForm);
