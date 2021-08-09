const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JCh86SGvkpq7U5NflFmWL4755QSQNesWwzHdCcmM3Sr7evbmaodNATY3PeWTbO9sqx2C7KisJSXV8UtsWh19vqp00Axbjz8kT"
);

const app = express();

app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());

app.post("/payments/create", async (req, res) => {
  try {
    const { amount, shipping } = req.body;
    console.log(amount, shipping);
    const paymentIntent = await stripe.paymentIntents.create({
      // shipping,
      amount,
      currency: "INR",
    });

    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
});

app.get("*", (req, res) => {
  res.status(404).send("404, Not Found.");
});

exports.api = functions.https.onRequest(app);