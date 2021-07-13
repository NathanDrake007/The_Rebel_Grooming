import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import AddressForm from "../../components/AddressForm";
import PaymentForm from "../../components/PaymentForm";
import Review from "../../components/Review";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
}));

const steps = ["Shipping address", "Review your order", "Payment details"];

function CheckoutPage(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingDetails, setShippingDetails] = useState(null);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #{props.orderId}. We have emailed your
                  order confirmation, and will send you an update when your
                  order has shipped.
                </Typography>
                <Link to="/orders" className="cartBtn">
                  View Orders
                </Link>
                <Link to="/" className="cartBtn">
                  Home
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {activeStep === 0 ? (
                  <AddressForm
                    setShippingDetails={setShippingDetails}
                    handleNext={handleNext}
                  />
                ) : activeStep === 1 ? (
                  <Review
                    shippingDetails={shippingDetails}
                    handleBack={handleBack}
                    handleNext={handleNext}
                  />
                ) : activeStep === 2 ? (
                  <PaymentForm
                    shippingDetails={shippingDetails}
                    handleBack={handleBack}
                    handleNext={handleNext}
                  />
                ) : null}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    orderId: state.orders.lastOrder,
  };
};
export default connect(mapStateToProps, null)(CheckoutPage);
