// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
// const { ctrlWrapper } = require("../decorators/index.js");

// const checkout = async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: req.body.lineItems,
//       mode: "payment",
//       success_url: "http://localhost:3000/",
//       cancel_url: "http://localhost:3000/cart",
//     });
//     return res.status(201).json(session);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   checkout: ctrlWrapper(checkout),
// };
