const Consultation = require("../models/consultation.js");
const { ctrlWrapper } = require("../decorators/index.js");

const sendUserData = async (req, res) => {
  const result = await Consultation.create({ ...req.body });
  res.status(201).json(result);
};

module.exports = {
  sendUserData: ctrlWrapper(sendUserData),
};
