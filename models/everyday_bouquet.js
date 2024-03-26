const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers/index");

const bouquetSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    url: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);
bouquetSchema.post("save", handleMongooseError);

const Bouquet = model("Bouquet", bouquetSchema, "everyday_bouquets");

module.exports = Bouquet;
