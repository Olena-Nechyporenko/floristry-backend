const express = require("express");
const router = express.Router();
const ordersController = require("../../controllers/orders");
const { isEmptyBody } = require("../../middlewares/index");
const { validateBody } = require("../../decorators/index");
const { orderSchema } = require("../../schemas/order-schema");

router.post(
  "/",
  isEmptyBody,
  validateBody(orderSchema),
  ordersController.sendOrder
);

module.exports = router;
