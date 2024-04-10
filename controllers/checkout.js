const { ctrlWrapper } = require("../decorators/index.js");
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const checkout = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.lineItems,
      mode: "payment",
      success_url: "https://floristry-app.netlify.app/success",
      cancel_url: "https://floristry-app.netlify.app/failure",
    });
    return res.status(201).json(session);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  checkout: ctrlWrapper(checkout),
};
