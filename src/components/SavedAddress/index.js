import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { FormControl, Radio, RadioGroup } from "@material-ui/core";
import { connect } from "react-redux";
import { firestore } from "../../utils/firebase";
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
function SavedAddress(props) {
  const classes = useStyles();
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [index, setIndex] = useState(null);
  console.log(index);
  console.log(addressList);
  useEffect(() => {
    async function fetchAddress() {
      await firestore
        .collection("users")
        .doc(props.userId)
        .get()
        .then((doc) => {
          setAddressList(doc.data().address);
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
    fetchAddress();
  }, []);
  const handleNext = () => {
    if (selectedAddress === "new") {
      props.handleNext();
    } else {
      props.setShippingDetails(addressList[index]);
      props.handleNext();
      props.handleNext();
    }
  };
  return (
    <>
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Select Shipping Address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Address"
                name="Address"
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
              >
                {addressList.map((address, index) => (
                  <>
                    <FormControlLabel
                      value={address.line1}
                      control={<Radio />}
                      label={address.line1}
                      key={`address-${index}`}
                      onClick={() => setIndex(index)}
                    />
                  </>
                ))}
                <FormControlLabel
                  value="new"
                  control={<Radio />}
                  label="New Address"
                  onClick={() => setIndex(null)}
                />
              </RadioGroup>
            </FormControl>
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
const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};
export default connect(mapStateToProps, null)(SavedAddress);
