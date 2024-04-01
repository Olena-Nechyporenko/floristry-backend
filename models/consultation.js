const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers/index");

const consultationSchema = new Schema(
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
    email: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
consultationSchema.post("save", handleMongooseError);

const Consultation = model("Consultation", consultationSchema, "consultations");

module.exports = Consultation;
