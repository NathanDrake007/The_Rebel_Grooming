require("dotenv").config();
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
	key_id: process.env.KEY,
	key_secret: process.env.SECRET_KEY,
});

app.post("/verification", (req, res) => {
	const { paymentId, orderId, signature } = req.body;
	const generated_signature = crypto
		.createHmac("sha256", process.env.SECRET_KEY)
		.update(orderId + "|" + paymentId)
		.digest("hex");

	if (generated_signature == signature) {
		console.log("Payment Success");
		res.json({ payment: "Success" });
	} else {
		res.json({ payment: "Failed" });
	}
});

app.post("/payment", async (req, res) => {
	const payment_capture = 1;
	const amount = req.body.amount;

	const options = {
		amount: amount * 100,
		currency: "INR",
		receipt: shortid.generate(),
		payment_capture,
	};

	try {
		const response = await razorpay.orders.create(options);
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount,
		});
	} catch (error) {
		console.log(error);
	}
});

app.get("*", (req, res) => {
	res.status(404).send("404, Not Found.");
});

exports.api = functions.https.onRequest(app);
