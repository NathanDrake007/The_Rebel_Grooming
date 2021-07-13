import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

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
export default function AddressForm(props) {
  const classes = useStyles();

  const [fieldError, setFieldError] = useState(false);
  const [name, setName] = useState("");
  const [line1, setline1] = useState("");
  const [line2, setline2] = useState("");
  const [city, setCity] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [save, setSave] = useState(false);
  const validate = () => {
    if (
      name.length === 0 ||
      line1.length === 0 ||
      city.length === 0 ||
      postal_code.length === 0 ||
      state.length === 0 ||
      country.length === 0
    ) {
      setFieldError(true);
      return false;
    } else {
      setFieldError(false);
      return true;
    }
  };
  const handleNext = () => {
    if (!validate()) return;
    if (country.toLowerCase().localeCompare("india") === 0) {
      setCountry("IN");
      console.log(country);
    }
    props.setShippingDetails({
      name,
      address: {
        line1,
        line2,
        city,
        postal_code,
        state,
        country,
      },
    });
    props.handleNext();
  };
  return (
    <>
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              error={fieldError && name.length === 0}
              id="Name"
              name="Name"
              label="Name"
              fullWidth
              autoComplete="given-name"
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              error={fieldError && line1.length === 0}
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              onChange={(e) => setline1(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              onChange={(e) => setline2(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              error={fieldError && city.length === 0}
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              error={fieldError && state.length === 0}
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              onChange={(e) => setState(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              error={fieldError && postal_code.length === 0}
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              error={fieldError && country.length === 0}
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              onChange={(e) => setCountry(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  name="saveAddress"
                  value={save}
                  onChange={(e) => setSave(!save)}
                />
              }
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>
      </React.Fragment>
      <div className={classes.buttons}>
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
