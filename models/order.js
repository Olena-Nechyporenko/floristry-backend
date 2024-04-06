const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers/index");

const orderSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    bouquets: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        url: { type: String, required: true },
        type: { type: String, required: true },
        new: { type: Boolean, required: true },
        composition: { type: Array, required: true },
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
orderSchema.post("save", handleMongooseError);

const Order = model("Order", orderSchema, "orders");

module.exports = Order;
