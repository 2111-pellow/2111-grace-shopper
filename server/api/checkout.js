const router = require("express").Router();
require("dotenv").config();
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIP_SECRET_TEST);
// const uuid = require("uuid");

// router.get("/", (req, res) => {
//   res.send("Add your Stripe Secret Key to the .require('stripe')");
// });

router.post("/cart", cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "The GreenHouse",
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment);
    res.json({
      message: "Payment Successful!",
      success: true,
    });
  } catch (error) {
    console.log("oh no error", error);
    res.json({
      message: "payment failed oh no",
      success: false,
    });
  }
});
// router.post("/cart", async (req, res) => {
//   console.log("Request:", req.body);

//   let error;
//   let status;
//   try {
//     const { plants, token } = req.body;

//     const customer = await stripe.customers.create({
//       email: token.email,
//       source: token.id,
//     });
//     // const itempotency_key = uuid();
//     const charge = await stripe.charges.create({
//       amount: plants.price * 100,
//       currency: "usd",
//       customer: customer.id,
//       receipt_email: token.email,
//       description: `Purchased the ${plants.name}`,
//       shipping: {
//         name: token.card.name,
//         address: {
//           line1: token.card.address_line1,
//           line2: token.card.address_line2,
//           city: token.card.address_city,
//           country: token.card.address_country,
//           postal_code: token.card.address_zip,
//         },
//       },
//     });
//     console.log("Charge:", { charge });
//   } catch (error) {
//     console.error("Error", error);
//     status = "failure";
//   }

//   res.json({ error, status });
// });

module.exports = router;
