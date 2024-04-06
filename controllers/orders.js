const Order = require("../models/order.js");
const { ctrlWrapper } = require("../decorators/index.js");

const getAllOrders = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Order.find({ owner }, "-createdAt -updatedAt").populate(
    "owner",
    "email"
  );
  res.json(result);
};

const sendOrder = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Order.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = {
  sendOrder: ctrlWrapper(sendOrder),
  getAllOrders: ctrlWrapper(getAllOrders),
};
